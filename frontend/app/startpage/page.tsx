"use client"
import React from "react";
import AnimatedContent from "@/components/Animated";
import { UserButton } from "@clerk/nextjs";



export default function Page(){

    return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-slate-950">
       
        
            
       
        <AnimatedContent >
        <div className="flex flex-col mt-10 items-center h-[40rem] w-[80rem] 
            rounded-[2rem] border border-slate-500/40 
            bg-slate-800/40 backdrop-blur-2xl shadow-2xl 
            p-12 transition-transform duration-500 hover:scale-[1.02]">

            <div className="scale-500 mt-15">
                <UserButton/> 
            </div>
                
            
        </div>
        </AnimatedContent>
    </div>
    )
}