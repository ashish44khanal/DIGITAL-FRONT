import React from "react";

function ProgressCard() {
  const w = 90;
  return (
    <>
      <div className='bg-gray-200 w-full rounded overflow-hidden'>
        <div
          className='bg-green-500 text-center p-1'
          style={{ width: `${w}%` }}
        ></div>
      </div>
      <p className='text-gray-500 text-sm my-2 '>My Progress : <span className="font-medium">{w}%</span> </p>
    </>
  );
}

export default ProgressCard;
