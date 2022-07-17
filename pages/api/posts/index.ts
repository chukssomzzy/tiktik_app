
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allPostsQuery } from '../../../utils/queries'
import { Video } from '../../../types'
type Data = {
  status: string,
  videos ?: Video[]
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(req.method)
    if(req.method === 'GET'){
       const query = allPostsQuery()
       const data = await client.fetch(query)
    return res.status(200).json({status:'success', videos: data}) 
    }
   else if(req.method === 'POST'){
      const document = req.body 
      console.log(document)
     await client.create(document)
    return res.status(201).json({status:'success'})
    }
}
