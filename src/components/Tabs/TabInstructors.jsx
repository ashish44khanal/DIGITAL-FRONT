import axios from 'axios';
import React, { useEffect, useState } from 'react'
import InstructorCard from '../Cards/InstructorCard'
import MasterLoading from '../LoadingSpinners/MasterLoading';

function TabInstructors({id}) {
    const [data,setData]=useState([]);
    const [error,setError]=useState([]);
    const [loading,setLoading]=useState(false);
    useEffect(() => {
       try {
        setLoading(true);
        const fetch=async()=>{
            await axios.get(`${process.env.REACT_APP_URL}/instructor/onCourse/${id}`).then(res=>{
                setData(res.data);
                setLoading(false);
            })
        }
        fetch();
       } catch (error) {
           setError(error)
       }
    }, [id])
    return (
        <div>
            <h1>Instructors</h1>
            {loading && <MasterLoading />}
            <p className='text-gray-500 font-medium mt-2'>There are {data.length>0 ? <span>{data.length}</span> : <span>no</span>} instructors for this course</p>

            {/* instructor card starts  */}
            {data.length>0&&
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {data.map(item=>(
                    <InstructorCard name={item.name} img={item.image.split('/')[4]} job_title={item.position} details={item.details} />
                ))}

            </div>
            }
        </div>
    )
}

export default TabInstructors
