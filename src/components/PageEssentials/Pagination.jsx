import React from 'react'
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io'

function Pagination({coursePerPage,totalCourses,paginate}) {

    const pageNumbers=[];
    const [currentPage,setCurrentPage]=useState(1);

    for(let i=1; i<=Math.ceil(totalCourses/coursePerPage);i++){
        pageNumbers.push(i)
    }

 
    return (
        <div className='flex items-center space-x-4'>
            <IoIosArrowForward className='transform rotate-180 bg-gray-100 h-10 w-10 p-3 rounded shadow cursor-pointer transition hover:shadow-lg' onClick={()=>{setCurrentPage(currentPage-1);paginate(currentPage-1);}} />
            {pageNumbers.map(num=>(
                            <p className={pageNumbers.indexOf(num)+1===currentPage ? 'bg-primary h-10 w-10 p-3 rounded shadow cursor-pointer transition hover:shadow-lg' : 'bg-gray-100 h-10 w-10 p-3 rounded shadow cursor-pointer transition hover:shadow-lg'} onClick={()=>{setCurrentPage(num);paginate(num)}}>{num}</p>
            ))}           
            <IoIosArrowForward className='bg-gray-100 h-10 w-10 p-3 rounded shadow cursor-pointer transition hover:shadow-lg' onClick={()=>{setCurrentPage(currentPage+1);paginate(currentPage+1);}}  />

        </div>
    )
}

export default Pagination
