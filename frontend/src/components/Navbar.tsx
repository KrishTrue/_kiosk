import React, { useState, useEffect } from 'react';
import { Globe, HelpCircle, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const day = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    const rest = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }).toUpperCase();
    return { day, rest };
  };

  const { day, rest } = formatDate(currentTime);

  return (
    <nav className="w-full h-28 bg-gradient-to-r from-[#001f3f] via-[#003366] to-[#001a33] px-10 flex items-center justify-between text-white shadow-2xl border-b border-white/10 select-none">
      
      <div className="flex items-center gap-4 group cursor-pointer active:scale-95 transition-transform">
        <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
          <GraduationCap size={42} className="text-white fill-white/20" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold tracking-tight leading-none">
            Smart <span className="font-light opacity-90">Campus</span>
          </h1>
          <p className="text-[10px] tracking-[0.2em] opacity-50 font-bold uppercase mt-1">
            BFGI Ecosystem
          </p>
        </div>
      </div>


      <div className="flex items-center gap-10">
        <div className="text-5xl font-medium tracking-tighter tabular-nums">
          {formatTime(currentTime)}
        </div>
        
        <div className="h-12 w-[1px] bg-white/20" /> 
        
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-[0.1em] opacity-60">
            {day}
          </span>
          <span className="text-lg font-medium tracking-wide">
            {rest.replace(',', '')}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          className="flex items-center gap-3 bg-white text-[#001f3f] px-6 py-3 rounded-full font-bold text-sm shadow-lg active:bg-gray-200 transition-colors touch-none"
          onClick={() => {/* Handle Language Change */}}
        >
          <Globe size={20} strokeWidth={2.5} />
          <span>ENGLISH</span>
        </button>

      </div>
    </nav>
  );
};

export default Navbar;