import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizTabs from "../Tabs/QuizTabs";
import TabAbout from "../Tabs/TabAbout";
// import TabCourseContent from "../Tabs/TabCourseContent";
// import TabInstructors from "../Tabs/TabInstructors";
// import TabReviews from "../Tabs/TabReviews";
import TabNotes from "./TabNotes";
import TabProgress from "./TabProgress";
import TabReview from "./TabReview";
function SubscribedTabs({ progress }) {
  const [tab, setTab] = useState("about");
  const [data, setData] = useState([]);
  const { course_id, name } = useParams();
  let TabLayout;

  if (tab === "about") {
    TabLayout = data.map((item) => (
      <TabAbout key={item.id} data={item.course_details} />
    ));
  }
  if (tab === "progress") {
    TabLayout = <TabProgress progress={progress} />;
  }
  if (tab === "notes") {
    TabLayout = <TabNotes link={data} />;
  }
  if (tab === "review") {
    TabLayout = <TabReview />;
  }
  if (tab === "quiz") {
    TabLayout = <QuizTabs course_id={course_id} course={name} />;
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/course/${course_id}`)
          .then((res) => {
            setData(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [course_id]);

  return (
    <div>
      {/* tabs headers  */}
      <div className="w-full overflow-x-auto bg-gray-200 shadow">
        <div className="flex items-center space-x-6 lg:text-lg w-max">
          <p
            className={
              tab === "about"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("about")}
          >
            About Course
          </p>
          <p
            className={
              tab === "progress"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("progress")}
          >
            My Progress
          </p>
          <p
            className={
              tab === "notes"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("notes")}
          >
            Slideshare
          </p>
          <p
            className={
              tab === "review"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("review")}
          >
            Leave a Review
          </p>
          <p
            className={
              tab === "quiz"
                ? "font-bold border-b-2 border-blue-400 p-2 cursor-pointer w-max"
                : "font-medium text-gray-500 cursor-pointer w-max p-2"
            }
            onClick={(e) => setTab("quiz")}
          >
            Quiz
          </p>
        </div>
      </div>

      {/* Tab contents  */}
      <div className="my-8">{TabLayout}</div>
    </div>
  );
}

export default SubscribedTabs;
