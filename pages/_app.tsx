import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react'
import { Layout } from '../Components/Layout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAuthStore } from '../app/Store/authStore'
const MyApp = ({ Component, pageProps }: AppProps) =>{
    /* Hooks */

    const [isSSR, setIsSSR] = useState(true)
    const { fetchAllUsers } = useAuthStore()
    /* useEffect */

    useEffect(() => {
      setIsSSR(false)
      fetchAllUsers()
    }, [fetchAllUsers])

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
