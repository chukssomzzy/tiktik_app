import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { Discover, SuggestedAccount, Footer } from '.'
const Sidebar = () => {
    /*--- Hooks ---*/
    const [showSidebar, setShowSidebar] = useState(true)

    /* --- Variables --- */ 
    //temporary variable 
    const userProfile = false
    const normalLink = 'flex item-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointerfont-semibold text-[#F51997] rounded'

    /* ----function----*/ 
    const toggleSidebar = ()=> setShowSidebar(isSidebarOpen => !isSidebarOpen)

  return (
     <div>
         <div
             className="block xl:hidden m-2 ml-4 mt-3 text-xl"
             onClick={toggleSidebar}
         >
             {
                 showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />
             }  
         </div>
         {
             showSidebar && (
                 <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 p-3 xl:border-0">     <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                     <Link href='/'>
                        <div className={normalLink}> 
                            <p className="text-2xl">
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                For You
                            </span>
                        </div>
                     </Link>
                 </div>
                     {
                     !userProfile && (
                         <div className="px-2 py-4 hidden xl:block">
                             <p className="text-gray-400">Log in to like and comment on video</p>
                             <div className="pr-4">
                                 <GoogleLogin
                                     clientId='' 
                                     onSuccess={() =>{}} 
                                     onFailure={() => {}} 
                                 cookiePolicy='single-host-origin'
                                 render={(renderedProps)=>(
                                     <button onClick={renderedProps.onClick} 
                                             disabled={renderedProps.disabled}
                                             className='bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#F51997] cursor-pointer'
                                     >
                                           Log in
                                     </button>
                                 )}/>
                             </div>
                         </div>
                     )
                     }
                     <Discover />
                     <SuggestedAccount />
                     <Footer />
                 </div>
             )
         }
     </div>
  )
}

export default Sidebar