import React from 'react'
import {footerList1, footerList2, footerList3 } from '../../utils/constants'

type footerType ={
    items: string[],
    mt: boolean
}

const FooterComponent = ({items, mt}: footerType )=>(
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
              {
        items.map( item => (
        <p key={item} className='text-gray-400 text-sm hover:underline cursor-pointer'>
        {item}
        </p>
           ))
              }
          </div>
    )



const Footer = () => {


    /* --- JSX variable --- */ 


  return (
      <div className="mt-6 hidden xl:block">
          <FooterComponent mt={false} items={footerList1}/>
          <FooterComponent mt items={footerList2}/>
          <FooterComponent mt items={footerList3}/>
          <p className='texy-gray-400 mt-5 text-sm'>2022 Chukssomzzy TIkTik</p>
      </div>
  )
}

export default Footer
