import React from "react";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { useSelector } from "react-redux";

function CoursesInfoIconCard({ time }) {
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="my-12 lg:flex lg:items-center lg:justify-between">
      <div className="flex text-xl space-x-5 my-7">
        <AiOutlineFieldTime className="text-2xl lg:mt-1" />
        <div>
          <p className="font-bold">
            {lang === "nep" ? "आपेक्षित समय" : "Esitmated Time"}
          </p>
          <p className="text-sm font-medium text-gray-600">{time}</p>
        </div>
      </div>

      <div className="flex text-xl space-x-5 my-7">
        <BsPersonFill className="text-2xl lg:mt-1" />
        <div>
          <p className="font-bold">
            {lang === "nep" ? "व्यक्तिगत प्राथमिकता" : "Personal Perference"}
          </p>
          <p className="text-sm font-medium text-gray-600">
            {lang === "nep"
              ? "आफ्नो गतिमा प्रगति गर्नुहोस्"
              : "Progress at your own speed"}
          </p>
        </div>
      </div>

      <div className="flex text-xl space-x-5 my-7">
        <RiMoneyPoundCircleFill className="text-2xl lg:mt-1" />
        <div>
          <p className="font-bold">{lang === "nep" ? "नि:शुल्क" : "FREE"}</p>
          <p className="text-sm font-medium text-gray-600">
            {lang === "nep" ? "सित्तैमा सिक्नुहोस्" : "Learn for free"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CoursesInfoIconCard;
