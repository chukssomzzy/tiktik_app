import {useEffect, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { useAuthStore } from '../../app/Store/authStore'
import { IUser } from '../../types'

interface Iprop {
    fetchAllUsers?: () => void;
    allUsers: IUser[]
}
const SuggestedAccount = () => {
    //const effectRef = useRef(false)
    const { allUsers}: Iprop = useAuthStore()
    /* ---- useEffect ---- */
 /*   useEffect(()=>{
       fetchAllUsers()                                          
       console.log('fetched users')
    },[fetchAllUsers])
    /* ---- JSX Vars ---- */
   
 /* const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length); */
  return (

      <div className="lg:border-p-2 border-gray-200 pb-4">
          <p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">Suggested Accounts</p>

          <div>
              { allUsers?.slice(0,6)?.map((user: IUser) => (
        <Link href={`/profile/${user?._id}`} passHref key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
                <div className="w-8 h-8">
                    <Image src={user?.image} width={34} height={34} className="rounded-full" alt="user profile" layout="responsive" />
                </div>
                <div className="hidden xl:block">
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                {user?.userName?.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="capitalize text-gray-400 text-xl-small">{ user?.userName }</p>
                </div>
            </div>
        </Link>
    ))
              }
                 
          </div>
      </div>
  )
}

export default SuggestedAccount
