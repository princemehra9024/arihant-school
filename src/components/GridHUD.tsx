"use client";

import React from "react";

export default function GridHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]">
      {/* Vertical Lines */}
      <div className="absolute inset-0 flex justify-between">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-px h-full bg-[#0B1B3D]" />
        ))}
      </div>
      {/* Horizontal Lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-px w-full bg-[#0B1B3D]" />
        ))}
      </div>
      {/* Crosshairs in corners */}
      <div className="absolute top-10 left-10 w-4 h-4 border-t-2 border-l-2 border-[#0B1B3D]" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t-2 border-r-2 border-[#0B1B3D]" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b-2 border-l-2 border-[#0B1B3D]" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b-2 border-r-2 border-[#0B1B3D]" />
      
      {/* Technical Labels */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[0.2em] uppercase">
        System Status: Optimal // Arihant Academy Core
      </div>
    </div>
  );
}
