'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage(){

  const router = useRouter();

  const [user, setUser] = useState({email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async() => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success('Logged in successfully!');
      router.push("/profile");
      setLoading(false);

    } catch (error:any) {
      setLoading(false)
      console.log("Error in Login", error);
      toast.error(error.message);
      
    }
  }

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl ">{loading? "Processing...": "Login"}</h1>
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
      <button disabled={buttonDisabled} onClick={onLogin} className="py-1 px-2 border mb-4 border-gray-500 rounded-lg">
        {buttonDisabled ? "No Login": "Login"}
      </button>
      <Link href={"/signup"}>visit signup page</Link>
    </div>
  )
}

