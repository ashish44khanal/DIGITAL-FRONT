import React, { useState } from "react";
import { useSelector } from "react-redux";
import TabAbout from "./TabAbout";
import TabCourseContent from "./TabCourseContent";
import TabInstructors from "./TabInstructors";
import TabReviews from "./TabReviews";

function PreviewTabs({ about, id }) {
  const { lang } = useSelector((state) => state.language);

  const [tab, setTab] = useState("about");
  let TabLayout;

  if (tab === "about") {
    TabLayout = <TabAbout data={about} />;
  }
  if (tab === "content") {
    TabLayout = <TabCourseContent id={id} />;
  }
  if (tab === "instructor") {
    TabLayout = <TabInstructors id={id} />;
  }
  if (tab === "reviews") {
    TabLayout = <TabReviews />;
  }
  return (
    <div>
      {/* tabs headers  */}
      <div className="w-full overflow-x-auto">
        <div className="flex items-center space-x-6 lg:text-lg w-max">
          <p
            className={
              tab === "about"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("about")}
          >
            {lang === "nep" ? "पाठ्यक्रम बारे" : "About Course"}
          </p>
          <p
            className={
              tab === "content"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("content")}
          >
            {lang === "nep" ? "पाठ्यक्रम सामग्री" : "Course Content"}
          </p>
          <p
            className={
              tab === "instructor"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("instructor")}
          >
            {lang === "nep" ? "प्रशिक्षकहरू" : "Intructors"}
          </p>
          <p
            className={
              tab === "reviews"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("reviews")}
          >
            {lang === "nep" ? "समीक्षाहरू" : "Reviews"}
          </p>
        </div>
      </div>

      {/* Tab contents  */}
      <div className="my-8">{TabLayout}</div>
    </div>
  );
}

export default PreviewTabs;
