import { FaFacebookSquare } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { createUser } from "../../Redux/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ErrorMsg from "../ErrorMessages/ErrorMsg";

function FacebokLoginComponent() {
  const { lang } = useSelector((state) => state.language);

  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const [alreadyExist, setAlreadyExist] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const responseFacebook = (response) => {
    console.log("facebook response", response);
    registerApi(response);
  };

  const registerApi = async (user) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/user/login`, {
          user_id: `${user.userID}`,
        })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          const decode = jwtDecode(res.data.token);
          dispatch(createUser(decode));
          history.push("/dashboard");
          window.location.reload(false);
        });
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        error.response.status === 404 &&
          setResMsg(
            "Account that you trying to Sign In does not exist please Sign Up first"
          );

        setTimeout(() => {
          error.response.status === 500 && setAlreadyExist(true);
        }, 2000);
      }
    }
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <>
          {error && <ErrorMsg msg={resMsg} />}
          {alreadyExist && (
            <div className="bg-red-600 p-3 text-white rounded text-justify">
              Error ! This Account Already Exist Please Login !!
            </div>
          )}

          <div
            className="w-full p-2 flex items-center border space-x-4 justify-center cursor-pointer "
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FaFacebookSquare
              className="text-2xl"
              style={{ color: "#3b5998" }}
            />{" "}
            <p className="text-gray-600">
              {lang === "nep"
                ? "फेसबुकबाट साइन इन गर्नुहोस्"
                : "Sign In With Facebook"}
            </p>{" "}
          </div>
        </>
      )}
    />
  );
}

export default FacebokLoginComponent;
