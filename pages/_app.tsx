import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Layout } from '../Components/Layout'
const MyApp = ({ Component, pageProps }: AppProps) =>{
    /* Hooks */

    const [isSSR, setIsSSR] = useState(true)

    /* useEffect */

    useEffect(() => {
      setIsSSR(false)
    }, [])

    /* prevents serverside rendering*/

    if(isSSR) return null

        
  return ( 
  <>
    <Layout>
      <Component {...pageProps} />
    </Layout>  
  </>
         )
}

export default MyApp
