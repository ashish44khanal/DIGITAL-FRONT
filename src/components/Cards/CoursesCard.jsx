import React from "react";

function CoursesCard({ img, title, author, Lectures }) {
  return (
    <div className="bg-white rounded-xl shadow-md xl:shadow-lg overflow-hidden cursor-pointer transition hover:shadow-2xl h-full">
      <img
        src={img}
        alt=""
        className="w-full h-44 bg-green-200 object-cover"
        srcset=""
      />

      {/* contents  */}
      <div className="p-4 ">
        <h4 className="text-gray-800 h-20 text-xl lg:text-base">{title}</h4>
        <div className="">
          <p className="text-gray-600 font-medium text-lg">{author}</p>
          <p className="text-gray-500 mt-2 mb-4 lg:text-sm">
            {Lectures} Lectures
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoursesCard;
