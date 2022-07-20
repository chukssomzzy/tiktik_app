
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
                    <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                <div >
                    <Image src={user.image} width={50} height={50} className="rounded-full" alt="user profile" />
                </div>
                <div className="hidden xl:block">
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                {user.userName.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="capitalize text-gray-400 text-xl-small">{ user.userName }</p>
                    </div>
                    </div>
              </Link>)
                         )
                     ) : (
                     <NoResult text={`No Video Result for ${searchValue}`} typeObj='users'/>
                     )
                 }
             </div>
    )
    const videosList = (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {
                videos?.length ? (                          
                videos.map((video: Video)=>
                   (<VideoCard post={video} key={uuidv4()}/>))
                ) : (
                <NoResult typeObj='videos' text={`No videos result for ${searchValue}`} />
                )
            }
    </div>
    )
    /* --- JSX --- */
  return (
      <div className="w-full">
              <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={()=> setIsAccounts(true)}>Accounts</p>
              </div>
              <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
                  <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={()=> setIsAccounts(false)}>Videos</p>
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
