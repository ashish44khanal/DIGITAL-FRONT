import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillCloseCircle, AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { RiSyringeLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";

function ContentTitles({ no, title, time, id, course_id }) {
  const { enrolled_id } = useParams();

  const subcontentId = useParams().id;

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  return (
    <div
      className={`flex px-2 py-2 my-2 ${
        parseInt(subcontentId) === id && "bg-primary text-black font-medium"
      }`}
    >
      <Link
        to={`/${enrolled_id}/${encodeURIComponent(
          title
        )}/${course_id}/subscribed/${id}`}
        onClick={scrollToTop}
      >
        <div className="-mt-1 ml-2 py-1">
          <p>
            {no} {title}
          </p>
          <p className="text-sm">{time}</p>
        </div>
      </Link>
    </div>
  );
}

export default ContentTitles;
