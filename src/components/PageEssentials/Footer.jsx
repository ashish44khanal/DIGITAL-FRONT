import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../images/snv.jpg";
function Footer() {
  return (
    <div className="bg-primary text-center mt-24">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <h1 className="uppercase font-normal text-white">
          All the tools you need to educate
        </h1>
        <div className="text-center">
          Imrove your learning experiences and outcomes with this powerful{" "}
          <span className="hidden lg:inline">
            <br />
          </span>
          learning management system designed for the 21st century learner.
        </div>
        <div className="my-10 font-bold text-lg flex justify-center items-center space-x-4 lg:space-x-8 uppercase">
          <Link to="/courses">Courses</Link>
          <hr />
          <Link to="/about">About Us</Link>
          <hr />
          <Link to="/partners">Partners</Link>
        </div>
        <div className="my-8 flex justify-center">
          <div className="flex items-center space-x-4">
            <span className="border lg:w-96"></span>
            <img
              src={logo}
              alt=""
              srcset=""
              className="text-center w-24 bg-blend-overlay"
              style={{ mixBlendMode: "lighten" }}
            />
            <div className="">
              {/* <p className="text-xl font-bold uppercase text-white">
                Contact US Through
              </p> */}
            </div>
            <span className="border lg:w-96"></span>
          </div>
        </div>
        {/* <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <IoCall />
              <p className="font-semibold">+977-019485499</p>
            </div>
            <div className="flex items-center space-x-2">
              <AiOutlineMail />
              <p className="font-semibold">Digitaltraining@gmail.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <BiCurrentLocation />
              <p className="font-semibold">Location Kathmandu</p>
            </div>
          </div>
        </div> */}
      </div>
      <div className="bg-primaryD py-4">
        &copy; Digital Training SNV {new Date().getFullYear()}
        {/* <p className="text-sm mt-3">
          <a
            href="http://trioplustechnology.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Created by Trioplus Technology
          </a>
        </p> */}
      </div>
    </div>
  );
}

export default Footer;
