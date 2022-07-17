
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'

type Data = {
  status: string,
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    if(req.method === 'POST'){
       try{
           const user = req.body 
           await client.createIfNotExists(user)
           return res.status(200).json({status:'Success'})
       }catch(e){
           res.status(500).json({status: 'Failed'})
           console.log(e)
       }
    
    }
}
