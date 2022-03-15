import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import loginImg from "../../images/login.svg";

function LoginOrRegister(props) {
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="bg-gray-100 lg:min-h-screen">
      <div className="container mx-auto lg:px-8 px-4">
        <div className="lg:grid grid-cols-12 lg:gap-4">
          <div className="hidden lg:block lg:col-span-7">
            <Link to="/">
              <p className="font-bold text-primary mt-16 mx-4">
                {lang === "nep"
                  ? "डिजिटल प्रशिक्षण एस एन भी"
                  : "Digital Training SNV"}
              </p>
            </Link>
            <h1 className="mt-8 mx-4">
              {lang === "nep" ? (
                <>
                  {" "}
                  उत्तम शिक्षाको लागि <br />{" "}
                  <span className="text-blue-500">
                    {" "}
                    उत्तम कक्षाहरू प्राप्त गर्नुहोस्
                  </span>
                </>
              ) : (
                <>
                  {" "}
                  Discover best classes for <br />{" "}
                  <span className="text-blue-500">THE BEST LEARNING</span>
                </>
              )}
            </h1>
            <div className="p-16">
              <img
                src={loginImg}
                alt="login image"
                srcset=""
                className="w-3/4"
              />
            </div>
          </div>
          <div className="lg:col-span-4 py-4">
            <div className="bg-white p-10 rounded shadow-xl">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginOrRegister;
