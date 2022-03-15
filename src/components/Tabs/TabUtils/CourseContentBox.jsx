import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import CoursePreviewDetails from './CoursePreviewDetails'

function CourseContentBox({title, time,id}) {
    const course_id = useSelector(state => state.course_id);
    const [des,setDes]=useState([]);
    useEffect(() => {
        
       const fetch =async()=>{
           await axios.get(`${process.env.REACT_APP_URL}/course/section/sub/onSection/${id}`).then(res=>{
               setDes(res.data);
           })     
       }
       fetch()
    }, [id,des])

    return (
        <div>
            <div className="relative cursor-pointer">                  
                      <details>
                          <summary className='flex items-center justify-between'> <p className='flex items-center space-x-2 font-medium'> <RiArrowDropRightLine className='text-2xl' /> {title}</p> <p>{time}</p> </summary>
                          {des.map(item=>(
                                <CoursePreviewDetails title={item.sub_section_title} time={item.time} preview={item.preview} />
                          ))}
                      </details>                  
                </div>
                <hr className='border-black my-4' />
        </div>
    )
}

export default CourseContentBox
