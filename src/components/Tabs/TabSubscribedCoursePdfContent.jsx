import axios from "axios";
import { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";

function TabSubscribedCoursePdfContent({ids,title}) {
  const [data,setData]=useState([]);
  console.log(data)
  const [loading,setLoading]=useState(false);


  useEffect(() => {
    const fetch=async()=>{
        try {
            setLoading(true);
            await axios.get(`${process.env.REACT_APP_URL}/course/section/sub/pdfMaterial/${ids}`).then(res=>{
                console.log(res)
             setData(res.data);
             setLoading(false)
         })
            
        } catch (error) {
            console.error(error);
        }
    }
    fetch()
 }, [ids])
  return (
    data.map(item=>(
      <div>
          <h1>PDF FIle For {item.sub_section_title}</h1>
          <p>You can download the file of the contents from here...</p>
          <div className="flex items-center space-x-4 my-10">
          <FaFilePdf className="text-red-600" />
          
          <a href={`${process.env.REACT_APP_URL}/course_content_uploads/${item.pdf_material.split('/')[4]}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600"  download>
              DOWNLOAD PDF NOTE 
          </a>
          </div>
        {/* <video controls className='w-full'>
                      <source src={item.preview_video} type='video/mp4' />
                      your browser doesn't support video tag
                    </video> */}
      {/* <video controls className='w-full my-4 block z-0 relative' style={{ zIndex: "0  " }}>
      <source src={`${process.env.REACT_APP_URL}/course_content_uploads/${item.learning_material.split('/')[4]}`} type='video/mp4' />
      your browser doesn't support video tag
    </video> */}
    </div>
    ))
  );
}

export default TabSubscribedCoursePdfContent;
