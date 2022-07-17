import { Sidebar, Navbar } from '.'

interface layoutProps {
    children: JSX.Element | JSX.Element[]
}

const Layout = ({children}: layoutProps): JSX.Element => {
  return (
      <div className='xl:w-[1200px] m-auto overflow-hidden h-full]'>
      <Navbar />
     <div className="flex gap-6 md:gap-6">
      <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
          <Sidebar />
      </div>
         <div className='flex mt-4 flex-col gap-10 overflow-hidden h-[88vh] videosflex-1'>
             {children}
         </div>
     </div>
 </div>
  )
}

export default Layout
