import React from 'react'
import Modal from 'react-modal';
import {IoClose} from 'react-icons/io5'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'100%',
      height:'100%',
      padding:'0'
    },
  };

function VideoCard({img,title,duration,link}) {

    const [modalIsOpen, setIsOpen] = React.useState(false);

    
    return (
        <>
        <div className='bg-white rounded-xl shadow-md xl:shadow-lg overflow-hidden cursor-pointer transition hover:shadow-2xl h-full' onClick={()=>setIsOpen(true)}>
            <img src={img} alt="" className='w-full h-44 lg:h-36 bg-green-200 object-cover' srcset="" />
            
            {/* contents  */}
            <div className="p-4 ">
                <h4 className='text-gray-800 text-xl lg:text-base'>{title}</h4>
                <p className='text-gray-500'>{duration}</p>
            </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
       <div className="lg:m-4 flex items-center justify-between p-2 shadow-lg bg-transparent sticky top-0 z-10">
            <p className='font-medium'>{title}</p>
            <p className="flex items-center space-x-2 cursor-pointer" onClick={()=>setIsOpen(false)}>
                <span>Close</span>
                <IoClose />
            </p>
       </div>
        <div className= 'lg:m-4 h-full relative z-0'>
        <iframe  src={link} width={100} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen className='w-full h-full'></iframe>
        </div>
      </Modal>
        </>
    )
}

export default VideoCard
