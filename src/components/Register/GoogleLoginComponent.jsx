import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMsg from "../ErrorMessages/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { createUser } from "../../Redux/user/UserSlice";

function GoogleLoginComponent() {
  const { lang } = useSelector((state) => state.language);

  const [user, setUser] = useState();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const dispatch = useDispatch();

  console.log(user);
  const responseGoogle = (response) => {
    setUser(response.profileObj);
  };

  useEffect(() => {
    registerApi();
  }, [user]);

  const registerApi = async () => {
    setLoading(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/user/login`, {
          user_id: `${user.googleId}`,
        })
        .then((res) => {
          console.log("res", res);
          localStorage.setItem("token", res.data.token);
          const decode = jwtDecode(res.data.token);
          dispatch(createUser(decode));
          setLoading(false);
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
    <GoogleLogin
      clientId={`${process.env.REACT_APP_GOOGLE_APP_ID}`}
      render={(renderProps) => (
        <>
          {error && <ErrorMsg msg={resMsg} />}
          {alreadyExist && (
            <ErrorMsg msg="Failed to signup using this account as it already exists" />
          )}
          <div
            className="w-full p-2 flex items-center border space-x-4 justify-center cursor-pointer "
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <FcGoogle className="text-2xl" />{" "}
            <p className="text-gray-600">
              {lang === "nep"
                ? "गुगलबाट साइन इन गर्नुहोस्"
                : "Sign In With Google"}
            </p>{" "}
          </div>
        </>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleLoginComponent;
