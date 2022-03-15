import axios from "axios";
import { useEffect, useState } from "react";
import MasterLoading from "../LoadingSpinners/MasterLoading";
import { Link, useParams } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";

function TabSubscribedCourseTextContent({ id, progress }) {
  const { enrolled_id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progressData, setProgressData] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [handleMarkasRead, setHandleMarkasRead] = useState(false);

  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smoothly scrolling
    });
  };

  const handleProgress = async () => {
    try {
      setLoading2(true);
      await axios
        .post(`${process.env.REACT_APP_URL}/progress`, {
          enrolled_id: enrolled_id,
          sub_section_id: id,
          checked: "true",
        })
        .then((res) => {
          setLoading2(false);
          setHandleMarkasRead(!handleMarkasRead);
          progress();
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const textContent = axios.get(
        `${process.env.REACT_APP_URL}/course/section/sub/${id}`
      );
      const progress = axios.get(
        `${process.env.REACT_APP_URL}/progress/user/${enrolled_id}/${id}`
      );

      try {
        setLoading(true);
        await axios.all([textContent, progress]).then(
          axios.spread(function (res1, res2) {
            setLoading(false);
            setData(res1.data);
            if (res2.data?.length > 0) {
              setProgressData(res2.data[0]?.sub_section_id);
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, [id, enrolled_id, handleMarkasRead]);
  return (
    <div>
      {loading && <MasterLoading />}
      {data.map((item) => (
        <div
          key={item.id}
          dangerouslySetInnerHTML={{ __html: item.text_content }}
          className={`my-4 text-xl leading-10 text-justify p-4 lg:p-8 ${
            parseInt(progressData) === parseInt(id)
              ? "bg-green-50"
              : "bg-gray-50"
          }`}
        ></div>
      ))}
      <div className="-mt-1 ml-2">
        {parseInt(progressData) === parseInt(id) ? (
          <div className="flex items-center space-x-4 my-14">
            <div
              className="bg-green-600 h-12 p-3 px-5 text-white"
              title="You Have already finished this topic and it has been added to your
              progress report"
            >
              Added in Progress
            </div>
            <div
              className="bg-gray-200 h-12 p-3 px-5 cursor-pointer text-gray-600"
              onClick={() => scrollToTop()}
            >
              Back to Top
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4 font-medium my-14 text-gray-800">
            <div
              className="btn-outline-primary cursor-pointer"
              title="TIPS : After you click here it will be marked
                    as read and your progress will be increase which is
                    essential to get you certified."
              onClick={handleProgress}
            >
              {loading2 ? "Loading...." : "Mark as read"}
            </div>

            <div
              className="bg-gray-200 h-12 p-3 px-5 cursor-pointer text-gray-600"
              onClick={() => scrollToTop()}
            >
              Back to Top
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabSubscribedCourseTextContent;
