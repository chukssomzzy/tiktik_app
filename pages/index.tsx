import axios from 'axios'
import { Video } from '../types'
import { NoResult, VideoCard } from '../Components/HomePageComponents'
interface IProps {
    videos: Video[] 
}

const Home = ({ videos }: IProps) => {

    /* --- JSX Var --- */
    const videosMap:JSX.Element[] = videos.map((video: Video) => (
        <VideoCard key={video?._id} post={video}/>
    ))



    /* --- JSX --- */
  return (
    <div className="flex flex-col gap-10 h-full">
        {
            !!videos.length ? videosMap : <NoResult typeObj='video' text='No Video Yet'/>  
        } 
    </div>
  )
}


export const getServerSideProps = async ()=>{
    const { data: {videos} } = await axios.get(`http://localhost:3000/api/posts`)
     return {
         props : {
             videos
         }
     }
}
export default Home                                                             
