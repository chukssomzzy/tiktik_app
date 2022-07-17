import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai' 
import { BiSearch } from 'react-icons/bi' 
import { IoMdAdd } from 'react-icons/io'
import Logo from '../../utils/tiktik-logo.png'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../../utils'
import { useAuthStore } from '../../app/Store/authStore'

const Navbar = () => {
    /* ----- HOOKS ----- */ 

    const { userProfile, addUser,removeUser }:{userProfile:any,addUser:any,removeUser:any} = useAuthStore() 

   /* --- Variables ---*/ 
   //const user = false
   /* ---- function Variables --- */ 
   
   const ifOnSuccess = (res:any)=>{
      createOrGetUser(res.credential,addUser)
   }
   const ifOnError = (  ) => {
       console.log('Error')
   } 
  return (
      <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4 '>
         <Link href="/">
             <div className="w-[100px] md:w-[130px]">
                 <Image 
                 className="cursor-pointer" 
                 src={Logo}
                 layout="responsive"
                 alt="tiktik-logo"
                 />
             </div>
         </Link>
          <div>SEARCH</div>
          <div>
              {
                  userProfile ? (
                      <div className='flex gap-5 md:gap-10'>
                          <Link href='/upload' passHref>
                              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                                  <IoMdAdd />
                                  {' '}
                                  <span className="hidden md:block md:px-2 md:py-2">Upload</span>
                              </button>
                          </Link>
                          { userProfile?.image && 
                (  <Link href='/'>
                      <>
                          <Image width={40} 
                              height={40}
                              className='rounded-full'
                              src={userProfile?.image}
                              alt={`posted by ${userProfile?.userName}`}
                          />
                      </>
                  </Link>  )

                          }
                          <button type="button" className="px-2">
                              <AiOutlineLogout 
                                  color='red' 
                                  fontSize={21}  
                                  onClick={()=>{
                                      googleLogout()
                                      removeUser()
                              }}/>
                          </button>
                      </div>
                  ) : (
                  <GoogleLogin onSuccess={ifOnSuccess}
                                onError={ifOnError}/>
                  )
              }
          </div>
      </div>
  )
}

export default Navbar  
