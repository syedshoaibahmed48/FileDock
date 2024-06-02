"use client"
import { useState } from "react";
import { UserAuthData } from "@/app/models/app-interfaces";

export default function SignIn() {

    const [userAuthData, SetUserAuthData] = useState<UserAuthData>({
        username: '',
        password: ''
    })    

    function signinUser() {
        // Auth logic
    }

    return (
        <div className="my-[5%] container flex items-center justify-center px-6 mx-auto">
            <div className="flex flex-col w-full max-w-md">
                <h2 className="text-4xl text-center text-teal-500 p-4 border-b border-teal-500">Sign in</h2>
                <div className="relative flex items-center mt-8">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <input type="text" value={userAuthData.username} onChange={(e)=>{SetUserAuthData({...userAuthData, username: e.target.value})}} className="block w-full py-3 border rounded-lg px-11 bg-zinc-900 text-zinc-300 border-zinc-600 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
                </div>
                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>
                    <input type="password" value={userAuthData.password} onChange={(e)=>{SetUserAuthData({...userAuthData, password: e.target.value})}} className="block w-full px-10 py-3 border rounded-lg bg-zinc-900 text-zinc-300 border-zinc-600 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
                </div>
                <div className="mt-6">
                    <button type="button" className="w-full px-6 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50">
                        Sign in
                    </button>
                    <div className="mt-6 text-center">
                        <p className="text-sm">Don't have an account?
                            <a href="/signup" className="text-teal-500 ml-2 hover:underline">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
