import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CourseContentBox from './TabUtils/CourseContentBox'
function TabCourseContent({id}) {
    const [data,setData]=useState([]);
    useEffect(() => {
        const fetch=async()=>{
            await axios.get(`${process.env.REACT_APP_URL}/course/section/main/onCourse/${id}`).then(res=>{
                setData(res.data);
                console.log(res.data)
            })
        }
        fetch()
    }, [id])

    
    return (
        <div>
            <h3>Course Content</h3>            
            {/* content section  */}
            <div className="my-4 bg-gray-200 p-4 lg:p-8">
                {data.length>0?data.map(item=>(
                    <CourseContentBox key={item.id} title={item.section_title} time={item.section_time} id={item.id} />
                )):<p>No Data Found !!</p>}
                
            </div>
        </div>
    )
}

export default TabCourseContent
