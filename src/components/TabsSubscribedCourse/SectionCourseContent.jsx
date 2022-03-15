import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseContentSubsccribe from "../SubscribedCourses/CourseContentSubsccribe";

function SectionCourseContent({ course_id }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_URL}/course/section/main/onCourse/${course_id}`
        )
        .then((res) => {
          setData(res.data);
        });
    };
    fetch();
  }, [course_id]);

  return (
    <div className="my-4 p-2 inline-block w-full">
      {data.map((item) => (
        <CourseContentSubsccribe
          key={item.id}
          id={item.id}
          title={item.section_title}
          time={item.section_time}
          course_id={course_id}
        />
      ))}
    </div>
  );
}

export default SectionCourseContent;
