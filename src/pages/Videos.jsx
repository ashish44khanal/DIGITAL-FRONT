import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import VideoCard from '../components/Cards/VideoCard'
import Page from '../templates/Page'
import MasterLoading from '../components/LoadingSpinners/MasterLoading'

function Videos() {
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(() => {
       const fetch=async()=>{
           try {
               setLoading(true)
               await axios.get(`${process.env.REACT_APP_URL}/videos`).then(res=>{
                setLoading(false);
                setData(res.data)
            })
           } catch (error) {
               console.error(error)
           }
       }
       fetch();
    }, [])
    return (
        <Page>
            <div className="container mx-auto px-8">
                <h2>Our Videos</h2>
                {loading && <MasterLoading /> }
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {data.map(item=>(
                    <VideoCard title={item.title} img={item.thumbnail} link={item.link} />
                    ))}
                </div>
            </div>
        </Page>
    )
}

export default Videos
