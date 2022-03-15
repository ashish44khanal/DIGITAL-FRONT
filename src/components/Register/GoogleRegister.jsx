import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMsg from "../ErrorMessages/ErrorMsg";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../Redux/user/UserSlice";
import jwtDecode from "jwt-decode";

function GoogleRegister() {
  const { lang } = useSelector((state) => state.language);

  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (googleData) => {
    // setUser(googleData.profileObj);
    registerApi(googleData.profileObj);
  };

  const handleFailure = (result) => {
    alert(result);
  };

  // useEffect(() => {
  //   registerApi();
  // }, [user]);

  const registerApi = async (user) => {
    console.log("user", user);
    setLoading(true);
    try {
      await axios
        .post(`${process.env.REACT_APP_URL}/user/register`, {
          user_id: `${user.googleId}`,
          user_email: `${user.email}`,
          username: `${user.name}`,
          image: `${user.imageUrl}`,
          password: `${user.googleId}`,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          const decode = jwtDecode(res.data.token);
          dispatch(createUser(decode));
          setLoading(false);
          history.push(`/${user.googleId}/demographics`);
          window.location.reload(false);
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
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
            <FcGoogle className="text-2xl" />{" "}
            <p className="text-gray-600">
              {lang === "nep"
                ? "गुगलबाट साइन अप गर्नुहोस्"
                : "Sign Up With Google"}
            </p>
          </div>
        </>
      )}
      buttonText="Login"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleRegister;
