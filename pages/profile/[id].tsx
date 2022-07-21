import {useState, useEffect} from 'react'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import { NoResult, VideoCard } from '../../Components/HomePageComponents/'
import { IUser,Video } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { BASE_URL } from '../../utils'
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
          <div className="flex w-full gap-6 mb-4 bg-white md:gap-10">
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
                <div className='flex flex-col justify-center'>
                    <p className='flex items-center justify-center gap-1 font-bold tracking-wider lowercase md:text-2xl text-md text-primary'>
                {user?.userName?.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="text-gray-400 capitalize text-xl-small md:text-xl">{ user?.userName }</p>
                </div>
          </div>
          <div>
              <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=> setShowUsersVideos(true)}>Videos</p>
            <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=> setShowUsersVideos(false)}>Liked</p>
              </div>
              <div className="flex flex-wrap gap-6 md:justify-start">
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
    const {data:{user, userVideos, userLikedVideos}}: {data: Iprops}= await axios.get(`${BASE_URL}/api/profile/${id}`)
    return {
        props: {
            user,
            userVideos,
            userLikedVideos
        }
    }     
}                                      
