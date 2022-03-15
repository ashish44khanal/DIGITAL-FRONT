import React from 'react'

function InstructorCard({img,name,job_title,details}) {
    return (
        <div className='bg-white border border-gray-200 shadow-lg p-4 rounded-md my-4'>
            <div className="">
                <img src={`https://db.cravingcamp.com/instructor_uploads/${img}`} alt={img} srcset="" className='w-24 h-24 object-cover rounded-full' />

                <div className=" my-4">
                    <h2>{name}</h2>
                    <p className="my-2 font-medium text-gray-500">{job_title}</p>

                    <details>
                        <summary className='cursor-pointer'>Details</summary>
                        <p dangerouslySetInnerHTML={{__html:details}} className='text-justify'></p>
                    </details>
                </div>

            </div>
        </div>
    )
}

export default InstructorCard
