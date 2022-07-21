import axios from 'axios'
import { Video } from '../types'
import { NoResult, VideoCard } from '../Components/HomePageComponents'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL } from '../utils'
interface IProps {
    videos: Video[] 
}

const Home = ({ videos }: IProps) => {

    /* --- JSX Var --- */
    const videosMap:JSX.Element[] = videos.map((video: Video) => (
        <VideoCard key={uuidv4()} post={video}/>
    ))



    /* --- JSX --- */
  return (
    <div className="flex flex-col h-full gap-10">
        {
            !!videos.length ? videosMap : <NoResult typeObj='video' text='No Video Yet'/>  
        } 
    </div>
  )
}


export const getServerSideProps = async ({query:{topic}}: {query:{topic: string}})=>{
    let response
    if(topic)
         response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
    
     else  
     response = await axios.get(`${BASE_URL}/api/posts`)
    
     return {
         props : {
             videos: response.data.videos
         }
     }
}
export default Home                                                             
