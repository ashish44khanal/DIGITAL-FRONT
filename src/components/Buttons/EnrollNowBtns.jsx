import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function EnrollNowBtns({ id, title }) {
  const user_id = useSelector((state) => state.user.user_id);
  //   console.log("user_id", user_id);

  //   filtering course id to findout if the user has already erolled or not
  const [enrolledData, setEnrolledData] = useState([]);
  const filteredEnrolled = enrolledData.filter(function (enrool) {
    return enrool.course_id == id;
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/enrolled/onUser/${user_id}`)
          .then((res) => {
            setEnrolledData(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [user_id]);
  return (
    <div>
      {filteredEnrolled.length > 0 ? (
        <Link to='/dashboard'>
          <button className='btn-primary w-full'>Continue Course !</button>
        </Link>
      ) : (
        <Link to={`/start_course/${title}/${id}`}>
          <button className='btn-primary w-full'>Enroll Now</button>
        </Link>
      )}
    </div>
  );
}

export default EnrollNowBtns;
