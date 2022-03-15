import React from 'react'
import { Link } from 'react-router-dom'

function CategoryDropdownCourse({data}) {
    return (
        <div className="z-50 max-h-80 overflow-auto">
        {data.map(item=>(
        <div className='my-3' key={item.id}>
            <Link to={`/search/${item.id}/${item.category}`}>{item.category}</Link>
        </div>
        ))}
        </div>
        
    )
}

export default CategoryDropdownCourse
