import React from 'react'
import {useParams} from 'react-router-dom';
import axios from 'axios'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

function TabNotes({link}) {
    // const{course_id}=useParams();
    // const [link,setLink]=React.useState('');
    // console.log(link)
    // const [loading,setLoading]=React.useState(false);

    // React.useEffect(() => {
    //    const fetch=async()=>{
    //     try {
    //         setLoading(true);
    //         await axios.get(`${process.env.REACT_APP_API}/course/${course_id}`).then(res=>{
    //             setLoading(false);
    //             setLink(res.data[0].preview_video);
    //         })
    //     } catch (error) {
    //         console.error(error)
    //     }
    //    }
    //    fetch();
    // }, [course_id])
    return (
        <div className='w-full  h-96 md:h-screen'>
            {/* {loading&& <AiOutlineLoading3Quarters className='animate-spin text-2xl' />} */}
            {link.map(item=>(
                <iframe src={item.preview_video} width="" height="" frameborder="0" scrolling="no" className='w-full h-full'></iframe>
            ))}
        </div>
    )
}

export default TabNotes
