'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function VerifyEmailPage() {

    // const router = useRouter();

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyEmail = async() => {
        try{
            const response = await axios.post('/api/users/verifyemail', {token});
            if(response.data.success){
                setVerified(true);
                setError(false)
            }

        }catch(error:any){
            setError(true)
            console.log("Error: ", error.message)
        }
    }

    useEffect(() => { 
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const {query} = router;
        // const urlToken = query.token
    },[])

    useEffect(()=>{
        setError(false)
        if(token.length>0){
            verifyEmail()
        }
    },[token])


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1 className='text-2xl'>Verify Email</h1>
        <h2 className=' m-2 p-2 bg-gray-300 text-black rounded-lg'>
            {token ? `${token}`: "no token"}
        </h2>
        {verified && (
            <div>
                <h2>Verified</h2>
                <Link href="/login"></Link>
            </div>
        )}
        {error && (
            <div>
                <h2>Error</h2>
            </div>
        )}
    </div>
  )
}

