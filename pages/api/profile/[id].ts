

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries'


type Data = {
  status: string,
  user?: any,
  userLikedVideos?: any,
  userVideos?: any
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    if(req.method === 'GET'){
       try{
           const {query:{id}}: any = req 
           const userData = await client.fetch(singleUserQuery(id))
           const userVideos = await client.fetch(userCreatedPostsQuery(id))
           const userLikedVideos = await client.fetch(userLikedPostsQuery(id))
           
           return res.status(200).json({status:'Success',user:userData[0], userLikedVideos, userVideos})
       }catch(e){
           res.status(500).json({status: 'Failed'})
           console.log(e)
       }
    
    }
}
