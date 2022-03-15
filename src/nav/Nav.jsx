import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import { RiAccountCircleFill } from "react-icons/ri";
import CategoryDropdowns from "../components/Dropdowns/CategoryDropdowns";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createLang } from "../Redux/Language/LanguageSlice";
import logo from "../images/SNVLOGO.svg";
import { AiOutlineAppstore } from "react-icons/ai";
function Nav() {
  // const [scroll, setScroll] = useState( false );
  // const changeNavBg = () => {
  //     if ( window.scrollY >= 80 ) {
  //         setScroll( true );
  //     }
  //     else {
  //         setScroll( false );
  //     }
  // }
  // window.addEventListener( 'scroll', changeNavBg );
  const [mobileNav, setMobileNav] = useState(false);
  const [drop, setDrop] = useState(false);
  const [langDrop, setlangDrop] = useState(false);
  const [mobileProfileDrop, setmobileProfileDrop] = useState(false);

  const [categoryData, setcategoryData] = useState([]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const username = useSelector((state) => state.user.username);
  const image = useSelector((state) => state.user.image);
  const dispatch = useDispatch();

  const GlobalLanguageHandler = (lang) => {
    localStorage.setItem("lang", lang);
    dispatch(createLang(lang));
    setlangDrop(false);
  };
  const { lang } = useSelector((state) => state.language);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `${
            lang === "nep"
              ? `${process.env.REACT_APP_URL}/category/lang/${lang}`
              : `${process.env.REACT_APP_URL}/category/lang/${lang}`
          }`
        )
        .then((res) => {
          setcategoryData(res.data);
        });
    };
    fetch();
  }, [lang]);
  return (
    <div className="bg-white  shadow-md">
      <div className="container mx-auto md:px-4">
        {/* mobile nav  */}
        <div className="block lg:hidden bg-gray-100 w-full">
          <div className="flex items-center justify-between container mx-auto p-4">
            <FaBars
              className={
                mobileNav
                  ? "bars transform rotate-90 transition"
                  : "bars transform rotate-180 transition"
              }
              onClick={() => {
                setMobileNav(!mobileNav);
              }}
            />
            <h3 className="text-primary">
              <Link to="/">
                {lang === "nep"
                  ? "डिजिटर टेनिडग एस एन भी"
                  : "Digital Training SNV"}
              </Link>
            </h3>

            {isLoggedIn ? (
              <Link to="/dashboard">
                <RiAccountCircleFill className="text-3xl text-gray-800" />
              </Link>
            ) : (
              <div className="z-100">
                {/* {account section } */}
                <div className="relative">
                  <RiAccountCircleFill
                    className="text-3xl text-gray-800"
                    onClick={() => {
                      setmobileProfileDrop(!mobileProfileDrop);
                    }}
                  />
                  <div
                    className={
                      mobileProfileDrop
                        ? "absolute right-0 border shadow-xl p-2 bg-white w-32 opacity-1 transition"
                        : "fixed opacity-0 -top-40 transition"
                    }
                  >
                    <div className="flex items-center flex-col space-y-4">
                      <Link to="/register">
                        <button className="btn-secondary font-medium rounded-md text-sm">
                          Sign up
                        </button>
                      </Link>
                      <Link to="/login">
                        {" "}
                        <button className="btn-primary font-medium rounded-md text-sm">
                          Login
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* accout section ends  */}
              </div>
            )}
          </div>
          <div
            className={
              mobileNav
                ? "bg-white border  w-full shadow-xl opacity-1 transition transition-duration-2000 transform scale-1 ml-0 h-screen mt-0"
                : "transition absolute transform scale-0  -ml-96"
            }
          >
            <div className="container mx-auto p-4 flex flex-col space-y-4 text-lg">
              <Link to="/courses">
                {lang === "nep" ? "पाठ्यक्रमहरू" : "Courses"}
              </Link>
              <hr />
              <Link to="/about">
                {lang === "nep" ? "हाम्रो बारेमा" : "About Us"}
              </Link>
              <hr />
              <Link to="/partners">
                {lang === "nep" ? "साझेदारहरू" : "Partners"}
              </Link>
              <hr />
              <div className="bg-gray-100 p-2">
                <p className="my-2 font-bold">
                  {lang === "nep" ? "भाषा" : "Language"}
                </p>
                <p
                  className="my-2"
                  onClick={() => GlobalLanguageHandler("nep")}
                >
                  नेपाली
                </p>
                <p
                  className="my-2"
                  onClick={() => GlobalLanguageHandler("eng")}
                >
                  English
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* mobile nav ends  */}
        {/* desktop nav  */}
        <div className="hidden lg:flex justify-between items-center">
          {/* nav items start */}
          <div className="text-center justify-center pr-4">
            <h2 className="text-primary">
              <Link to="/">
                <span>
                  <img
                    src={logo}
                    alt="Digital Training SNV"
                    srcset=""
                    className="w-20"
                  />
                </span>
              </Link>
              {/* <Link to="/">
                {lang === "nep"
                  ? "डिजिटल प्रशिक्षण एस एन भी"
                  : "Digital Training SNV"}
              </Link> */}
            </h2>
          </div>
          {/* nav items ends  */}

          {/* sub menu items starts  */}
          <div className="flex items-center space-x-2 p-4 md:p-0">
            <div className="flex items-center space-x-6 font-medium text-lg ">
              <p
                className="relative py-4 transition z-100"
                onMouseOver={() => {
                  setDrop(true);
                }}
                onMouseOut={() => setDrop(false)}
              >
                <div className="flex items-center cursor-pointer px-2 font-light">
                  <AiOutlineAppstore className="mr-2" />
                  <Link to="/courses">
                    {" "}
                    {lang === "nep" ? "पाठ्यक्रमहरू" : "Courses"}
                  </Link>
                  <BiChevronDown className="text-xl font-bold ml-2" />
                </div>

                {/* dropdown menu  */}
                <div
                  className={
                    drop
                      ? "block absolute bg-gray-50 w-max mt-4 px-4 py-8 z-50 shadow-lg"
                      : "hidden"
                  }
                >
                  <CategoryDropdowns data={categoryData} />
                </div>
                {/* dropdown menu ends  */}
              </p>

              {/* search bar starts here  */}
              <div className="bg-gray-100 rounded-md">
                <div className="flex items-center">
                  <div className="py-3 px-6">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Search ....."
                      className="bg-gray-100 outline-none w-80"
                    />
                  </div>
                  <div className="py-3 px-4 transition hover:bg-blue-500 text-blue-500 hover:text-white cursor-pointer">
                    <BiSearch className="h-full w-full text-xl font-bold" />
                  </div>
                </div>
              </div>
              {/* searchbar ends here  */}

              <p className="py-4 font-light">
                <Link to="/about">
                  {lang === "nep" ? "हाम्रो बारेमा" : "About Us"}
                </Link>
              </p>
              <p className="py-4 font-light">
                <Link to="/partners">
                  {lang === "nep" ? "साझेदारहरू" : "Partners"}
                </Link>
              </p>
            </div>
          </div>
          {/* sub menu items ends  */}

          {/* signin signup buttons  */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 p-2 rounded shadow">
                <Link to="/dashboard" className="flex items-center space-x-2">
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      srcset=""
                      className="rounded-full w-8"
                    />
                  ) : (
                    <div className="bg-primary text-center w-8 h-8 rounded-full text-lg py-1 text-white font-bold">
                      {username.split("")[0].toUpperCase()}
                    </div>
                  )}
                  {/* <RiAccountCircleFill className='text-5xl text-gray-800 shadow rounded-full' /> */}
                  <p className="font-medium text-lg">
                    {lang === "nep" ? "प्रोफाइल" : "Profile"}
                  </p>
                </Link>
                {/* <BiChevronDown className="text-3xl font-medium bg-gray-100 cursor-pointer" /> */}
              </div>
              {/* language section  */}

              {/* language section ends  */}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                {" "}
                <button className="py-3 px-4 text-xl font-light transition hover:bg-gray-100 rounded border">
                  {lang === "nep" ? "लग इन" : "Login"}
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-50 py-3 px-4 text-xl text-primary rounded transition hover:bg-blue-100">
                  {lang === "nep" ? "साइन अप" : "Sign up"}
                </button>
              </Link>

              {/* language section  */}
              {/* <div className="bg-gray-100">
                <div
                  className="text-gray-500 flex items-center space-x-3 py-3 px-2 cursor-pointer"
                  onClick={() => {
                    setlangDrop(!langDrop);
                  }}
                >
                  {lang != null ? <p>{lang}</p> : <p>Lang</p>}
                  <BiChevronDown />
                </div>
                <div
                  className={`bg-gray-200 border border-gray-500  absolute w-20  ${
                    langDrop ? "block" : "hidden"
                  }`}
                >
                  <p
                    className={`p-2 cursor-pointer transition hover:bg-blue-500 hover:text-white ${
                      lang === "eng" && "bg-blue-500 text-white"
                    }`}
                    onClick={() => GlobalLanguageHandler("eng")}
                  >
                    English
                  </p>
                  <hr />
                  <p
                    className={`cursor-pointer p-2 transition hover:bg-blue-500 hover:text-white ${
                      lang === "nep" && "bg-blue-500 text-white"
                    }`}
                    onClick={() => GlobalLanguageHandler("nep")}
                  >
                    नेपाली
                  </p>
                </div>
              </div> */}
              {/* language section ends  */}
            </div>
          )}
        </div>
        {/* desktop nav ends */}
      </div>
    </div>
  );
}

export default Nav;
