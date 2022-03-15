import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CoursesCard from "../components/Cards/CoursesCard";
import MasterLoading from "../components/LoadingSpinners/MasterLoading";
import CoursesTitle from "../components/PageEssentials/CoursesTitle";
import PageHistoryBar from "../components/PageEssentials/PageHistoryBar";
import Pagination from "../components/PageEssentials/Pagination";
import Page from "../templates/Page";

function CoursesSearch() {
  const { id, name } = useParams();
  const { lang } = useSelector((state) => state.language);

  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = useState(false);

  // pagination
  const [currentPage, setCurentPage] = useState(1);
  const [coursePerPage] = useState(8);
  //  GET CURRNT COURSE
  const indexOfLastCourse = currentPage * coursePerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursePerPage;
  const currentCourses = data.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber) => setCurentPage(pageNumber);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        axios
          .get(`${process.env.REACT_APP_URL}/course/category/${id}`)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          });
      } catch (error) {
        setError(true);
      }
    };
    fetch();
  }, [id, name]);
  return (
    <Page>
      {/* history bar top  */}

      <PageHistoryBar
        page1={lang === "nep" ? "पाठ्यक्रमहरू" : "Courses"}
        page2={name}
      />

      {/* main container  */}
      <div className="container mx-auto px-4 lg:px-8 mb-10">
        <CoursesTitle course={name} />
        <Link to="/courses" className="underline">
          {lang === "nep"
            ? "सम्पुण पाठ्यक्रमहरू हेर्नुहोस्"
            : "View All Courses"}
        </Link>

        {loading && <MasterLoading />}

        {/* course card   */}
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-10 md:gap-6 gap-8 my-16">
          {data.map((item) => (
            <Link key={item.id} to={`/course/${item.id}/${item.course_title}`}>
              <CoursesCard
                key={item.id}
                img={item.image}
                title={item.course_title}
                Lectures={item.course_type}
                author={item.estimated_time}
              />
            </Link>
          ))}
        </div>

        {/* pagination  */}
        {data.length < coursePerPage ? (
          ""
        ) : (
          <Pagination
            coursePerPage={coursePerPage}
            totalCourses={data.length}
            paginate={paginate}
          />
        )}
      </div>
    </Page>
  );
}

export default CoursesSearch;
