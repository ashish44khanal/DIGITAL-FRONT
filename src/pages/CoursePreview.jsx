import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHistoryBar from "../components/PageEssentials/PageHistoryBar";
import Page from "../templates/Page";
import { GiPlainCircle } from "react-icons/gi";
import CoursesInfoIconCard from "../components/Cards/CoursesInfoIconCard";
import PreviewTabs from "../components/Tabs/PreviewTabs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../Redux/course/CourseInfoSlice";
import MasterLoading from "../components/LoadingSpinners/MasterLoading";
import { Helmet } from "react-helmet";
import EnrollNowBtns from "../components/Buttons/EnrollNowBtns";

function CoursePreview() {
  const { lang } = useSelector((state) => state.language);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  //   console.log("enrolled data", enrolledData);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();
  const { id } = useParams();

  //   console.log("enrooled or not",filteredEnrolled);

  useEffect(() => {
    dispatch(createCourse(id));
    setLoading(true);
    const fetch = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_URL}/course/${id}`)
          .then((res) => {
            setData(res.data);
            setLoading(false);
          });
      } catch (error) {
        setError(error);
      }
    };
    fetch();
  }, [id]);
  return (
    <Page>
      {loading && <MasterLoading />}
      {data.map((item) => (
        <div key={item.id}>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{item.course_title}</title>
            <link rel="canonical" href={window.location.href} />
            <meta property="og:title" content={item.course_title} />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={item.image}></meta>
            <meta property="og:url" content={window.location.href}></meta>
          </Helmet>

          {/* container  */}
          <PageHistoryBar
            page1={`${lang === "nep" ? "पाठ्यक्रम" : "Course"}`}
            page2={item.course_title}
          />

          <div className="container mx-auto px-4 lg:px-8">
            {/* course title section  */}
            <div className="my-4 grid grid-cols-2 lg:grid-cols-5 lg:gap-10">
              {/* left section  */}
              <div className="col-span-3 py-4">
                <div className="hidden lg:block">
                  <div className="flex items-center space-x-3">
                    <GiPlainCircle className="text-primary" />
                    <p>
                      {lang === "nep"
                        ? "पाठ्यक्रम को लेखक"
                        : "Author of Course"}
                    </p>
                  </div>
                  <h1 className="my-4">{item.course_title}</h1>
                </div>
                <div className="my-2 text-gray-700">
                  {item.short_description}
                </div>

                <CoursesInfoIconCard time={item.estimated_time} />

                {/* mobile view for enroll now button  */}
                <div className="block lg:hidden my-4 sticky top-1 z-10">
                  {isLoggedIn ? (
                    <EnrollNowBtns id={id} title={item.course_title} />
                  ) : (
                    <Link to="/login">
                      <button className="btn-primary w-full">Enroll Now</button>
                    </Link>
                  )}
                </div>

                {/* tabs  */}
                <PreviewTabs about={item.course_details} id={id} />
              </div>

              {/* right section  */}
              <div className="row-start-1 lg:col-start-4 col-span-2 ">
                <div className="bg-gray-100 lg:sticky top-24">
                  {/* video title sefction for small screen only  */}
                  <div className="block p-4 lg:hidden">
                    <div className="flex items-center space-x-3">
                      <GiPlainCircle className="text-primary" />
                      <p>Author of Course</p>
                    </div>
                    <h2 className="my-4">{item.course_title}</h2>
                  </div>

                  {/* video section  */}
                  <div className="block">
                    {/* <video controls className='w-full'>
                      <source src={item.preview_video} type='video/mp4' />
                      your browser doesn't support video tag
                    </video> */}
                    <img src={item.image} alt="" srcset="" />
                  </div>

                  <div className="p-4 lg:p-8">
                    <p className="font-medium my-4 text-center">
                      Preview this course
                    </p>
                    <div className="hidden lg:block">
                      <p className="my-4">
                        After a course session ends, it will be archived.
                      </p>
                      <div className="my-4">
                        {isLoggedIn ? (
                          <EnrollNowBtns id={id} title={item.course_title} />
                        ) : (
                          <Link to="/login">
                            <button className="btn-primary w-full">
                              Enroll Now
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Page>
  );
}

export default CoursePreview;
