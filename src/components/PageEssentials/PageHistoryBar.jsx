import React from "react";
import { IoIosArrowForward } from "react-icons/io";

function PageHistoryBar({ page1, page2, page3 }) {
  return (
    <div className='bg-gray-200 lg:bg-gray-100 py-4'>
      <div className='container mx-auto px-4 lg:px-8'>
        <div className='flex items-center space-x-6'>
          <p>{page1}</p>
          <IoIosArrowForward />
          <p>{page2}</p>
          {page3 != null ? (
            <>
              <IoIosArrowForward />
              <p>{page3}</p>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHistoryBar;
