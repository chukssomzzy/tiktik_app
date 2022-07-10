import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics }  from '../../utils/constants'
const Discover = () => {
    /*---- Hooks ----*/
    const router = useRouter()
    const {topic} = router.query

    /* Styles Variables */ 
    
    const ActiveTopicStyle ='xl:border-2 hover:bg-primary xl:border-[#f51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]'
    const topicStyle ='xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black'

    /*---- JSX Variables ---- */
    const popularTopics = topics.map(item => (
        <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={(topic === item.name)? ActiveTopicStyle : topicStyle}>
                <span className='font-bold text-2xl xl:text-md'>{item.icon}</span>
                <span className='font-medium text-md hidden xl:block'>{item.name}</span>
            </div>
        </Link>
    ))


  return (
    <div className="xl:border-b-2 xl:border-gray-200 pb-6">
        <p className='text-gray-500 font-semibold mt-4 hidden m-4 xl:block'>Popular Topics</p>
        <div className="flex gap-3 flex-wrap">
            {popularTopics}
        </div>
    </div>
  )
}

export default Discover
