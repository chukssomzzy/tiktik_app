import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill , BsFillPauseFill} from 'react-icons/bs'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import { BASE_URL } from '../../utils/index'
import axios from 'axios'
import { Video } from '../../types' 
import { useAuthStore } from '../../app/Store/authStore'
import { LikeButton, Comments } from '../../Components/DetailPageComponents'

interface Iprops {
    postDetail: Video
}

const Detail = ({postDetail}: Iprops) => {
    /* --- Hooks ---- */
    const [post, setPost] = useState(postDetail)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [comment, setComment] = useState('')
    const [isPostingComment, setIsPostingState] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const {userProfile}:{
        userProfile: any
        
    } = useAuthStore( )
    const router = useRouter()
    /* ---- UseEffects --- */ 
    useEffect(() => {
    if(post && videoRef?.current){
        videoRef.current.muted = isMuted
    }  
    }, [isMuted, post])





    /*--- function const ---*/ 
    const onVideoClick = ()=>{
        if(isPlaying){
            videoRef?.current?.pause()
            setIsPlaying(false)
        } else {
            videoRef?.current?.play()
            setIsPlaying(true)
        }
    }

    const handleLike = async ( like: boolean) =>{
        if(userProfile) {
            const { data: {success, likes} } = await axios.patch(`${BASE_URL}/api/like`,{
                userId : userProfile?._id,
                postId : post?._id,
                like
            })
            setPost(prevPost => ({...prevPost, likes}))
        }
    }

    const addComments = async (e: any) =>{
        e.preventDefault()
        try{
        if(userProfile && comment && !isPostingComment){

            setIsPostingState(true)
            const { data: { comments} } = await axios.patch(`${BASE_URL}/api/post/${post?._id}`,{
              userId: userProfile?._id,
              comment: comment.trim()
          })
          setPost((prevPost):Video => ({...prevPost, comments}))
          setComment('')
        }
        }catch(e){
            console.log(e)
        } finally{
            setIsPostingState(false)
        }
        
    }
    /*--- Conditional Rendering Vars---*/

      if(!post) return null


      /* ---- JSX -----*/
  
      return (
        <>
          <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
              <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blend-darken">
                  <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
                      <p className='cursor-pointer ' onClick={()=> router.back()}>
                          <MdOutlineCancel className="text-white text-35px" />
                      </p>
                  </div>
                  <div className="relative">
                      <div className="lg:h-[100vh] h-[60vh]">
                          <video src={post?.video?.asset?.url} 
                          className='h-full cursor-pointer' 
                              ref={videoRef}
                              loop 
                              onClick={()=>{}}
                          />
                      </div>
                      <div className='absolute top-[45%] left-[45%] cursor-pointer'>
                          {
                              !isPlaying  && (
                                  <button onClick={onVideoClick}>

                                     <BsFillPlayFill className='text-white text-xl lg:text-8xl' /> 
                                     </button>
                              )
                          }
                      </div>
                  </div>
                  <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
                          {
                              isMuted ? (<button type="button" onClick={()=> setIsMuted(false)}>
                                  <HiVolumeOff className ='text-white text-2xl lg:text-4xl'/>
                              </button>) : (
                                  <button type='button' onClick={()=> setIsMuted(true)}>
                                      <HiVolumeUp className='text-white text-2xl lg:text-4xl'/>
                                  </button>
                              )
                          }

                  </div>
              </div>
              <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                  <div className="lg:mt-20 mt-10">

          <div className="flex gap-3 p-2 cursor-pointer rounder">
              <div className="ml-4 md:w-20 md:h-20 w-16 h-10">
                  {/*  <Link href='/'>
                      <>
                          <Image 
                              width={62} 
                              height={62}
                              className='rounded-full'
                              src={post?.postedBy?.image}
                              alt={`posted by ${post?.postedBy?.userName}`}
                              layout='responsive'
                          />
                      </>
                      </Link> */}
              </div>
              <div>
                  <Link href={`/detail/${post?._id}`}>
                      <div className="mt-3 flex flex-col gap-2">
                          <p className="flex gap2 items-center md:text-md font-bold text-primary">                                     
                              {post?.postedBy?.userName}    {' '}
                                  <GoVerified className="text-blue-400 text-md" />                        </p>
                              <p className="capitalize font-medium text-xs gray-500 hidden md:block ">{post?.postedBy?.userName}</p>
                      </div>
                  </Link>
              </div>
          </div>
                      <p className="text-lg text-gray-600">{post?.caption}</p>
                      <div className="pt-10 mt-10">
                          {
                              userProfile && (
                                  <LikeButton 
                                  handleLike={()=> handleLike(true)} 
                                  handleDisLike={()=> handleLike(false)}
                                  likes = {post?.likes}
                                  />
                              )
                          }
                      </div>
                     <Comments addComments={addComments}
                            comment={comment}
                            setComment = {setComment}
                           isPostingComment={isPostingComment}
                         comments={post?.comments}
                      />
                  </div>
              </div>
          </div>
        </>
  )
}

export default  Detail

export const getServerSideProps = async ({params:{id}}: {params: {id: string}}) => {
    const { data:{postDetail} } = await axios.get(`${BASE_URL}/api/posts/${id}`)
        console.log(postDetail)
    return {
        props:{
          postDetail
        }
    }
}                
