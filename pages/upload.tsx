import { useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { useAuthStore } from '../app/Store/authStore'
import  { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'
interface Topic{
    name: string 
    icon: JSX.Element
}
const Upload = () => {
    /* --- HOOKS --- */
   const [isLoading, setIsLoading] = useState(false)
   const [videoAsset, setVideoAsset] = useState<SanityAssetDocument>()
   const [wrongFileType, setWrongFileType] = useState(false)
   const [caption, setCaption] = useState('')
   const [topicsValue, setTopicValue] = useState(topics[0].name)
   const {userProfile}:{userProfile:any} = useAuthStore()
   const [savingPost, setSavingPost] = useState(false)
   const router = useRouter()
   /* --- Variables Functions---- */ 
   const onUploadVideo =async ( e: any )=> {
         const selectedFile = e.target.files[0]
         const fileType = ['video/mp4','video/webm','video/ogg']
       if(fileType.includes(selectedFile.type)){
          try{
              const data = await client.assets.upload('file', 
                                                      selectedFile,{
                                                      contentType: selectedFile.type,
                                                      filename: selectedFile.name
                                                      })

             setVideoAsset(data)
          }catch (e){
              setIsLoading(false)
              console.log(e)
          }
         }else{
             setWrongFileType(true)
         }
         setIsLoading(false)
   }
   const onCaptionChange = (e: any)=> setCaption(e.target.value) 
   const onCategoryChange = (e:any) => setTopicValue(e.target.value)
   const canUpload = [videoAsset,topicsValue,caption].every(Boolean) && !isLoading

   const handlePost = async () => {
       try{
       if(canUpload){
          setSavingPost(true)
          const document = {
              _type : 'post',
              caption,
              video: {
                  _type : 'file',
                  asset: {
                      _type: 'reference',
                      _ref: videoAsset?._id,
                  }
              },
              userId:userProfile?._id,
              postedBy: {
                  _type: 'postedBy',
                  _ref: userProfile?._id
              },
              topic: topicsValue
          }
          await axios.post(`${BASE_URL}/api/posts`, document)
         setSavingPost(false)
         router.push('/')
       }
       } catch (e){
           setSavingPost(false)
           console.log(e)
       }
   }
    /* ---- JSX Maps Var---- */ 
    const optionSelect =topics.map((topic: Topic, index: number): JSX.Element =>(
        <option value={topic.name} key={index} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'>
         {topic.name}
         </option>
    ))
    /* --- JSX ---*/
  return (
      <div className="flex h-full w-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#f8f8f8] justify-center">
          <div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap  justify-center items-center p-14 pt-6">
              <div>
                  <div>
                      <p className="text-2xl font-bold">Upload Video</p>
                      <p className="text-md text-gray-400 mt-1">Post A Video To Your Account</p>
                  </div>
                  <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
                      {
                          isLoading ? (
                              <p className='text-center text-3xl text-red-400 font-semibold'>
                                  Uploading...
                                  </p>
                          ) : (
                          <div>
                              {
                                  videoAsset ? (
                                      <div>
                                          <video 
                                          src={videoAsset.url}
                                          loop 
                                          controls 
                                          className="rounded-xl h-[430px] mt-16 bg-black"/>
                                      </div>
                                  ) : (
                                    <label  className="cursor-pointer"><div className="flex flex-col items-center justify-center h-full">
                                            <div className="flex flex-col justify-center items-center">
                                                <p className="font-bold text-xl">
                                                    <FaCloudUploadAlt className="text-gray-300 text-3xl" />
                                                    <p className="text-xl font-semibold">Upload Video</p>
                                                </p>
                                            </div>
                                            <p className="text-gray-400 text-center mt-10 text-sm leading-10">Mp4 or WebM or Ogg <br />
                                                720×120 or higher <br />
                                                up to 10 mins <br />
                                                less than 2GB
  
                                            </p>
                                        <p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">Select File</p>
                                        </div>
                                        <input type="file" name="upload-video" className="w-0 h-0" onChange={onUploadVideo} />
                                        
                                        </label>
                                  )
                              }
                          </div>
                          )
                      }
                      {
                          wrongFileType && (
                              <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
                              Please select A Video File
                              </p>
                          )
                      }
                  </div>
              </div>
                  {/* Form */}
                  <div className="flex flex-col pb-10">
                      <label id="caption" htmlFor="caption" className="text-md font-medium">
                      Caption
                      </label>
                      <input id="caption"
                          type="text" 
                          value={caption}
                          onChange={onCaptionChange} 
                          placeholder="captions"
                          name="caption" 
                          className='rounded outline-none text-none border-2 border-gray-200 p-2'
                      />
                       <label 
                      htmlFor="category" 
                      id="category" 
                      className="text-md font-medium"
                       >
                      Choose A Category
                       </label>
                      <select 
                          id="category" 
                          name="category" 
                          value={topicsValue} 
                          onChange={onCategoryChange} 
                          className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
                      >
                          {optionSelect}
                      </select>
                      <div className="flex mt-10">
                          <button onClick={()=>{}} disabled={canUpload} type="button" className="border-gray-300 border-2 text-md p-2 font-medium rounded w-28 lg:w-44 outline-none">Discard</button>
                          <button onClick={handlePost} disabled={!canUpload} type="button" className="text-md p-2 font-medium rounded w-28 lg:w-44 outline-none bg-[#f51997] text-white ">Post</button>

                      </div>
                  </div>
          </div>
      </div>
  )
}

export default Upload
