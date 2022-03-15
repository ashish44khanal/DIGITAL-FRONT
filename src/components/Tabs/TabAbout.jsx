import React from 'react'

function TabAbout({data}) {
    
    return (
        <div dangerouslySetInnerHTML={{__html:data}} className='text-justify leading-8 line-clamp-4 text-gray-600 text-lg' >
        </div>
    )
}

export default TabAbout
