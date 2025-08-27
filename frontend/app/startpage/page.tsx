"use client"
import React from "react";
import AnimatedContent from "@/components/Animated";
import { UserButton,useUser } from "@clerk/nextjs";



export default function Page(){
    const { isSignedIn, user, isLoaded } = useUser();
    let name = "";
    if (isLoaded && isSignedIn) {
        
        name = user.firstName || user.username || "";
    }
    
    
    return (
    <div className="h-screen relative flex flex-col items-center justify-center bg-slate-950">
        <AnimatedContent >
        <div
          className="flex flex-col mt-10 items-center h-[40rem] w-[80rem] 
            rounded-[2rem] border border-slate-500/40 
            bg-slate-800/40 backdrop-blur-2xl shadow-2xl 
            p-12 transition-transform duration-500 hover:scale-[1.02]"
        >
          {/* 2. Use a flex container to stack the button and text vertically */}
          <div className="mt-15">
            <div className="flex flex-col justify-center items-center gap-15">
            {/* Increased scale and removed extra margin for better centering */}
            <div className="scale-[500%]">
              <UserButton />
            </div>

            {/* 3. Display the greeting only if the user is loaded and signed in */}
            
            <b className="text-white text-4xl font-bold tracking-wide mt-4">
                HELLO {name.toUpperCase()}
            </b>
            
          </div>
          </div>
          
        </div>
        </AnimatedContent>
    </div>
    )
}