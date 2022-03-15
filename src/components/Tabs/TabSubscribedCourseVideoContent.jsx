
function TabSubscribedCourseVideoContent({ids,video}) {
  
  return (
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
     {video.split('#').map(item=>(
       <div key={item} className="w-full h-full my-8">
         <iframe src={item} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen={true} className="w-full h-screen"></iframe>
       </div>
     ))}
   </div>
  );
}

export default TabSubscribedCourseVideoContent;
