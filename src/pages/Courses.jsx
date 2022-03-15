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

function Courses() {
  const { lang } = useSelector((state) => state.language);

  const [drop, setDrop] = useState(false);

  const [loading, setLoading] = useState(false);
  const [courseData, setcourseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await axios
        .get(`${process.env.REACT_APP_URL}/course/lang/${lang}`)
        .then((res) => {
          setcourseData(res.data);
          setLoading(false);
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

  const coursedropHandler = () => {
    setDrop(!drop);
    try {
      const fetch = async () => {
        await axios
          .get(`${process.env.REACT_APP_URL}/category/lang/${lang}`)
          .then((res) => {
            setCategoryData(res.data);
          });
      };
      fetch();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      {/* top section  */}
      <div className="bg-gray-200 h-24"></div>
      {/* search bar section  */}
      <div className="flex justify-center px-4 lg:px-0 -mt-12 lg:-mt-8">
        <div className="bg-white shadow-lg rounded-md p-4 flex items-center w-full lg:w-1/2">
          <BiSearch className="hidden lg:block text-gray-600 mx-2 text-xl" />
          <input
            type="text"
            name=""
            id=""
            className=" flex-1 py-1 lg:px-6  focus:outline-none border-r-2 "
            placeholder={
              lang === "nep"
                ? "पाठ्यक्रमहरू खोज्नुहोस्......"
                : "Search courses...."
            }
          />

          {/* dropdown arrow  */}
          <p
            className="pl-4 cursor-pointer flex justify-between items-center  lg:w-32 z-0"
            onClick={coursedropHandler}
          >
            <span className="font-medium relative z-0" style={{ zIndex: "0" }}>
              {lang === "nep" ? "पाठ्यक्रमहरू" : "Courses"}
            </span>{" "}
            <RiArrowDropDownLine
              className={
                drop
                  ? "font-bold text-3xl transform transition rotate-180"
                  : "font-bold transform transition ratate-90 text-3xl"
              }
            />
            {/* dropdwon contents  */}
            {drop ? (
              <div className="absolute bg-white p-4 shadow-xl mt-96 lg:mt-96  lg:w-auto right-4 lg:right-auto">
                <CategoryDropdownCourse data={categoryData} />
              </div>
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="gray-50 pb-24">
        {/* search info section  */}
        <div className=" text-center mt-12 my-4 p-2">
          <h1>{lang === "nep" ? "सबै पाठ्यक्रमहरू" : "All Courses"}</h1>
          <p className="my-2 font-medium text-gray-600">
            {courseData.length}
            <span className="ml-2">
              {lang === "nep" ? "उत्कृष्ट पाठ्यक्रमहरू" : "outstanding Courses"}
            </span>
          </p>
        </div>
        {/* course  */}
        <div className="container mx-auto px-4 lg:px-8 mb-10">
          {loading && <MasterLoading />}
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-10 md:gap-6 gap-8 my-16">
            {currentCourses.map((item) => (
              <Link
                key={item.id}
                to={`/course/${item.id}/${item.course_title}`}
              >
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
      </div>
    </Page>
  );
}

export default Courses;
