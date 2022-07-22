import {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill , BsFillPauseFill} from 'react-icons/bs'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import axios from 'axios'
import { Video } from '../../types.d' 
import { useAuthStore } from '../../app/Store/authStore'
import { LikeButton, Comments } from '../../Components/DetailPageComponents'
import { BASE_URL } from '../../utils'

interface IProps {
    postDetail: Video
}

const Detail = ({postDetail}: IProps) => {
    /* --- Hooks ---- */
    const [post, setPost] = useState<Video>(postDetail)
    const [isPlaying, setIsPlaying] = useState(false)
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [comment, setComment] = useState('')
    const [isPostingComment, setIsPostingState] = useState(false)
    const [savingLike, setSavinglike] = useState<boolean>(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const {userProfile}:{
        userProfile: any
        
    } = useAuthStore( )
    const router = useRouter()
    /* --- UseEffects --- */ 
    useEffect(() => {
    if(post && videoRef?.current){
        videoRef.current.muted = isMuted
    }  
    }, [isMuted, post])

   console.log(postDetail)



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
    /* -- Handle Like -- */
    const handleLike = async ( like: boolean) =>{
        if(userProfile && !savingLike) {
            setSavinglike(true)
            const { data: {likes} } = await axios.patch(`${BASE_URL}/api/like`,{
                userId : userProfile?._id,
                postId : post?._id,
                like
            })
            setPost((prevPost: Video)=> ({...prevPost, likes }))
            setSavinglike(false)
            }
            setSavinglike(false)
    }
    const addComments = async (e: any) =>{
        e.preventDefault()
        try{
        if(userProfile && comment && !isPostingComment ){

            setIsPostingState(true)
            const { data: { comments} } = await axios.patch(`${BASE_URL}/api/posts/${post?._id}`,{        
              userId: userProfile?._id,
              comment: comment.trim()
          })
          setPost({...post, comments})
          console.log(post)
          setComment('')
        }
        }catch(e){
            console.log(e)
        } finally{
            setIsPostingState(false)
        }
        
    }
    console.log(post)
        
        /*--- Conditional Rendering Vars---*/

      if(!post) return null


      /* ---- JSX -----*/
  
      return (
        <>
          <div className="absolute top-0 left-0 flex flex-wrap w-full bg-white lg:flex-nowrap">
              <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black/90">
                  <div className="absolute z-50 flex gap-6 top-6 left-2 lg:left-6">
                      <p className='cursor-pointer ' onClick={()=> router.back()}>
                          <MdOutlineCancel className="text-white text-35px" />
                      </p>
                  </div>
                  <div className="relative">
                      <div className="lg:h-[100vh] h-[60vh]">
                          <video 
                              src={post?.video?.asset?.url} 
                              className='h-full cursor-pointer' 
                              ref={videoRef}
                              loop 
                              onClick= { onVideoClick }
                          />
                      </div>
                      <div className='absolute top-[45%] left-[45%] cursor-pointer'>
                          {
                              !isPlaying  ? 
                                  (
                                  <button onClick={onVideoClick}>

                                      <BsFillPlayFill className='text-4xl text-white lg:text-8xl' /> 
                                     </button>
                              )  : 
                                  (
                                  <button onClick={onVideoClick}>

                                      <BsFillPauseFill className='hidden text-4xl text-white lg:text-8xl hover:block' /> 
                                     </button>
                              )
                          }
                      </div>
                  </div>
                  <div className="absolute cursor-pointer bottom-5 lg:bottom-10 right-5 lg:right-10">
                          {
                              isMuted ? (<button type="button" onClick={()=> setIsMuted(false)}>
                                  <HiVolumeOff className ='text-2xl text-white lg:text-4xl'/>
                              </button>) : (
                                  <button type='button' onClick={()=> setIsMuted(true)}>
                                      <HiVolumeUp className='text-2xl text-white lg:text-4xl'/>
                                  </button>
                              )
                          }

                  </div>
              </div>
              <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
                  <div className="mt-10 lg:mt-20">

          <div className="flex gap-3 p-2 cursor-pointer rounder">
              <div className="w-16 h-10 ml-4 md:w-20 md:h-20">
                    <Link href= {`/profile/${post?.postedBy?._id}`} passHref>
                      <>
                        
                          { <Image src={post?.postedBy?.image} width={62} priority height={62} className='rounded-full' alt='user profile' layout='responsive' /> }
                      </>
                      </Link> 
              </div>
              <div>
                  <Link href={`/profile/${post?.postedBy?._id}`}>
                      <div className="flex items-center gap-2">
                          <p className="flex items-center font-bold gap2 md:text-md text-primary">                             
                              {post?.postedBy?.userName}    {' '}
                                  <GoVerified className="text-blue-400 text-md" />                        </p>
                              <p className="hidden text-xs font-medium capitalize gray-500 md:block ">{post?.postedBy?.userName}</p>
                      </div>
                  </Link>
              </div>
          </div>
                      <p className="pt-3 text-lg text-gray-600">{post?.caption}</p>
                      <div className="pt-10 mt-10">
                          {
                              userProfile && (
                                  <LikeButton 
                                  handleLike={()=> handleLike(true)} 
                                      handleDisLike={()=> handleLike(false)}
                                      likes = {post?.likes}
                                      alreadyLiked={alreadyLiked}
                                      setAlreadyLiked={setAlreadyLiked}
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
    return {
        props:{
            postDetail: postDetail[0]
        }
    }
}                
