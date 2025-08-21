"use client"
import React from 'react';
import Orb from '@/components/Orb';
import LightRays from '@/components/LightRays';
import SpotlightCard from '@/components/SpotlightCard';
import {
  Home,
  Compass,
  Mail,
  LogIn
} from 'lucide-react';

export default function App() {
  return (
    // Main container with full viewport height and flex column layout
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans">
     
      
      {/* Header section */}
      <header className="bg-slate-950 shadow-sm p-4 md:p-6 flex justify-between items-center border-b sticky top-0 z-50">
        <div className="font-extrabold text-2xl text-blue-600 tracking-tight">
          InterviewIQ
        </div>
        <nav className="flex items-center space-x-6">
          <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-200">
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300 flex items-center">
                <Home className="mr-1" size={16} /> Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300 flex items-center">
                <Compass className="mr-1" size={16} /> Explore
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600 transition duration-300 flex items-center">
                <Mail className="mr-1" size={16} /> Contact Us
              </a>
            </li>
          </ul>
          <a href="#" className="flex items-center space-x-2 text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
            <LogIn size={16} />
            <span className="hidden sm:inline">Log In</span>
          </a>
        </nav>
      </header>

      {/* Main content area */}
      <main className="bg-slate-900 flex-1 p-6 md:p-10 flex flex-col items-center justify-center text-center">
        
        {/* Hero Section */}
        <section className="relative z-10 max-w-4xl w-full h-screen flex flex-col items-center justify-center">
          {/* Orb background, absolutely positioned inside hero */}
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <div className="relative w-[700px] h-[1200px] pointer-events-auto">
              <Orb
                hoverIntensity={0.8}
                rotateOnHover={true}
                hue={0}
                forceHoverState={false}
              />
            </div>
          </div>
          
          {/* Hero Content */}
          <h1 className="font-serif mt-10 text-4xl md:text-7xl font-extrabold text-zinc-50 mb-4 leading-tight z-10">
            AI Interview Coach
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-8 z-10">
            Train with AI. Interview with confidence.
          </p>
          <a
            href="#"
            className="mb-50 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300 z-10"
          >
            Get Started
          </a>
        </section>
        
        {/* Feature Cards Section */}
        <section className="h-screen mt-16 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(25, 114, 255, 0.2)">
            {/* Content goes here */}
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(25, 114, 255, 0.2)">
            {/* Content goes here */}
          </SpotlightCard>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(25, 114, 255, 0.2)">
            {/* Content goes here */}
          </SpotlightCard>
        </section>
      </main>

      {/* Footer section */}
      <footer className="bg-gray-100 py-6 px-4 md:px-6 text-center text-gray-500 border-t border-gray-200">
        <p>&copy; 2024 InterviewIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};
