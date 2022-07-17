

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { uuid } from 'uuidv4'

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

     const data = like ? (await client.patch(postId).setIfMissing({likes: []}).insert('after','likes[-1]',[{
         _key:uuid(),
         _ref:userId,
         like
     }])                                                   
     .commit()) 
         :    ( await client
     .patch(postId)
     .unset([`likes[_ref == '${userId}']`])
     .commit() )

     return res.status(201)
     .json({status:'success', likes: data})
 } 
}
