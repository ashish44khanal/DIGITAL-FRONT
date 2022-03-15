import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import ReviewCard from '../../Cards/ReviewCard';
import AverageReviewCard from './AverageReviewCard';

function AvgReview() {
    const{id}=useParams();
    const [data,setData]=useState([]);

    useEffect(() => {
        const fetch=async()=>{
            try {
                await axios.get(`${process.env.REACT_APP_URL}/review/${id}`).then(res=>{
                    console.log(res)
                    setData(res.data)
                })
            } catch (error) {
                console.error(error)
            }
            
        }
        fetch();
    }, [id])
    return (
        <div>

                {/* left section  */}
                <div className="">
                    <AverageReviewCard total={data.length} />
                </div>

            {/* actual reviews section */}
            {data.map(item=>(
            <div className="" key={item.id}>
                <ReviewCard name={item.username} img={item.image} rating={item.stars} review={item.review_message} />
            <hr />
            </div>
            ))}

        </div>
    )
}

export default AvgReview
