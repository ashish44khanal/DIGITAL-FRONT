import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiArrowDropRightLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import ContentTitles from "./ContentTitles";

function CourseContentSubsccribe({ id, title, time, course_id }) {
  const [des, setDes] = useState([]);
  const [checked, setChecked] = useState(false);

  const { enrolled_id } = useParams();
  const subcontentId = useParams().id;

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`${process.env.REACT_APP_URL}/course/section/sub/onSection/${id}`)
        .then((res) => {
          setDes(res.data);
        });
    };

    fetch();
  }, [id]);

  // const handleCheck=(id)=>{
  // progressData.data.filter(curElem=>{
  //                 if(curElem.sub_section_id==id){
  //                     setChecked(true)
  //                 }
  //                 else{
  //                     setChecked(false)
  //                 }
  //               })
  // }
  return (
    <div className="container mx-auto lg:px-0">
      <div className="w-full cursor-pointer">
        <details>
          <summary className="flex flex-col">
            {" "}
            <p className="flex items-center justify-between font-medium w-full">
              {" "}
              {title}{" "}
              <RiArrowDropRightLine className="text-2xl transform rotate-90" />
            </p>{" "}
            <p className="text-sm mt-1">{time}</p>{" "}
          </summary>

          {des.map((item) => (
            <ContentTitles
              key={item.id}
              title={item.sub_section_title}
              time={item.time}
              checked={checked}
              id={item.id}
              course_id={course_id}
            />
          ))}
        </details>
      </div>
      <hr className="border-black my-4" />
    </div>
  );
}

export default CourseContentSubsccribe;
