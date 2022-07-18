 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { allUsersQuery } from '../../../utils/queries'
type Data = {
  status: string,
  users: any
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
    if(req.method === 'GET'){
       try{
       const query = allUsersQuery()
       const data = await client.fetch(query)
       console.log(data)
       return res.status(200).json({status:'success',users:data})
       } catch (e) {
            console.error(e, 'something went wrong')
       }
    
    }
}
