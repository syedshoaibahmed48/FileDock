"use client"
import { useState } from "react";
import { UserAuthData } from "@/app/models/app-interfaces";
import validationRegex from "@/assets/validation_regex.json";

export default function AuthPage(){

    const [showValidationErrors, SetShowValidationErrors] = useState<boolean>(false);
    const [userAuthData, setUserAuthData] = useState<UserAuthData>({
        username: '',
        isValidUsername: false,
        email: '',
        isValidEmail: false,
        password: '',
        isValidPassword: false,
        confirmPassword: '',
        passwordsMatch: false
    })

    async function signupUser(){
        if(!userAuthData.isValidUsername || !userAuthData.isValidEmail || !userAuthData.isValidPassword || !userAuthData.passwordsMatch){
            SetShowValidationErrors(true);
            return;
        }
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: userAuthData.username,
                    email : userAuthData.email,
                    password: userAuthData.password
                })
            })
            if(response.ok){
                //show toast message
                console.log((await response.json()).message);
            }
            else{
                //show toast message
                alert((await response.json()).message);
            }
        } catch (error) {
            console.error(error);
        }
        
    }

    return(
        <div className="my-[5%] container flex items-center justify-center px-6 mx-auto">
            <div className="flex flex-col w-full max-w-md">
                    <h2 className="text-4xl text-center text-teal-500 p-4 border-b border-teal-500">Signup</h2>
                <div className="relative flex items-center mt-8">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        value={userAuthData.username} 
                        onChange={(e)=>{
                            const newUsername = e.target.value;
                            setUserAuthData({...userAuthData, 
                                username: newUsername,
                                isValidUsername: !!newUsername.match(validationRegex.usernameRegex)
                            })
                        }} 
                        className={`block w-full py-3 border rounded-lg px-11 bg-zinc-900 text-zinc-300 ${showValidationErrors ? (userAuthData.isValidUsername ? 'border-teal-300' : 'border-red-500') : 'border-teal-300'} focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Username" />
                </div>
                {showValidationErrors && !userAuthData.isValidUsername && (
                        <p className="text-red-500 text-sm mt-1">{validationRegex.usernameValidMessage}</p>
                )}
                <div className="relative flex items-center mt-6">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3  text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </span>
                    <input 
                        type="email" 
                        value={userAuthData.email} 
                        onChange={(e)=>{
                            const newEmail = e.target.value;
                            setUserAuthData({...userAuthData, 
                                email: newEmail,
                                isValidEmail: !!newEmail.match(validationRegex.emailRegex)
                            })
                        }} 
                        className={`block w-full py-3 border rounded-lg px-11 bg-zinc-900 text-zinc-300 ${showValidationErrors ? (userAuthData.isValidEmail ? 'border-teal-300' : 'border-red-500') : 'border-teal-300'} focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Email address" />
                </div>
                {showValidationErrors && !userAuthData.isValidEmail && (
                        <p className="text-red-500 text-sm mt-1">{validationRegex.emailValidMessage}</p>
                )}
                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3  text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>
                    <input 
                        type="password" 
                        value={userAuthData.password} 
                        onChange={(e)=>{
                            const newPassword = e.target.value;
                            setUserAuthData({...userAuthData, 
                                password: newPassword,
                                isValidPassword: !!newPassword.match(validationRegex.passwordRegex)
                            })
                        }} 
                        className={`block w-full px-10 py-3 border rounded-lg bg-zinc-900 text-zinc-300 ${showValidationErrors ? (userAuthData.isValidPassword ? 'border-teal-300' : 'border-red-500') : 'border-teal-300'} focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Password" />
                </div>
                {showValidationErrors && !userAuthData.isValidPassword && (
                        <p className="text-red-500 text-sm mt-1">{validationRegex.passwordValidMessage}</p>
                )}
                <div className="relative flex items-center mt-4">
                    <span className="absolute">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>
                    <input 
                        type="password" 
                        value={userAuthData.confirmPassword} 
                        onChange={(e)=>{
                            const newConfirmPassword = e.target.value;
                            setUserAuthData({...userAuthData, 
                                confirmPassword: newConfirmPassword,
                                passwordsMatch: userAuthData.password === newConfirmPassword
                            })
                        }} 
                        className={`block w-full px-10 py-3 border rounded-lg bg-zinc-900 text-zinc-300 ${showValidationErrors ? (userAuthData.passwordsMatch ? 'border-teal-300' : 'border-red-500') : 'border-teal-300'} focus:ring-zinc-300 focus:outline-none focus:ring focus:ring-opacity-40`} placeholder="Confirm Password" />
                </div>
                {showValidationErrors && !userAuthData.passwordsMatch && (
                        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                )}
                <div className="mt-6">
                    <button 
                     type="button" 
                     onClick={signupUser} 
                     className="w-full px-6 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-teal-500 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50">
                        Sign up
                    </button>
                    <div className="mt-6 text-center ">
                        <p className="text-sm">
                            Already have an account?
                            <a href="/signin" className="text-teal-500 ml-2 hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
