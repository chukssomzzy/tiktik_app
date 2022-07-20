import {useState, useEffect} from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import { NoResult, VideoCard } from '../../Components/HomePageComponents/'
import { IUser,Video } from '../../types'
import { v4 as uuidv4 } from 'uuid'
interface Iprops {
    user: IUser;
    userVideos: Video[]; 
    userLikedVideos: Video[]
}

const Profile = ({user,userVideos,userLikedVideos}: Iprops) => {
    /* --- Hooks ---*/
    const [showUsersVideos, setShowUsersVideos] = useState<boolean>(true)
    const [videosList, setVideosList] = useState<Video[]>([])

    /* --- Variables --- */ 
    const liked = !showUsersVideos ? 'border-b-2 border-black' : 'text-gray-200'
    const videos = showUsersVideos ? 'border-b-2 border-black' : 'text-gray-200'
    /* --- useEffects --- */ 

    useEffect(() => {
     if(showUsersVideos)
         setVideosList(userVideos)
     else 
         setVideosList(userLikedVideos)
    }, [userVideos, userLikedVideos, showUsersVideos])


    /* --- JSX Vars and List --- */

    const videosListMap = videosList?.map(( video: Video ) => (
        <VideoCard key={uuidv4()} post={video}/>
    ))

  return (
      <div className="w-full">
          <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
              <div className="w-16 h-16 md:w-32 md:h-32">
                    <Image 
                    src={user?.image} 
                    width={120} height={120} 
                    className="rounded-full" 
                    alt="user profile"
                    layout="responsive" 
                    priority
                    />
                </div>
                <div className='flex justify-center flex-col'>
                    <p className='flex gap-1 md:text-2xl tracking-wider items-center justify-center text-md font-bold text-primary lowercase'>
                {user?.userName?.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="capitalize text-gray-400 text-xl-small md:text-xl">{ user?.userName }</p>
                </div>
          </div>
          <div>
              <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=> setShowUsersVideos(true)}>Videos</p>
              </div>
              <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=> setShowUsersVideos(false)}>Videos</p>
              </div>
              <div className="flex gap-6 flex-wrap md:justify-start">
                  {
                      !!videosList?.length ?
                          ( videosListMap ) : (
                              <NoResult typeObj='videos' text={`No ${showUsersVideos && 'Liked'} Videos Yet`}/>
                      )
                  }
              </div>
          </div>
      </div>
  )
}

export default Profile                              


export const getServerSideProps = async ({params:{id}} : {params:{id: string}})=>{
    const {data:{user, userVideos, userLikedVideos}}: {data: Iprops}= await axios.get(`/api/profile/${id}`)
    return {
        props: {
            user,
            userVideos,
            userLikedVideos
        }
    }     
}                                      
