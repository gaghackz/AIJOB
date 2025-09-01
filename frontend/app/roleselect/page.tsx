"use client"
import React from "react";
import AnimatedContent from "@/components/Animated";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";

const roles = [
  { id: "backendEngineer", label: "Backend Engineer" },
  { id: "frontendEngineer", label: "Frontend Developer" },
  { id: "dataAnalyst", label: "Data Analyst" },
  { id: "devOps", label: "DevOps Engineer" },
  { id: "mlEngineer", label: "ML Engineer" },
  { id: "qaEngineer", label: "QA Engineer" },
  { id: "uixDesigner", label: "UI/UX Designer" },
  { id: "productManager", label: "Product Manager" },
];

export default function Page() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(id: string, primaryEmail?: string) {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DEV}/api/v1/role-select`, {
        email: primaryEmail,
        role: id,
      });
      if (response.data && response.data.success) {
        console.log("Role selected successfully. Navigating...");
        router.push("/startpage");
      } else {
        console.error("API returned an error:", response.data.message);
        alert("Failed to save your role. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred during the API call:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isLoaded || !isSignedIn) {
    // Return a loading indicator or null while Clerk is loading
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">
            <OrbitProgress color="#b8e2ff" size="medium" />
        </div>
    );
  }
  const primaryEmail = user.primaryEmailAddress?.emailAddress;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-slate-950 p-4">
      {/* Changed absolute to fixed */}
      <div className="scale-125 sm:scale-150 fixed right-4 top-4 z-50"> 
        <UserButton />
      </div>
      <AnimatedContent>
        <div
          className="flex flex-col items-center 
            w-full max-w-md lg:max-w-none lg:w-[80rem] 
            h-auto lg:h-[40rem] rounded-[2rem] border border-slate-500/40 
            bg-slate-800/40 backdrop-blur-2xl shadow-2xl 
            p-8 lg:p-12 transition-transform duration-500 hover:scale-[1.02]
            my-10 lg:my-0"
        >
          <h1 className="text-center text-3xl lg:text-5xl font-extrabold text-white tracking-tight drop-shadow-lg mb-12 lg:mb-20">
            Choose your role for interview
          </h1>

          {isLoading ? (
            <OrbitProgress color="#b8e2ff" size="medium" text="" textColor="" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full">
              {roles.map((role) => (
                <button
                  key={role.id}
                  id={role.id}
                  onClick={() => handleClick(role.id, primaryEmail)}
                  className="px-6 py-4 rounded-xl bg-slate-700/40 text-white font-medium
                             border border-slate-500/50 shadow-md 
                             hover:bg-indigo-600 hover:scale-105 
                             transition-all duration-300 ease-in-out"
                >
                  {role.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </AnimatedContent>
    </div>
  );
}