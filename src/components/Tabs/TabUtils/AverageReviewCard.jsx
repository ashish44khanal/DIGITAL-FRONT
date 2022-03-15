import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import StarRatingComponent from 'react-star-rating-component'

function AverageReviewCard({total}) {
    const {id}=useParams();
    const [avg,setAvg]=useState('');
    useEffect(() => {
      const fetch=async()=>{
        await axios.get(`${process.env.REACT_APP_URL}/review/avg/${id}`).then(res=>{
            setAvg(res.data[0].avg)
        })
      }
      fetch()
    }, [id])
    return (
        <div className='flex items-center space-x-4'>
            <h1 className="font-light text-7xl">
                        {Number(Math.round(avg+'e'+2)+ 'e-'+2).toFixed(2)}
                    </h1>
                    <div>
                    <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        renderStarIcon={() => <span><AiFillStar /></span>}
                        starCount={5}
                        value={avg}
                        className='mt-5 text-xl'
                        />
                        <div className="my-1 flex items-center text-gray-600 space-x-1 ">
                        <BsFillPersonFill />
                        <p>{total}</p> <span> Total </span>
                    </div>
                    </div>
                    
        </div>
    )
}

export default AverageReviewCard
