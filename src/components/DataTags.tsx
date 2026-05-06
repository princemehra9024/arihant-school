"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const tags = [
  "TOP RANKS 2026",
  "CBSE AFFILIATED",
  "IIT-JEE PREP",
  "NEET INTEGRATED",
  "ELITE FACULTY",
  "KOTA LEGACY",
];

export default function DataTags() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = containerRef.current?.querySelectorAll(".data-tag");
      items?.forEach((item) => {
        gsap.to(item, {
          x: "random(-20, 20)",
          y: "random(-20, 20)",
          duration: "random(2, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      {tags.map((tag, i) => (
        <div
          key={i}
          className="data-tag absolute text-[10px] font-black border border-[#0B1B3D] px-2 py-1 bg-white text-[#0B1B3D] uppercase tracking-widest whitespace-nowrap"
          style={{
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
        >
          {tag}
        </div>
      ))}
    </div>
  );
}
