 import { MdOutlineVideocamOff } from 'react-icons/md' 
 import { BiCommentX } from 'react-icons/bi'
 import { TbUserOff } from 'react-icons/tb'
type Iprops = {
    text: string
    typeObj: string
}
const iconObj:any = {
    comments : <BiCommentX/>,
    video : <MdOutlineVideocamOff />,
    users: <TbUserOff />
}

const NoResult = ({text, typeObj}: Iprops) => {
  return (
      <div className="flex flex-col justify-center items-center h-full w-full">
          <p className="text-8xl">
              {
                  iconObj[typeObj]
              }
          </p>
          <p className="text-2xl text-center">{text}</p>
      </div>
  )
}

export default NoResult
