'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmailPage() {

    const router = useRouter();
    const [user, setUser] = useState({password: "", confirmPassword: "",token:"" });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const changePassword = async() => {
        console.log(user)
        try{
            setLoading(true);
            const response = await axios.post('/api/users/resetpassword', user);
            if(response.data.success){
                alert("Password Changed Successfully")
                setError(false)
                setLoading(false);
              router.push("/login");
            }
            
        }catch(error:any){
            setLoading(false)
            setError(true)
            console.log("Error: ", error.message)
        }
    }

    useEffect(() => { 
        const urlToken = window.location.search.split("=")[1]
        setUser({...user,token:urlToken})

        // const {query} = router;
        // const urlToken = query.token
    },[])

    useEffect(()=>{
        if(user.password.length>0 && user.confirmPassword.length>0){
          setButtonDisabled(false)
        }else{
          setButtonDisabled(true)
        }
    },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-2xl ">{loading? "Processing...": "Change Password"}</h1>
    <label htmlFor="newPassword">newPassword:</label>
    <input 
      className="p-2 border border-gray-30 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      placeholder="newPassword"
      type="text" 
      id="newPassword" 
      value={user.password} 
      onChange={(e) => setUser({...user, password:e.target.value.toString()})}
    />
    <label htmlFor="confirmPassword">confirmPassword:</label>
    <input 
      className="p-2 border border-gray-30 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      placeholder="confirmPassword"
      type="text" 
      id="confirmPassword" 
      value={user.confirmPassword} 
      onChange={(e) => setUser({...user, confirmPassword:e.target.value.toString()})}
    />
    <button disabled={buttonDisabled} onClick={changePassword} className="py-1 px-2 border mb-4 border-gray-500 rounded-lg">
      {buttonDisabled ? "No Submit": "Submit"}
    </button>
    {error && (
            <div>
                <h2>Error</h2>
            </div>
        )
    }
  </div>
  )
}

