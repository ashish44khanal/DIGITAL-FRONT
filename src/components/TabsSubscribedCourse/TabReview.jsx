import React, {  useState } from 'react'
import ReactStars from "react-rating-stars-component";
import {RiStarSFill} from 'react-icons/ri'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
function TabReview() {

    const user_id=useSelector(state=>state.user.user_id);
    const {course_id}=useParams();
    const [rating,setRating]=useState('0');
    const [revMsg,setRevMsg]=useState('');
    const [loading,setLoading]=useState(false);
    const [success,setSuccess]=useState(false);


    const ratingChanged = (newRating) => {
        setRating(newRating)
      };
  
      const handleSubmit=()=>{
          const submit=async()=>{
              await axios.post(`${process.env.REACT_APP_URL}/review`,{
                course_id:course_id,
                user_id:user_id,
                stars:rating,
                review_message:revMsg
              }).then(res=>{
                  console.log(res)
                  setLoading(false);
                  setSuccess(true);
              })
          }
          submit();
      }
    return (

        <div>
           <div className="">
               <h1>Leave a Review</h1>
               {success&&<div className='bg-green-700 p-2 my-4 text-white inline '>Thank you for your Review !</div>}
               <div className="">
               <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    activeColor="#ffd700"
                    size={42}
                    className='w-full'
                    emptyIcon={<RiStarSFill className='text-4xl' />}
                    fullIcon={<RiStarSFill className='text-4xl text-yellow-400' />}
                    
                />
                {rating==='0'?'': <p className='text-lg font-medium mb-4 text-gray-700'>{rating} stars rating</p>}
               </div>

               <form action=""onSubmit={handleSubmit}>
               <div className="flex flex-col space-y-4">
               <textarea name="" id="" rows='4' cols="" className='border border-gray-500 rounded-md w-full lg:w-80 p-2' placeholder='Write your review message...' onChange={(e)=>setRevMsg(e.target.value)}></textarea>
               <input type="submit" className="btn-primary lg:w-24 rounded-md cursor-pointer" value={loading?'LOADING....':"SUBMIT"} />
               </div>
               </form>

           </div>
        </div>
    )
}

export default TabReview
