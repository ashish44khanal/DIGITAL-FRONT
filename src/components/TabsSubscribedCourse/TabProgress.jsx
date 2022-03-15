import React, { useEffect, useRef } from "react";
import { Circle } from "rc-progress";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BsCheckCircle } from "react-icons/bs";
import Certificate from "../../images/Certificate.jpg";
import congratulationImg from "../../images/congratulations.png";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

// Certificate reference
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} className="">
    <img src={Certificate} alt="certificate" srcset="" />
    <div
      className="absolute p-2 w-80"
      style={{ marginTop: "-51rem", marginLeft: "17rem" }}
    >
      <h2 className="text-center">{props.username} </h2>
    </div>
    <div
      className="absolute  p-2 w-96"
      style={{ marginTop: "-41rem", marginLeft: "14.5rem" }}
    >
      <h2 className=" text-center"> {props.course} </h2>
    </div>

    <div
      className="absolute  p-2 w-96 "
      style={{ marginTop: "-27.2rem", marginLeft: "20.5rem" }}
    >
      <h2 className=" text-center"> {new Date().toDateString()} </h2>
    </div>
  </div>
));

function TabProgress({ progress }) {
  const componentRef = useRef();

  const { enrolled_id, course_id } = useParams();
  const [totalData, setTotalData] = useState("");
  const [completedData, setCompletedData] = useState("");
  const [loading, setLoading] = useState(false);

  const username = useSelector((state) => state.user.username);
  const { course_title } = useSelector((state) => state.course);

  useEffect(() => {
    const fetch = async () => {
      const completed = axios.get(
        `${process.env.REACT_APP_URL}/progress/user/${enrolled_id}`
      );
      const total = axios.get(
        `${process.env.REACT_APP_URL}/statistics/allSubContent/${course_id}`
      );

      setLoading(true);
      await axios.all([completed, total]).then(
        axios.spread(function (res1, res2) {
          setLoading(false);
          setCompletedData(res1.data.length);
          setTotalData(res2.data[0].no);
        })
      );
    };
    fetch();
  }, [enrolled_id, course_id, progress]);
  return (
    <div>
      <h1>My Progress</h1>
      {loading ? (
        "Loading..."
      ) : parseInt(totalData) === parseInt(completedData) ? (
        //   completed section

        <div>
          {/* congratulations msg  */}
          <div className="bg-gray-200 py-24">
            <div className="w-2/3 bg-white rounded-md shadow-lg mx-auto">
              <img src={congratulationImg} alt="Congratulations" />
              <div className="text-center my-8">
                <h1>Congratulations</h1>
                <p className="font-medium text-gray-700">
                  {username} You have successfully completed <br />
                  {course_title}
                </p>
                <button
                  onClick={() => exportComponentAsJPEG(componentRef)}
                  className="btn-primary my-8 rounded-full"
                >
                  DOWNLOAD CERTIFICATE
                </button>
              </div>
            </div>
          </div>
          {/* congratulations msg ends */}
          {/* certificate*/}
          {/* <button
            onClick={() => exportComponentAsJPEG(componentRef)}
            className="btn-primary my-8 rounded-full"
          >
            DOWNLOAD CERTIFICATE
          </button> */}
          <ComponentToPrint
            ref={componentRef}
            username={username}
            course={course_title}
            style={{ display: "none" }}
          />
          {/* certificate */}
        </div>
      ) : (
        // completed section ends
        <>
          <div className="my-4">
            <p>
              Total Completed Course :{" "}
              <span>
                <b>{completedData}</b>
              </span>{" "}
              out of{" "}
              <span>
                <b>{totalData} </b>
              </span>
            </p>
          </div>
          <div className="w-44">
            <Circle
              percent={Math.round((100 / totalData) * completedData)}
              strokeWidth="4"
              strokeColor="#006699"
              className="relative"
            />
            <p className="text-3xl font-medium absolute -mt-28 ml-16">
              {Math.round((100 / totalData) * completedData)} %
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default TabProgress;
