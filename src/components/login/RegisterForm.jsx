import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import GoogleRegister from "../Register/GoogleRegister";
import FacebokRegister from "../Register/FacebokRegister";
import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../Redux/user/UserSlice";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

function RegisterForm() {
  const { lang } = useSelector((state) => state.language);

  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
  const id = uuidv4();

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
        .post(`${process.env.REACT_APP_URL}/user/register`, {
          user_id: `${id}`,
          user_email: `${data.email}`,
          username: `${data.username}`,
          image: "",
          password: `${data.password}`,
        })
        .then((res) => {
          setLoading(false);
          setSuccess(true);
          localStorage.setItem("token", res.data.token);
          const decode = jwtDecode(res.data.token);
          dispatch(createUser(decode));
          setLoading(false);
          history.push(`${id}/demographics`);
          window.location.reload(false);
        });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        reset();
        setSuccess(false);
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <p className="text-xl font-bold text-gray-400 ">
              {lang === "nep" ? "साइन इन " : "Sign In"}
            </p>
          </Link>
          <Link to="/register">
            <p className="text-xl font-bold text-primary">
              {lang === "nep" ? "साइन अप " : "Sign Up"}
            </p>
          </Link>
        </div>
      </div>
      <hr className="my-2 mb-4" />
      {success && (
        <div className="my-4 p-3 rounded text-white bg-green-600">
          Account Created Successfully Now Please Login !
        </div>
      )}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-3">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name=""
            id="name"
            className="input_txt rounded-md shadow-lg"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <small className="text-red-500 mt-2 animate-bounce">
              username is required.
            </small>
          )}
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
          {errors.email && (
            <small className="text-red-500 mt-2 animate-bounce">
              password is required.
            </small>
          )}
        </div>
        <input
          type="submit"
          className="btn-primary cursor-pointer mt-8 w-full rounded-md"
          value={
            loading ? "LOADING..." : lang === "nep" ? "साइन अप" : "SIGN UP"
          }
        />
        <div className="my-4 text-center">
          <p className="text-gray-500">{lang === "nep" ? "वा" : "OR"}</p>
        </div>
      </form>
      <div className="flex flex-col space-y-4 items-center">
        <GoogleRegister />

        <FacebokRegister />
      </div>
    </div>
  );
}

export default RegisterForm;
