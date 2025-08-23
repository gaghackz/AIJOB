"use client"
import React from 'react';
import Orb from '@/components/Orb';
import LightRays from '@/components/Galaxy';
import SpotlightCard from '@/components/SpotlightCard';
import {
  Home,
  Compass,
  Mail,
  LogIn
} from 'lucide-react';
import Link from 'next/link';
import Galaxy from '@/components/Galaxy';

export default function App() {
  return (
    // Main container with full viewport height and flex column layout
    <div className="flex flex-col min-h-screen bg-slate-900  text-gray-800 font-sans relative ">
      {/* Header section */}
      <header className="fixed top-0 left-0 w-full bg-slate-800/30 backdrop-blur-lg shadow-sm p-4 md:p-6 flex justify-between  border-b z-50">
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
      <main className="relative flex-1 h-screen snap-y snap-mandatory scroll-smooth">

      {/* Hero Section */}
      <section className="relative snap-start h-screen flex flex-col items-center justify-center bg-slate-950">
        <div className="absolute inset-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1}
            glowIntensity={0.2}
            saturation={0}
            hueShift={0}
          />
        </div>

        <div className="absolute mt-7 inset-0 flex items-center justify-center z-10">
          <Orb
            hoverIntensity={0.8}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
          />
        </div>

        {/* Hero Content */}
        <div className="z-20 mt-20 text-center">
          <h1 className="font-serif text-4xl md:text-7xl font-extrabold text-zinc-50 mb-4 leading-tight">
            AI Interview Coach
          </h1>
          <p className="text-lg md:text-xl text-zinc-200 mb-8">
            Train with AI. Interview with confidence.
          </p>
          <Link
            href={"/"}
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="snap-start h-screen bg-amber-400 grid grid-cols-1 md:grid-cols-3 gap-6 items-center justify-center p-10">
        <SpotlightCard spotlightColor="rgba(25, 114, 255, 0.2)" />
        <SpotlightCard spotlightColor="rgba(25, 114, 255, 0.2)" />
        <SpotlightCard spotlightColor="rgba(25, 114, 255, 0.2)" />
      </section>
    </main>

      {/* Footer section */}
      <footer className="bg-gray-100 py-6 px-4 md:px-6 text-center text-gray-500 border-t border-gray-200">
        <p>&copy; 2024 InterviewIQ. All rights reserved.</p>
      </footer>
    </div>
  );
};
