
import {useState, useEffect} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import { NoResult, VideoCard } from '../../Components/HomePageComponents/'
import { IUser,Video } from '../../types'
import { v4 as uuidv4 } from 'uuid'
import { useAuthStore } from '../../app/Store/authStore'
import { BASE_URL } from '../../utils'

interface Iprop {
    videos: Video[]
}

const Search = ({videos}:Iprop) => {
    /* --- Hooks --- */

    const [isAccounts, setIsAccounts] = useState<boolean>(true)
    const router = useRouter()
    const { allUsers } = useAuthStore()
    /* ---- Variables ---- */

    const accounts = !isAccounts ? 'border-b-2 border-black' : 'text-gray-200'
    const isVideos = isAccounts ? 'border-b-2 border-black' : 'text-gray-200'
    const {searchValue}: any= router.query
    const searchedAccount = allUsers.filter((user: IUser)=> user?.userName.toLowerCase().includes(searchValue?.toLowerCase()))


    /* --- JSX variables --- */ 
    const accountsList = (
             <div className="md:mt-16">
                 {
                     searchedAccount.length ? (
                         searchedAccount?.map((user: IUser)=>
               ( <Link key={uuidv4()} href={`/profile/${user?._id}`} passHref>
                    <div className="flex gap-3 p-2 font-semibold border-b-2 border-gray-200 rounded cursor-pointer">
                <div >
                    <Image src={user.image} width={50} height={50} className="rounded-full" alt="user profile" />
                </div>
                <div>
                    <div>
                    <p className='flex items-center gap-1 font-bold lowercase text-md text-primary'>
                {user.userName.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="text-gray-400 capitalize text-xl-small">{ user.userName }</p>
                    </div>
                    </div>
                    </div>
              </Link>)
                         )
                     ) : (
                     <NoResult text={`No accounts for ${searchValue}`} typeObj='users'/>
                     )
                 }
             </div>
    )
    const videosList = (
        <div className="flex flex-wrap gap-6 md:mt-16 md:justify-start">
            {
                videos?.length ? (                          
                videos.map((video: Video)=>
                   (<VideoCard post={video} key={uuidv4()}/>))
                ) : (
                <NoResult typeObj='video' text={`No videos result for ${searchValue}`} />
                )
            }
    </div>
    )
    /* --- JSX --- */
  return (
      <div className="w-full">
              <div className="flex w-full gap-10 mt-10 mb-10 bg-white border-b-2 border-gray-200">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={()=> setIsAccounts(true)}>Accounts</p>
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={()=> setIsAccounts(false)}>Videos</p>
              </div>
          {
              isAccounts ? (
                  accountsList
              ) : (
                  videosList
              )
          }
      </div>
  )
}

export default Search

export const getServerSideProps = async ({params: {searchValue}}: { params: { searchValue: string}})=>{
    const {data: videos} = await axios.get(`${BASE_URL}/api/search/${searchValue}`)

    return {
        props: {
           videos 
        }
    }
}            
