import { NextPage } from 'next'
import {useState, useEffect, useRef} from 'react'
import { Video } from '../../types'
import Link from 'next/link'
import Image from 'next/image'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import {BsFillPlayFill, BsFillPauseFill} from 'react-icons/bs'
import {GoVerified } from 'react-icons/go'

interface IProps {
    post : Video
}

const VideoCard: NextPage<IProps> = ({ post }) => {
    /*---- HOOKS ---- */
    const [isHover, setIsHover] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    /* ---- variables ---- */ 

    const MouseEnter = ()=> setIsHover(true)
    const MouseLeave = ()=> setIsHover(false)
    const onVideoPress = () => {
        if(playing){
            videoRef?.current?.pause()
            setPlaying(false)
        } else {
            videoRef?.current?.play()
            setPlaying(true)
        }
    }
    /* ---- UseEffects --- */ 
    useEffect(() => {
    if(videoRef?.current){
        videoRef.current.muted = isMuted
    }  
    }, [isMuted])

    /* --- jsx var ---*/ 
 

    /* --- JSX ----*/
  return (
      <div className="flex flex-col border-b-2 border-gray-200 pb-6">
          <div>
          <div className="flex gap-3 p-2 cursor-pointer rounder">
              <div className="md:w-16 md:h-16 w-10 h-10">
                  <Link href='/'>
                      <>
                          <Image width={62} 
                              height={62}
                              className='rounded-full'
                              src={post?.postedBy?.image}
                              alt={`posted by ${post?.postedBy?.userName}`}
                              layout='responsive'
                          />
                      </>
                  </Link>
              </div>
              <div>
                  <Link href={`/detail/${post?._id}`}>
                      <div className="flex items-center gap-2">
                          <p className="flex gap2 items-center md:text-md font-bold text-primary">
                              {post.postedBy.userName}    {' '}
                                  <GoVerified className="text-blue-400 text-md" />                        </p>
                              <p className="capitalize font-medium text-xs gray-500 hidden md:block ">{post.postedBy.userName}</p>
                      </div>
                  </Link>
              </div>
          </div>
          </div>
          <div className="lg:ml-20 gap-4 relative">
              <div className="rounded-3xl"
                  onMouseEnter={MouseEnter}
                  onMouseLeave={MouseLeave}
              >
                  <Link href="/">
                      <video
                          src={post.video.asset.url}
                          loop 
                          ref={ videoRef }
                          className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[520px]w-[200px] rounded-2xl cursor-pointer bg-gray-100'
                      />
                  </Link> 
                  {isHover && (
                      <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] ">
                          {
                              playing ? (<button type="button" onClick={onVideoPress}>
                                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
                              </button>) : (
                                  <button type='button' onClick={onVideoPress}>
                                      <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>
                                  </button>
                              )
                          }
                          {
                              isMuted ? (<button type="button" onClick={()=> setIsMuted(false)}>
                                  <HiVolumeOff className ='text-black text-2xl lg:text-4xl'/>
                              </button>) : (
                                  <button type='button' onClick={()=> setIsMuted(true)}>
                                      <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>
                                  </button>
                              )
                          }
                      </div>
                  )}
              </div>
          </div>
      </div>
  )
}

export default VideoCard
