

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Video } from '../../../types'
import { client } from '../../../utils/client'
import { searchPostsQuery } from '../../../utils/queries'
type Data = {
  status: string,
  videos?: Video[]
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    if(req.method === 'GET'){
       try{
           const {query: {searchValue}}: any= req
           const data = await client.fetch(searchPostsQuery(searchValue))
           return res.status(200).json({status:'Success',videos: data})
       }catch(e){
           res.status(500).json({status: 'Failed'})
           console.log(e)
       }
    
    }
}
