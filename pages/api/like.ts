

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { v4 as uuidv4 } from 'uuid'

type Data = {
  status: string,
  likes: any
}  
type BodyType = {
    userId: string,
    postId: string,           
    like: boolean
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 if(req.method === 'PATCH'){
     const {
         userId,
         postId,
         like
     } : BodyType = req.body
       console.log(like)
     const data = like ? await client.patch(postId).setIfMissing({likes: []}).insert('after','likes[-1]',[{
         _key:uuidv4(),
         _ref:userId,
     }])                                                  
     .commit() 
         :    await client
     .patch(postId)
     .unset([`likes[_ref == "${userId}"]`])
     .commit() 

     return res.status(200)
     .json({status:'success', likes: data.likes})
 } 
}
