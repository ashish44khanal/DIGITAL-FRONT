import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CoursesCard from "../components/Cards/CoursesCard";
import CategoryDropdownCourse from "../components/Dropdowns/CategoryDropdownCourse";
import MasterLoading from "../components/LoadingSpinners/MasterLoading";
import Pagination from "../components/PageEssentials/Pagination";
import Page from "../templates/Page";

function RecentCourses() {
  const { lang } = useSelector((state) => state.language);

  const [loading, setLoading] = useState(false);
  const [courseData, setcourseData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_URL}/course/recentCourses/lang/${lang}`)
        .then((res) => {
          setLoading(false);
          setcourseData(res.data);
          // for (let i = 0; i < 4; i++) {
          //   if (res.data[i] != null) {
          //     courseData.push(res.data[i]);
          //   }
          // }
        });
    };
    fetch();
  }, [lang]);

  //  GET CURRNT COURSE
  // pagination
  const [currentPage, setCurentPage] = useState(1);
  const [coursePerPage] = useState(8);
  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourses = courseData.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const paginate = (pageNumber) => setCurentPage(pageNumber);

  return (
    <>
      {/* course  */}
      <div className="flex justify-center">
        {loading && <MasterLoading />}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-10 md:gap-6 gap-8 my-16">
          {currentCourses.map((item) => (
            <Link key={item.id} to={`/course/${item.id}/${item.course_title}`}>
              <CoursesCard
                img={item.image}
                title={item.course_title}
                Lectures={item.course_type}
                author={item.estimated_time}
              />
            </Link>
          ))}
        </div>

        {courseData.length < coursePerPage ? (
          ""
        ) : (
          <Pagination
            coursePerPage={coursePerPage}
            totalCourses={courseData.length}
            paginate={paginate}
          />
        )}
      </div>
    </>
  );
}

export default RecentCourses;
