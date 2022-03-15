import React from 'react'

function ErrorMsg({msg}) {
    return (
        <div className='bg-red-800 p-4 rounded-md text-white'>
            <p className="font-medium">
                {msg}
            </p>
        </div>
    )
}

export default ErrorMsg
