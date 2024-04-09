'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(){

  const router = useRouter()

  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Success", response.data);
      router.push("/login")

    } catch (error:any){
      console.log("Error in sign up", error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0 && user.username.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl ">{loading? "Processing...": "Signup"}</h1>
      <label htmlFor="username">username:</label>
      <input 
        className="p-2 border border-gray-30 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        type="text" 
        id="username" 
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({...user, username:e.target.value})}
      />
      <label htmlFor="email">email:</label>
      <input 
        className="p-2 border border-gray-30 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="email"
        type="text" 
        id="email" 
        value={user.email} 
        onChange={(e) => setUser({...user, email:e.target.value})}
      />
      <label htmlFor="password">password:</label>
      <input 
        className="p-2 border border-gray-30 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        placeholder="password"
        type="text" 
        id="password" 
        value={user.password} 
        onChange={(e) => setUser({...user, password:e.target.value})}
      />
      <button disabled={buttonDisabled} onClick={onSignup} className="py-1 px-2 border mb-4 border-gray-500 rounded-lg">
        {buttonDisabled ? "No Signup": "Signup"}
      </button>
      <Link href={"/login"}>visit login page</Link>

    </div>
  )
}

