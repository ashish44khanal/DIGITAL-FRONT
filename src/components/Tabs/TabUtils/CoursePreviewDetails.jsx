import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";

function CoursePreviewDetails({ title, time, preview }) {
  return (
    <div className="my-3 ml-5 lg:flex lg:items-center justify-between">
      <div className="flex items-center space-x-4">
        <AiFillPlayCircle />
        <p className="font-medium">{title}</p>
      </div>

      <div className="lg:flex lg:items-center ml-8 lg:ml-0 lg:space-x-4">
        <p
          className={
            preview === "true" ? "font-medium" : "font-medium text-gray-500"
          }
        >
          Preview
        </p>
        <p className="font-medium">{time}</p>
      </div>
    </div>
  );
}

export default CoursePreviewDetails;
