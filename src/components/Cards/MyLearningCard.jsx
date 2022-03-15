import axios from "axios";
import React from "react";

import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createCourseTitle } from "../../Redux/course/CourseInfoSlice";

function MyLearningCard({
  id,
  img,
  title,
  category,
  course_id,
  redirection_link,
  dlt,
}) {
  // learning card route handling
  const dispatch = useDispatch();
  const history = useHistory();
  const routeHandling = async (title) => {
    await dispatch(createCourseTitle(title));
    await history.push(
      `/${id}/${encodeURIComponent(
        title
      )}/${course_id}/subscribed/${redirection_link}`
    );
  };
  const [loading, setLoading] = useState(false);
  // delete handling
  const confirmHandler = () => {
    let r = window.confirm(`Do you want to delete ${title} ?`);
    if (r === true) {
      handleDelete();
    } else {
      return "";
    }
  };

  const handleDelete = () => {
    const dlte = async () => {
      setLoading(true);
      try {
        await axios
          .delete(`${process.env.REACT_APP_URL}/enrolled/${id}`)
          .then((res) => {
            setLoading(false);
            window.location.reload(false);
            dlt();
          });
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    dlte();
  };
  return (
    <div className="bg-white shadow-lg border transition hover:shadow-xl rounded-lg h-full mt-8 lg:mt-0 overflow-hidden">
      <img
        src={img}
        alt={title}
        srcset=""
        className="h-48 lg:h-36 w-full object-cover cursor-pointer"
        onClick={() => routeHandling(title)}
      />

      {/* content section  */}
      <div className="p-3 ">
        <p
          className="font-bold h-20 mt-2  text-xl lg:text-lg cursor-pointer"
          onClick={() => routeHandling(title)}
        >
          {title}
        </p>
        <p className="text-gray-500 mb-2">{category}</p>

        <p
          className="my-4 text-red-700 cursor-pointer"
          onClick={confirmHandler}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <p>
              {" "}
              <u>Remove this course</u>{" "}
            </p>
          )}
        </p>

        {/* <ProgressCard /> */}
        {/* <progress value={progress} max='100' className='w-full'>4</progress>
                <p className='lg:text-sm'>{progress}% Completed</p> */}
      </div>
    </div>
  );
}

export default MyLearningCard;
