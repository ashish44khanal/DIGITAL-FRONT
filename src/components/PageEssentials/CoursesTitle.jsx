import React from "react";
import { useSelector } from "react-redux";

function CoursesTitle({ course }) {
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="my-4">
      <h1 className="my-3">
        {course}
        {lang === "nep" ? "काे पाठ्यक्रमहरू" : " Courses"}
      </h1>
    </div>
  );
}

export default CoursesTitle;
