import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import NoResult from '../../Components/HomePageComponents/NoResult'
import { useAuthStore } from '../../app/Store/authStore'
import { Dispatch, SetStateAction } from 'react'
import { Comment, IUser } from '../../types'

interface Iprops {
comments: Comment[];
comment: string;
addComments: (e: React.FormEvent) => void;
isPostingComment: Boolean;
setComment: Dispatch<SetStateAction<string>>;
}

const Comments = ({comments, comment, addComments, isPostingComment, setComment}: Iprops) => {
    /* --- Hooks --- */ 
    const { userProfile, allUsers } = useAuthStore()


    /* ---- vars ---- */ 

    /* ---- JSX Variablea ---- */ 

    const  commentsJsx = comments?.map((comment: Comment,index: number)=> (
        <>
            {
                allUsers.map((user: IUser) =>((
          user._id === comment.postedBy._id || comment.postedBy._ref
            ) && (
            <div className="p-2 items-center" key={index}>
                <Link href={`/profile/${user?._id}`} passHref>
                    <div className="flex items-start gap-3">
                <div className="w-8 h-8">
                    <Image src={user.image} width={34} height={34} className="rounded-full" alt="user profile" layout="responsive" />
                </div>
                <div className="hidden xl:block">
                    <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                {user.userName.replace(' ','')} <GoVerified className='text-blue-400'/>
                        </p>
                    <p className="capitalize text-gray-400 text-xl-small">{ user.userName }</p>
                </div>
                    </div>
                </Link>
                <div>
                    <p>{comment.comment}</p>
                </div>
            </div>
            ))) 
            }

            </>

   ) )
   
   const commentForm = (
       <div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
           <form onSubmit={addComments} className="flex gap-4">

               <input type="text"
               value={comment} 
               onChange={(e)=> setComment(e.target.value)} 
               placeholder="add comment"
               className="bg-primary px-6 py-4 text-md font-md border-2 w-[250px] w-700px lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg" />        
          <button className='text-md text-gray-400 ' onClick={addComments}>
              {
                  isPostingComment ? 'Commenting...' : 'Comment'
              }
          </button>
           </form>
       </div>
   )


    /*--- JSX ---*/
  return (
      <div className="border-t-2 border-gray-200 p-t-4 px-10 bg-[#f8f8f8] birder-b-2 lg:pb-0 pb-[100px]">
          <div className="overflow-scroll lg:h-[475px]">
              {
                  !!comments?.length ? (
                      commentsJsx
                  )  : (
                  <NoResult text='No Comments Yet, Be The First One To Add A Comment' typeObj='comments'/>
                  )
              }
          </div>
          {
              userProfile && (
                  commentForm
              )
          }
      </div>
  )
}

export default Comments
