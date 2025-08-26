"use client"
import React from "react";
import AnimatedContent from "@/components/Animated";
import { UserButton,useUser } from "@clerk/nextjs";
import { handleClick } from "@/end-func/functions";


const roles = [
  { id: "backend", label: "Backend Engineer" },
  { id: "frontend", label: "Frontend Developer" },
  { id: "data-analyst", label: "Data Analyst" },
  { id: "devops", label: "DevOps Engineer" },
  { id: "ml", label: "ML Engineer" },
  { id: "qa", label: "QA Engineer" },
  { id: "designer", label: "UI/UX Designer" },
  { id: "pm", label: "Product Manager" },
]



export default function Page(){
    const user = useUser();
    return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-gradient-to-r from-slate-900 via-indigo-700 to-purple-600">
       
        <div className="scale-150 mr-5 absolute right-4 top-4 justify-end">
            <UserButton/> 
        </div>
        <AnimatedContent >
        <div className="flex flex-col mt-10 items-center h-[40rem] w-[80rem] 
            rounded-[2rem] border border-slate-500/40 
            bg-slate-800/40 backdrop-blur-2xl shadow-2xl 
            p-12 transition-transform duration-500 hover:scale-[1.02]">

            <h1 className="mb-20 text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">
                Choose your role for interview
            </h1>

            <div className="grid grid-cols-3 gap-6 w-full">
                {roles.map((role) => (
                <button
                    key={role.id}
                    id={role.id}
                    onClick={() => handleClick(role.id)}
                    className="w-20rem px-6 py-4 rounded-xl bg-slate-700/40 text-white font-medium
                            border border-slate-500/50 shadow-md 
                            hover:bg-indigo-600 hover:scale-105 
                            transition-all duration-300 ease-in-out"
                >
                    {role.label}
                </button>
                ))}
            </div>
        </div>
        </AnimatedContent>
    </div>
    )
}