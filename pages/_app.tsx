import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Layout } from '../Components/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
      <GoogleOAuthProvider clientId={ `${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}` } >
     <Layout>
      <Component {...pageProps} />
    </Layout>  
      </GoogleOAuthProvider>
  </>
         )
}
export default MyApp
