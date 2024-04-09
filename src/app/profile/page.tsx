'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage(){
    const router = useRouter();
    const [data, setData] = useState("nothing")
    const [emailSent, setEmailSent] = useState(false)

    const getUserDetails = async() => {
        const response = await axios.get('/api/users/me');
        if(response.data.success){
            console.log(response.data.Data._id);
            setData(response.data.Data._id)
        }
    }

    const logout = async()=>{
        try {
           const response = await axios.get('/api/users/logout') 
           toast.success('Logged out successfully!', {duration:2000})
           router.push("/login");
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message, {duration:2000});
        }
    }

    const changePassword = async()=>{
        try {
            const response = await axios.post('/api/users/change-password')
            if(response.data.success){
                alert("An email has been sent to your registered Email")
            }
        } catch (error:any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile Page</h1>
        <hr />
        <h2>{data === "nothing"? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button onClick={logout} className='py-2 px-4 bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold rounded-lg'>Logout</button>
        <button onClick={getUserDetails} className='py-2 px-4 bg-green-500 mt-4 hover:bg-green-700 text-white font-bold rounded-lg'>Get Data</button>
        <button onClick={changePassword} className='py-2 px-4 bg-yellow-500 mt-4 hover:bg-yellow-700 text-white font-bold rounded-lg'>Change Password</button>
    </div>
  )
}
