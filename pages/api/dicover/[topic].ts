
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Video } from '../../../types'
import { client } from '../../../utils/client'
import { topicPostsQuery } from '../../../utils/queries'  
type Data = {
  status: string,
  videos?: Video[]
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    if(req.method === 'POST'){
       try{
           const {topic}: any =  req.query
           const data = await client.fetch(topicPostsQuery(topic))
           return res.status(200).json({status:'Success', videos: data})
       }catch(e){
           res.status(500).json({status: 'Failed'})
           console.log(e)
       }
    
    }
}
