import React from "react";
import Page from "../templates/Page";
import { IoIosPlay } from "react-icons/io";
import homeImg from "../images/homeImg.png";
import { Link } from "react-router-dom";
import { BsPlay } from "react-icons/bs";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import RecentCourses from "../components/RecentCourses";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { createLang } from "../Redux/Language/LanguageSlice";
import { GiOfficeChair, GiSkills } from "react-icons/gi";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { ImPower } from "react-icons/im";

function Home() {
  const dispatch = useDispatch();
  const GlobalLanguageHandler = (lang) => {
    localStorage.setItem("lang", lang);
    dispatch(createLang(lang));
  };

  const [data, setData] = useState([]);

  const { lang } = useSelector((state) => state.language);

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${process.env.REACT_APP_URL}/videos/latest`)
        .then((res) => {
          setData(res.data);
        });
    };
    fetch();
  }, []);
  return (
    <Page>
      {/* language section  */}
      <div className="hidden md:block fixed text-center right-0 top-64 rounded overflow-hidden ">
        <div className="flex flex-col">
          <p
            className={`px-2 py-3 bg-gray-300 cursor-pointer ${
              lang === "nep" && "bg-primary"
            }`}
            onClick={() => GlobalLanguageHandler("nep")}
          >
            NEP
          </p>
          <p
            className={`px-2 py-3 bg-gray-300 cursor-pointer ${
              lang === "eng" && "bg-primary"
            }`}
            onClick={() => GlobalLanguageHandler("eng")}
          >
            ENG
          </p>
          <p
            className="px-2 py-3 flex justify-center text-white"
            style={{ backgroundColor: "#4267B2" }}
          >
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          </p>
          <p
            className="px-2 py-3 flex justify-center"
            style={{ backgroundColor: "#FF0000" }}
          >
            <a href="http://" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-white" />
            </a>
          </p>
        </div>
      </div>
      {/* language section ends  */}
      <div className="bg-primary-yellow pb-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* left content side  */}
            <div className="py-10 lg:py-24">
              <p className="font-medium text-gray-800">
                {lang === "nep"
                  ? "डिजिटल प्रशिक्षणले यसलाई सजिलो बनाउँछ"
                  : "Digital Training Makes It Easy"}
              </p>
              <h1 className="my-8 font-bold text-5xl lg:text-6xl">
                {lang === "nep"
                  ? "तपाईलाई शिक्षित गर्न आवश्यक सबै उपकरणहरू"
                  : "All the tools you need to educate"}
              </h1>
              <p className="my-8 text-gray-500 text-lg ">
                {lang === "nep"
                  ? "२१ औं शताब्दीका सिकारुहरूका लागि डिजाइन गरिएको यस शक्तिशाली सिकाइ व्यवस्थापन प्रणालीसँग आफ्नो सिकाइ अनुभवहरू र परिणामहरूलाई सुधार गर्नुहोस्।"
                  : "Imrove your learning experiences and outcomes with this powerful learning management system designed for the 21st century learner"}
              </p>

              <div className="my-4 flex items-center space-x-10 lg:space-x-6">
                <Link to="/courses">
                  <button className="p-3 lg:p-4 bg-primary lg:text-xl font-medium text-white rounded-md transition hover:opacity-80">
                    {lang === "nep" ? "सुरु गर्नुहोस्" : "Get Started"}
                  </button>
                </Link>
                <Link to="/videos">
                  <div className="flex items-center">
                    <IoIosPlay className="bg-white p-4 text-primary rounded-full shadow-xl text-6xl cursor-pointer transition hover:opacity-80 mr-4 z-10" />
                    <IoIosPlay className="bg-white p-4 text-primary rounded-full shadow-xl text-6xl cursor-pointer transition hover:opacity-80 mr-4 animate-ping absolute z-0" />
                    <p className="font-medium">
                      {lang === "nep" ? "भिडियो हेर्नुहोस्" : "Watch Video"}
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* right img side  */}
            <div className="hidden lg:block p-10">
              {/* <h2>Video Playlist</h2> */}
              {/* <p>Digital Training SNV Video Playlist From Youtube</p> */}
              {data.map((item) => (
                <div className="h-full w-full rounded-full bg-pink pl-2">
                  <div className="h-full w-full rounded-full overflow-hidden bg-gradient-to-t from-blue-400 shadow-2xl">
                    <Link to="/videos">
                      <img
                        src={item.thumbnail}
                        alt="home image"
                        srcset=""
                        className=" h-full object-cover transition opacity-30"
                      />
                      <div className="absolute top-80  text-white right-64 flex items-center space-x-2">
                        <BsPlay className="text-6xl mt-8" />
                        <h1 className="font-light mt-12">
                          {lang === "nep" ? "भिडियो हेर्नुहोस्" : "Watch Now"}
                        </h1>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* feature home section  */}
      <div className="bg-primary ">
        <div className="container lg:mx-auto px-4 py-8 lg:px-8">
          <div className="flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:items-center justify-between">
            <div className="flex items-center space-x-4 text-xl font-medium text-white">
              <GiSkills className="text-4xl" />
              <p>
                {lang === "nep"
                  ? "अत्यावश्यक सीपहरू सिक्नुहोस्"
                  : "Learn Essential Skills"}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xl font-medium text-white">
              <AiFillSafetyCertificate className="text-4xl" />
              <p>
                {lang === "nep"
                  ? "प्रमाणपत्र प्राप्त गर्नुहोस्"
                  : "Earn Certificate"}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xl font-medium text-white">
              <GiOfficeChair className="text-4xl" />
              <p>
                {lang === "nep"
                  ? "अर्को शिक्षाको लागि तयार हुनुहोस्"
                  : "Get Ready for the next Education"}
              </p>
            </div>
            <div className="flex items-center space-x-4 text-xl font-medium text-white">
              <ImPower className="text-3xl" />
              <p>
                {lang === "nep"
                  ? "सामाजिक जागरूकता मा मास्टर हुनुहोस्"
                  : "Master at Social Awareness"}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* feature home section ends  */}

      {/* recent videos psot  */}
      <div className="container mx-auto px-4 lg:px-8 my-24">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-normal">
              {lang === "nep" ? "भर्खरका पाठ्यक्रमहरू" : "Recent Courses"}
            </h2>
            <hr className="border-2 my-2 -mt-2 w-24 border-primary rounded-full" />
          </div>
          <Link to="/courses">
            <button className="btn-outline-primary rounded-full">
              {lang === "nep" ? "सबै हेर्नुहोस्" : "View All"}
            </button>
          </Link>
        </div>
        <RecentCourses />
      </div>
      {/* recent videos ends  */}
    </Page>
  );
}

export default Home;
