

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../utils/client'
import { Video } from '../../../types'
import { postDetailQuery } from '../../../utils/queries'
import {uuid} from 'uuidv4'

type Data = {
  status: string,
  postDetail ?: Video[]
  comments?: any
}  

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const {id} = req.query
    /*--- Get --- */
    if(req.method === 'GET'){  
        const query = postDetailQuery(String(id))
      const data = await client.fetch(query)
      return res.status(200).json({ status: 'success', postDetail:data})
    }

    /* --- Patch ---*/

    else if(req.method === 'PATCH'){
       const { userId, comment} = req.body
     const data =  await client.patch(String(id)).setIfMissing({comments: []}).insert('after','comments[-1]',[{
         _key: uuid(),
         comment,
         postedBy: {
             _ref: userId,
             _type: 'postedBy',
         }

     }])                                                   
     .commit()
      return res.status(201)
.json({status:'success', comments: data})
    }
}
    
