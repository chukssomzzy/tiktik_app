import { Dispatch, useEffect,SetStateAction } from 'react'
import { MdFavorite } from 'react-icons/md'
import { useAuthStore } from '../../app/Store/authStore'

interface Iprops {
    handleDisLike: () => void 
    handleLike: () => void
    likes : any[]
    alreadyLiked: boolean,
    setAlreadyLiked: Dispatch<SetStateAction<boolean>>
}

const LikeButton = ({handleDisLike,handleLike,likes,alreadyLiked,setAlreadyLiked}: Iprops) => {
    const { userProfile }: {userProfile: any}= useAuthStore()
    const filterLike = likes?.filter(like=>like?._ref === userProfile?._id)
    
    useEffect(() => {
         if(!!filterLike?.length)
            setAlreadyLiked(true)
        else 
          setAlreadyLiked(false)
    }, [likes, filterLike,alreadyLiked,setAlreadyLiked])
   
  return (
      <div className="flex gap-6 justify-center items-center">
          <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
              {
                  alreadyLiked ? 
                      (
                          <div className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]" onClick={handleDisLike}>
                              <MdFavorite className="text-lg md:text-2xl" />
                          </div>
                  ) : (

                          <div className="bg-primary rounded-full p-2 md:p-4"  onClick={handleLike}>
                              <MdFavorite className="text-lg md:text-2xl"/>
                          </div>
                  )
              }
              <p className="text-md font-semibold">{likes?.length | 0}</p>
          </div>
      </div>
  )
}

export default LikeButton
