import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import StarRatingComponent from 'react-star-rating-component'

function ReviewCard({name,rating,review,img}) {
    return (
        <div className='my-4 flex space-x-4'>
            <div >
                <h1 className="h-16 w-16 ">
                {img ? <img src={img} alt="" srcset="" className="rounded-full text-center" /> : <div className="bg-gray-200 text-center rounded-full text-lg p-2 font-bold h-full text-4xl">{name.split('')[0].toUpperCase()}</div>}

                    {/* <img src={img} alt="" srcset="" className='rounded-full text-center' /> */}
                </h1>
            </div>

            {/* right section  */}
            <div className="">
                <h2 className='font-medium'>{name}</h2>
                <StarRatingComponent 
                        name="rate2" 
                        editing={false}
                        renderStarIcon={() => <span><AiFillStar /></span>}
                        starCount={5}
                        value={rating}
                        className=''
                        />
                <p className="my-1 text-gray-500">
                    {review}
                </p>
            </div>
        </div>
    )
}

export default ReviewCard
