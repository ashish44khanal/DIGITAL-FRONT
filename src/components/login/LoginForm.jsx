import React from "react";
import { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import GoogleLoginComponent from "../Register/GoogleLoginComponent";
import { useForm } from "react-hook-form";
import axios from "axios";
import { createUser } from "../../Redux/user/UserSlice";
import jwtDecode from "jwt-decode";
import FacebokLoginComponent from "../Register/FacebookLoginComponent";
import ErrorMsg from "../ErrorMessages/ErrorMsg";

function LoginForm() {
  const { lang } = useSelector((state) => state.language);

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios
        .post(`${process.env.REACT_APP_URL}/user/login/two`, {
          email: `${data.email}`,
          password: `${data.password}`,
        })
        .then((res) => {
          setLoading(false);
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          const decode = jwtDecode(res.data.token);
          dispatch(createUser(decode));
          setLoading(false);
          history.push("/dashboard");
          window.location.reload(false);
        });
    } catch (error) {
      if (error.response) {
        setError(true);
        setResMsg(error.response.data.errors[0].msg);
        // error.response.status===404 && setResMsg('Account that you trying to Sign In does not exist please Sign Up first')
        setSuccess(false);
        setLoading(false);
        reset();
        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    }
  };
  return (
    <div>
      <div>
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <p className="text-xl font-bold text-primary ">
                {lang === "nep" ? "साइन इन " : "Sign In"}
              </p>
            </Link>
            <Link to="/register">
              <p className="text-xl font-bold text-gray-400">
                {lang === "nep" ? "साइन अप " : "Sign Up"}
              </p>
            </Link>
          </div>
        </div>
        <hr className="my-2 mb-4" />
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name=""
              id="email"
              className="input_txt rounded-md shadow-lg"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="text-red-500 mt-2 animate-bounce">
                email is required.
              </small>
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name=""
              id="password"
              className="input_txt rounded-md shadow-lg"
              {...register("password", { required: true })}
            />

            {errors.password && (
              <small className="text-red-500 mt-2 animate-bounce">
                email is required.
              </small>
            )}
          </div>

          <div className="my-5">{error && <ErrorMsg msg={resMsg} />}</div>

          <input
            type="submit"
            className="btn-primary cursor-pointer mt-8 w-full rounded-md"
            value={
              loading ? "LOADING..." : lang === "nep" ? "साइन इन" : "SIGN IN"
            }
          />
          <div className="my-4 text-center">
            <p className="text-gray-500">OR</p>
          </div>
        </form>
        <div className="flex flex-col space-y-4 items-center">
          <GoogleLoginComponent />
          <FacebokLoginComponent />
          {/* <div className="w-full p-2 flex items-center border space-x-4 justify-center cursor-pointer ">
                    <FaFacebookSquare  className='text-2xl'  style={{color:'#3b5998'}}/> <p className='text-gray-600'>Sign in With Facebook</p>
                </div>
                 */}
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
