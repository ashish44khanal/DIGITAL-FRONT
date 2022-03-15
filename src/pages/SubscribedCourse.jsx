import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBook, FaFilePdf, FaVideo } from "react-icons/fa";
import { useParams } from "react-router-dom";
// import CourseContentSubsccribe from "../components/SubscribedCourses/CourseContentSubsccribe";
// import TabSubscribedCoursePdfContent from "../components/Tabs/TabSubscribedCoursePdfContent";
import TabSubscribedCourseTextContent from "../components/Tabs/TabSubscribedCourseTextContent";
import TabSubscribedCourseVideoContent from "../components/Tabs/TabSubscribedCourseVideoContent";
import SectionCourseContent from "../components/TabsSubscribedCourse/SectionCourseContent";
import SubscribedTabs from "../components/TabsSubscribedCourse/SubscribedTabs";
import Page from "../templates/Page";
import { BiDownload } from "react-icons/bi";

function SubscribedCourse() {
  const { id, course_id } = useParams();

  const [tab, setTab] = useState("text");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [download, setDownload] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [pdfFile, setPdfFile] = useState("");
  const [downloadId, setDownlaodId] = useState("");
  // console.log("download ID", downloadId);
  const [progressRealtime, setProgressRealTime] = useState(false);
  const handleRealTimeProgress = () => {
    setProgressRealTime(!progressRealtime);
  };
  // hanlde download
  const handleDownload = async () => {
    setDownload(true);
    try {
      setLoading2(true);
      await axios
        .get(`${process.env.REACT_APP_URL}/courseDownload/${course_id}`)
        .then((res) => {
          setTimeout(() => {
            setLoading2(false);
          }, 4000);
          setPdfFile(res.data[0].download_file);
          setDownlaodId(res.data[0].id);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // download update
  const handleDownloadUpdate = async () => {
    try {
      await axios
        .put(`${process.env.REACT_APP_URL}/courseDownload/${downloadId}`)
        .then((res) => {
          console.log("res", res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };

  // tab layouts
  let TabLayout;
  if (tab === "text")
    TabLayout = (
      <TabSubscribedCourseTextContent
        id={id}
        progress={handleRealTimeProgress}
      />
    );
  if (tab === "video")
    TabLayout = data.map((item) => (
      <TabSubscribedCourseVideoContent
        key={item.id}
        ids={item.id}
        video={item.YoutubeLink}
      />
    ));
  // if(tab==='pdf') TabLayout=data.map(item=>(<TabSubscribedCoursePdfContent key={item.id} ids={item.id} title={item.sub_section_title} />))

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        await axios
          .get(`${process.env.REACT_APP_URL}/course/section/sub/${id}`)
          .then((res) => {
            setTimeout(() => {
              setLoading(false);
            }, 2000);
            setData(res.data);
          });
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [id, progressRealtime]);

  return (
    <Page>
      <div className="container mx-auto px-4">
        {/* grid */}
        <div className="mt-6 lg:mt-0 lg:grid lg:grid-cols-7 gap-4 ">
          <div className="block lg:col-span-5 ">
            {/* video section  */}
            <div className="grid grid-cols-2">
              <div
                className={`text-center w-full flex justify-center cursor-pointer  shadow p-2 ${
                  tab === "text" ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setTab("text")}
              >
                <FaBook
                  className={`${
                    tab === "text" ? "text-green-900" : "text-gray-600"
                  }`}
                />
              </div>
              <div
                className={`text-center w-full flex justify-center cursor-pointer shadow p-2  ${
                  tab === "video" ? "bg-green-100" : "bg-gray-100"
                }`}
                onClick={() => setTab("video")}
              >
                <FaVideo
                  className={`${
                    tab === "video" ? "text-green-900" : "text-gray-600"
                  }`}
                />
              </div>
              {/* <div className={`text-center w-full flex justify-center cursor-pointer shadow p-2  ${tab==='pdf' ? 'bg-green-100' : 'bg-gray-100'}`} onClick={()=>setTab('pdf')}>
                               <FaFilePdf className={`${tab==='pdf'?'text-green-900':'text-gray-600'}`}/>
                               </div>
                             */}
            </div>

            {TabLayout}

            {/* title of currently watching video for mobile view */}
            <div className="block lg:hidden my-2">
              <p className="font-medium text-xl">Introduction to the course</p>

              {/* mobile view for course contents  */}
              <div className="bg-gray-100 flex items-center justify-between p-2 shadow-lg my-4">
                <details className="w-full">
                  <summary>Course Content</summary>
                  <SectionCourseContent course_id={course_id} />
                </details>
              </div>
            </div>

            {/* tabs Section  */}
            <div className="my-8">
              <SubscribedTabs progress={handleRealTimeProgress} />
            </div>
          </div>

          {/* right section  */}
          <div className="lg:col-span-2 hidden lg:block h-full ">
            <div className="bg-primaryDark text-white lg:h-screen overflow-auto p-3 sticky top-0">
              <p className="text-xl font-bold mb-4">Course Content</p>
              <div
                className={`px-3 py-2 rounded text-white font-medium flex justify-center cursor-pointer ${
                  download ? "btn-primary" : "btn-secondary"
                }`}
                onClick={handleDownload}
              >
                <div
                  className={`flex items-center ${
                    download ? "hidden" : "block"
                  }`}
                >
                  <BiDownload className="mr-2" />
                  Download Full Course
                </div>
                <div
                  className={`flex items-center ${
                    !download ? "hidden" : "block"
                  }`}
                >
                  <BiDownload className="mr-2 animate-bounce" />
                  <span onClick={handleDownloadUpdate}>
                    <a
                      href={pdfFile}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                    >
                      {loading2
                        ? "Creating Download Link ...."
                        : "Download Now !"}
                    </a>
                  </span>
                </div>
              </div>
              <div className="">
                <SectionCourseContent course_id={course_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

export default SubscribedCourse;
