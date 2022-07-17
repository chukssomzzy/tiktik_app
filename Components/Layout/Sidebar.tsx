import { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { Discover, SuggestedAccount, Footer } from '.'
const Sidebar = () => {
    /*--- Hooks ---*/
    const [showSidebar, setShowSidebar] = useState(true)

    /* --- Variables --- */ 
    
    const normalLink = 'flex item-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointerfont-semibold text-[#F51997] rounded'

    /* ----function----*/ 
    const toggleSidebar = ()=> setShowSidebar(isSidebarOpen => !isSidebarOpen)

  return (
     <div className='z-100'>
         <div
             className="block xl:hidden m-2 ml-4 mt-3 text-xl"
             onClick={toggleSidebar}
         >
             {
                 !showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />
             }  
         </div>
         {
             showSidebar && (
                 <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 p-3 xl:border-0">   
                     <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
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
