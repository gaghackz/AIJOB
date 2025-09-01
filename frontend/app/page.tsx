"use client"
import React, { useRef,useEffect } from 'react';
import Orb from '@/components/Orb';
import SpotlightCard from '@/components/SpotlightCard';
import { Button } from '@/components/ui/button';
import { SignInButton,SignedOut,SignedIn,UserButton,useUser} from '@clerk/nextjs';
import { syncUserWithBackend } from '@/lib/userApi';
import { AcademicCapIcon,FireIcon } from '@heroicons/react/16/solid';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

export default function App() {


  const { isSignedIn, user, isLoaded } = useUser();

  const hasSynced = useRef(false);

  useEffect(() => {
    
    if (!isLoaded) {
      return;
    }

    
    if (isSignedIn && user && !hasSynced.current) {
      const primaryEmail = user.primaryEmailAddress?.emailAddress;
      if (primaryEmail) {
        
        hasSynced.current = true;
        syncUserWithBackend(primaryEmail);
      }
    }
    
    
    if (!isSignedIn) {
      hasSynced.current = false;
    }

  }, [isSignedIn, isLoaded, user]);



  return (
    // Main container with full viewport height and flex column layout
    <div className="flex flex-col min-h-screen text-gray-800 font-sans">

      {/* Header section */}
      <header className="fixed top-0 left-0 w-full bg-slate-800/30 backdrop-blur-lg shadow-sm p-4 md:p-6 flex justify-between z-50">
        <div className="font-extrabold text-2xl bg-gradient-to-r from-blue-600 via-indigo-400 to-blue-300 text-transparent bg-clip-text tracking-tight">
          InterviewIQ
        </div>
        <nav className="flex items-center">
          <SignedOut>
            <SignInButton >
              <div className="flex items-center">
                <Button className='bg-amber-50 text-blue-600'>Log In</Button>
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <div className='flex items-center transform scale-150'>
              <UserButton/>
            </div>
          </SignedIn>
        </nav>
      </header>

      {/* Main content area */}
      
     <main className="z-0 relative flex-1 h-screen snap-y snap-mandatory scroll-smooth overflow-hidden">
  
  {/* Hero Section */}
  <section className="relative snap-start h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">
    
    {/* The Galaxy is now inside this section and will be contained within it */}
    <div className="absolute inset-0 z-10">
      
    </div>

    <div className="absolute mt-9 inset-0 flex items-center justify-center z-20">
      <Orb
        hoverIntensity={0.8}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
    </div>

    {/* Hero Content */}
    <div className="z-30 mt-25 text-center pointer-events-none px-4">
      <h1 className="bg-gradient-to-r font-bebas text-transparent from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-5xl md:text-8xl mb-4 leading-tight">
        AI Interview Coach
      </h1>
      <p className="font-roboto bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-transparent text-lg md:text-2xl mb-8 ">
        Train with AI. Interview with confidence.
      </p>
      <Link
        href={"/roleselect"}
        className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300 pointer-events-auto"
      >
        Get Started
      </Link>
    </div>
  </section>

  {/* Feature Cards Section */}
  {/* Changed h-screen to min-h-screen to allow content to grow */}
<section className="relative z-0 snap-start min-h-screen py-24 px-4 bg-gradient-to-t from-slate-950 to-slate-900">
  <div className="absolute inset-0 z-10">
  </div>

  {/* Cards container: changed to flex-col on mobile, flex-row on large screens */}
  <div className="relative z-20 flex flex-col lg:flex-row w-full h-full items-center justify-center gap-8 lg:gap-6">
    {/* Card 1: Made width, icons, and text responsive */}
    <SpotlightCard className="w-full max-w-xs sm:max-w-sm h-[30rem] lg:w-[28rem]" spotlightColor="rgba(38, 0, 194, 0.4)">
      <div className="flex h-full flex-col items-center justify-center p-4">
        <AcademicCapIcon className="size-36 sm:size-48 lg:size-60 mb-6 lg:mb-10 text-blue-500"/> 
        <div>
          <b className="bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-transparent text-center block mb-2 text-xl sm:text-2xl lg:text-3xl whitespace-normal break-words">Ace the Tech Interview</b>
          <p className="bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-transparent text-center text-sm sm:text-base lg:text-lg whitespace-normal break-words">Practice real questions. Get instant feedback.</p>
        </div>
      </div>
    </SpotlightCard>
    
    {/* Card 2: Made width, icons, and text responsive */}
    <SpotlightCard className="w-full max-w-xs sm:max-w-sm h-[30rem] lg:w-[28rem]" spotlightColor="rgba(38, 0, 194, 0.4)" >
      <div className="flex h-full flex-col items-center justify-center p-4">
        <Pencil className="w-32 h-32 sm:w-44 sm:h-44 lg:w-56 lg:h-56 mb-6 lg:mb-16 text-blue-500" /> 
        <div>
          <b className="bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-transparent text-center block mb-2 text-xl sm:text-2xl lg:text-3xl whitespace-normal break-words">Sharpen Your Skills</b>
          <p className="bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-transparent text-center text-sm sm:text-base lg:text-lg whitespace-normal break-words">Master key concepts. Identify weak spots.</p>
        </div>
      </div>
      </SpotlightCard>
      
    {/* Card 3: Made width, icons, and text responsive */}
    <SpotlightCard className="w-full max-w-xs sm:max-w-sm h-[30rem] lg:w-[28rem]" spotlightColor="rgba(38, 0, 194, 0.4)" >
      <div className='flex h-full flex-col items-center justify-center p-4'>
        <FireIcon className="size-36 sm:size-48 lg:size-60 mb-6 lg:mb-10 text-blue-600" /> 
        <div>
          <b className='bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-center text-transparent block mb-2 text-xl sm:text-2xl lg:text-3xl whitespace-normal break-words'>Boost Your Confidence</b>
          <p className = 'bg-gradient-to-b from-zinc-50 to-gray-400 bg-clip-text text-center text-transparent text-sm sm:text-base lg:text-lg whitespace-normal break-words'>Feel prepared. Interview like a pro.</p>
        </div>
      </div>
    </SpotlightCard>
  </div>
</section>


</main>


    {/* Footer section */}
    <footer className="bg-gray-100 py-6 px-4 md:px-6 text-center z-20 text-gray-500 border-t border-gray-200">
      <p>&copy; 2024 InterviewIQ. All rights reserved.</p>
    </footer>
  </div>
  );
};