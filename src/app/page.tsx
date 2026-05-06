"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  School, 
  Users, 
  Trophy, 
  Target, 
  ArrowRight, 
  Video, 
  Play, 
  ShieldCheck, 
  CheckCircle2, 
  Calculator, 
  Phone, 
  Mail, 
  Clock, 
  Database,
  Activity,
  MapPin,
  BookMarked,
  LayoutGrid,
  Zap,
  Globe,
  Award,
  BookOpen, 
  Sparkles, 
  Send, 
  X, 
  Volume2, 
  Calendar,
  Search,
  Layers,
  Milestone
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}


// High-quality stock images from Pexels (fetched earlier)
const images = {
  heroBg: "https://images.pexels.com/photos/35551059/pexels-photo-35551059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1600",
  library: "https://images.pexels.com/photos/35550999/pexels-photo-35550999.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  globeStudy: "https://images.pexels.com/photos/35551010/pexels-photo-35551010.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  biologyLab: "https://images.pexels.com/photos/35551044/pexels-photo-35551044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  microscopeGirl: "https://images.pexels.com/photos/8471930/pexels-photo-8471930.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  chemistryBoy: "https://images.pexels.com/photos/8471829/pexels-photo-8471829.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  kidsReading: "https://images.pexels.com/photos/18650478/pexels-photo-18650478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};

export default function HomePage() {
  // GSAP animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const schoolsRef = useRef<HTMLElement>(null);
  const infrastructureRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);


  // App states
  const [activeTab, setActiveTab] = useState<"integrated" | "primary" | "middle" | "senior">("integrated");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  // Auto-cycle curriculum tabs
  useEffect(() => {
    const tabs = ["integrated", "senior", "middle", "primary"] as const;
    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const currentIndex = tabs.indexOf(prev as any);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4000); // Switches every 4 seconds

    return () => clearInterval(interval);
  }, []);

  // Live Admissions Counter simulation for "Award Winning" real-time engagement
  const [seatsLeft, setSeatsLeft] = useState(24);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeatsLeft((prev) => (prev > 3 ? prev - (Math.random() > 0.7 ? 1 : 0) : 24));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Form states
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
    grade: "Grade 11 - IIT JEE Integrated",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Live DB inquiries display to demonstrate PostgreSQL fullstack integration live!
  const [dbInquiries, setDbInquiries] = useState<any[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Fee Estimator state
  const [estimateGrade, setEstimateGrade] = useState("nursery");
  const [includeTransport, setIncludeTransport] = useState(false);
  const [includeIntegratedCoaching, setIncludeIntegratedCoaching] = useState(true);
  const [estimatedFee, setEstimatedFee] = useState({ tuition: 45000, exam: 5000, coaching: 30000, transport: 0, total: 80000 });

  // GSAP Intro Entrance & Scroll Animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tl = gsap.timeline();
      tl.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
      tl.fromTo(".hero-text", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, "-=0.4");
      tl.fromTo(".hero-badge", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.6");
      tl.fromTo(".hero-card", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "-=0.4");

      // Parallax for Hero Lines
      gsap.to(".hero-line-1", { y: 100, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-line-2", { y: -150, scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } });
      
      // GSAP for Academic Journey Progress
      gsap.to(".journey-bar", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // Staggered reveal for section headers
      gsap.utils.toArray<HTMLElement>(".reveal-header").forEach((header) => {
        gsap.from(header, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Stats counter animation
      gsap.from(".stat-item", {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%"
        }
      });

      // Developer Promo Animation
      gsap.from(".developer-promo", {
        scrollTrigger: {
          trigger: ".developer-promo",
          start: "top 95%",
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });
    }
    fetchInquiries();
  }, []);


  // Fetch submitted inquiries from server
  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch("/api/inquiry");
      const data = await res.json();
      if (data.success) {
        setDbInquiries(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  // Recalculate estimated fee on change
  useEffect(() => {
    let tuition = 35000;
    let exam = 4000;
    let coaching = 0;
    let transport = includeTransport ? 12000 : 0;

    switch (estimateGrade) {
      case "nursery":
        tuition = 32000;
        exam = 3000;
        break;
      case "primary":
        tuition = 45000;
        exam = 4000;
        break;
      case "middle":
        tuition = 55000;
        exam = 5000;
        break;
      case "secondary":
        tuition = 65000;
        exam = 6000;
        break;
      case "senior":
        tuition = 75000;
        exam = 7000;
        if (includeIntegratedCoaching) {
          coaching = 45000; // Integrated JEE/NEET mentorship and specialized materials
        }
        break;
    }

    setEstimatedFee({
      tuition,
      exam,
      coaching,
      transport,
      total: tuition + exam + coaching + transport,
    });
  }, [estimateGrade, includeTransport, includeIntegratedCoaching]);

  // Form Submission handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSuccess(null);
    setFormError(null);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setFormSuccess(result.message);
        setFormData({
          studentName: "",
          parentName: "",
          email: "",
          phone: "",
          grade: "Grade 11 - IIT JEE Integrated",
          message: "",
        });
        // Refresh live inquiries list
        fetchInquiries();
      } else {
        setFormError(result.error || "An error occurred. Please verify your details.");
      }
    } catch (err) {
      setFormError("Failed to connect to server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // GSAP Scroll Animation for Schools Section (Using ScrollTrigger instead of IntersectionObserver)
  useEffect(() => {
    if (typeof window !== "undefined" && schoolsRef.current) {
      gsap.from(".school-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: schoolsRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }, []);


  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0B1B3D] font-sans antialiased selection:bg-[#FF6B00] selection:text-white relative">
      
      {/* PHASE 1: CUSTOM INTERACTIVE ELEMENTS - REMOVED */}
      
      {/* PHASE 3: ACADEMIC JOURNEY TRACKER (Side Progress) */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 w-1 h-64 bg-gray-200 z-50 hidden xl:block border border-[#0B1B3D]/10">
        <div className="journey-bar absolute top-0 left-0 w-full bg-[#FF6B00] h-0" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-black uppercase rotate-90 origin-left whitespace-nowrap opacity-40">
          Academic Journey Evolution
        </div>
      </div>

      {/* PHASE 3: QUICK ACTION DOCK */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#0B1B3D] border-2 border-white px-6 py-3 z-[100] rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-6 backdrop-blur-md bg-opacity-90 text-white">
        <a href="#admissions-inquiry" className="group flex flex-col items-center">
          <Zap className="w-4 h-4 text-[#FF6B00] group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-black uppercase mt-1">Apply</span>
        </a>
        <div className="w-px h-6 bg-white/20" />
        <a href="https://wa.me/919414182345" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center">
          <Phone className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-black uppercase mt-1">Chat</span>
        </a>
        <div className="w-px h-6 bg-white/20" />
        <a href="#our-schools" className="group flex flex-col items-center">
          <Globe className="w-4 h-4 text-[#D2143A] group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-black uppercase mt-1">Branches</span>
        </a>
      </div>

      {/* 1. TOP TICKER (Admissions Ticker & High Alert Announcement) */}
      {!announcementDismissed && (
        <div className="bg-[#D2143A] text-white py-3 px-4 relative overflow-hidden border-b-4 border-[#0B1B3D] z-50">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none" 
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)' }}
          ></div>
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs md:text-sm font-semibold tracking-wider relative z-10">
            <div className="flex items-center gap-3">
              <span className="bg-[#0B1B3D] text-white text-[10px] font-black px-3 py-1 border-2 border-white rounded-none uppercase tracking-widest shadow-[2px_2px_0px_#FF6B00]">
                ALERT
              </span>
              <span className="font-extrabold uppercase tracking-widest text-white drop-shadow-md hidden sm:inline">
                // ADMISSIONS OPEN 2026-27: CBSE Integrated Batches. Limited {seatsLeft} Seats!
              </span>
              <span className="font-extrabold uppercase tracking-widest text-white drop-shadow-md sm:hidden">
                // ADMISSIONS OPEN 2026!
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  const element = document.getElementById("admissions-inquiry");
                  element?.scrollIntoView({ behavior: "smooth" });
                }} 
                className="hidden lg:inline-block bg-[#0B1B3D] text-white hover:bg-white hover:text-[#0B1B3D] px-3 py-1 transition-all text-xs font-bold tracking-tight uppercase border border-white"
              >
                Reserve Seat Now
              </button>
              <button 
                onClick={() => setAnnouncementDismissed(true)} 
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HEADER & NAVIGATION */}
      <header ref={headerRef} className="sticky top-0 z-40 bg-white border-b-4 border-[#0B1B3D] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand with sharp, non-gradient colors */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0B1B3D] text-white flex items-center justify-center font-black text-2xl border-2 border-[#FF6B00]">
              AA
            </div>
            <div>
              <div className="text-lg md:text-xl font-black uppercase tracking-tight text-[#0B1B3D] leading-none flex items-center gap-1.5">
                ARIHANT ACADEMY
              </div>
              <p className="text-[10px] font-bold text-[#FF6B00] uppercase tracking-widest mt-1">
                SR. SEC. SCHOOL • RANGBADI, KOTA
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#0B1B3D]">
            <a href="#about" className="hover:text-[#FF6B00] transition-colors">About Academy</a>
            <a href="#curriculum" className="hover:text-[#FF6B00] transition-colors">Curriculum</a>
            <a href="#infrastructure" className="hover:text-[#FF6B00] transition-colors">Campus Tour</a>
            <a href="#fee-estimator" className="hover:text-[#FF6B00] transition-colors">Fee Estimator</a>
            <a href="#events" className="hover:text-[#FF6B00] transition-colors">Events</a>
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <a 
              href="#admissions-inquiry" 
              className="bg-[#FF6B00] text-white px-5 py-2.5 text-xs sm:text-sm font-black uppercase tracking-wider border-2 border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#0B1B3D] transition-all"
            >
              Enquire 2026-27
            </a>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Award-winning, Large Typography, Strict solid color theme, Dynamic slots counter) */}
      <section ref={heroRef} className="relative min-h-[90vh] flex flex-col justify-center border-b-4 border-[#0B1B3D] bg-[#0B1B3D] overflow-hidden text-white">
        
        {/* Geometric lines - Decorative Parallax */}
        <div className="hero-parallax absolute inset-0 -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-px h-full bg-[#0B1B3D]" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-[#0B1B3D]" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-[#0B1B3D]" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-[#0B1B3D]" />
          <div className="absolute top-2/4 left-0 w-full h-px bg-[#0B1B3D]" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-[#0B1B3D]" />
        </div>


        {/* Hero content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Live Counter Badge */}
            <div className="hero-badge self-start flex items-center gap-2 bg-[#FF6B00] text-white px-4 py-1.5 text-xs font-black uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_#D2143A] mb-8">
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              <span>KOTA'S PREMIER INTEGRATED SCHOOL</span>
              <span className="bg-white text-[#FF6B00] px-1.5 py-0.2 text-[10px] ml-1">CBSE AFFILIATED</span>
            </div>

            {/* Giant Bold Headline */}
            <h1 className="hero-text text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[0.95] tracking-tight uppercase text-white mb-6">
              THE INTELLECTUAL <span className="text-[#FF6B00]">POWERHOUSE</span> OF KOTA.
            </h1>

            <p className="hero-text text-lg md:text-xl text-gray-200 max-w-2xl font-medium tracking-normal mb-8 leading-relaxed">
              At <strong className="text-[#FF6B00]">Arihant Academy</strong>, we fuse world-class CBSE board education with Kota's legendary competitive rigor. We cultivate global thinkers, board toppers, and future innovators.
            </p>

            {/* CTAs */}
            <div className="hero-text flex flex-wrap gap-4 mb-12">
              <a 
                href="#admissions-inquiry" 
                className="bg-[#D2143A] text-white px-8 py-4 font-black uppercase tracking-wider text-sm border-2 border-white shadow-[5px_5px_0px_#FF6B00] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#FF6B00] transition-all"
              >
                Secure Admissions Form
              </a>
              <a 
                href="#fee-estimator" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#0B1B3D] px-8 py-4 font-black uppercase tracking-wider text-sm transition-all"
              >
                Calculate Fees Instantly
              </a>
            </div>

            {/* High-Contrast Fast Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 text-center lg:text-left">
              <div className="stat-item hero-card bg-[#112552] p-4 border-l-4 border-[#FF6B00]">
                <div className="text-3xl md:text-4xl font-extrabold text-white">100%</div>
                <div className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">Board Success</div>
              </div>
              <div className="stat-item hero-card bg-[#112552] p-4 border-l-4 border-[#D2143A]">
                <div className="text-3xl md:text-4xl font-extrabold text-white">25:1</div>
                <div className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">Student-Teacher Ratio</div>
              </div>
              <div className="stat-item hero-card bg-[#112552] p-4 border-l-4 border-white">
                <div className="text-3xl md:text-4xl font-extrabold text-white">450+</div>
                <div className="text-[10px] md:text-xs font-bold text-gray-300 uppercase tracking-widest mt-1">IIT / NEET Alums</div>
              </div>
            </div>


          </div>

          {/* Interactive Right-side Hero Showcase: Real-time Admissions Clock & Live School Feature Block */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-white text-[#0B1B3D] p-6 sm:p-8 border-4 border-[#0B1B3D] shadow-[8px_8px_0px_#FF6B00]">
              <div className="flex items-center justify-between border-b-2 border-[#0B1B3D] pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-black uppercase tracking-tight text-[#0B1B3D]">CAMPUS DIRECT DESK</h3>
                  <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-wider">Rangbadi Campus, Kota</p>
                </div>
                <span className="animate-ping w-3 h-3 rounded-full bg-[#D2143A]" />
              </div>

              {/* Display Fetched Image with absolute crisp container */}
              <div className="w-full h-48 relative mb-6 overflow-hidden border-2 border-[#0B1B3D]">
                <img 
                  src={images.heroBg} 
                  alt="Arihant Academy Students" 
                  className="w-full h-full object-cover filter contrast-110 saturate-100" 
                />
                <div className="absolute bottom-2 left-2 bg-[#0B1B3D] text-white text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase">
                  Interactive Smart Classroom
                </div>
              </div>

              <div className="space-y-4 text-sm font-medium">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#0B1B3D] text-white flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                  <p className="text-gray-700">
                    <strong className="text-[#0B1B3D] font-extrabold">Integrated Prep:</strong> Daily Kota expert sessions mapped perfectly alongside CBSE curriculum.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#FF6B00] text-white flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                  <p className="text-gray-700">
                    <strong className="text-[#0B1B3D] font-extrabold">Personalized Care:</strong> Weekly 1-on-1 performance review with parents and senior mentors.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#D2143A] text-white flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                  <p className="text-gray-700">
                    <strong className="text-[#0B1B3D] font-extrabold">Holistic Facilities:</strong> Fully modernized physics, chemistry, and high-performance biology labs.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#F0F2F5] flex items-center justify-between text-xs font-bold bg-[#FAF9F5] p-3 border border-[#0B1B3D]">
                <span className="text-gray-600 uppercase tracking-wider">SEATS FILLING SECURELY:</span>
                <span className="text-[#D2143A] font-black text-sm">{seatsLeft} slots left!</span>
              </div>
            </div>
            
            {/* Background solid decoration representing the non-gradient requirement */}
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#D2143A] -z-10 border-4 border-[#0B1B3D]" />
          </div>

        </div>
      </section>

      {/* 3.5 CONTINUOUS CAMPUS SHOWCASE (VIDEO) */}
      <section className="bg-[#112552] border-b-4 border-[#0B1B3D] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Video Container */}
          <div className="relative border-b-4 lg:border-b-0 lg:border-r-4 border-[#0B1B3D] min-h-[350px] lg:min-h-[500px] bg-[#0B1B3D] p-6 lg:p-12 flex items-center justify-center">
            {/* The "Better Frame" */}
            <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] border-4 border-white shadow-[8px_8px_0px_#FF6B00] bg-black overflow-hidden flex flex-col">
              {/* Decorative top bar for the frame */}
              <div className="w-full h-10 bg-white border-b-4 border-[#0B1B3D] flex items-center px-4 gap-2 z-20 shrink-0">
                <div className="w-3 h-3 rounded-full bg-[#D2143A] border border-[#0B1B3D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FF6B00] border border-[#0B1B3D]"></div>
                <div className="w-3 h-3 rounded-full bg-[#0B1B3D] border border-[#0B1B3D]"></div>
                <div className="ml-auto text-[#0B1B3D] text-[10px] font-black uppercase tracking-widest">
                  LIVE STREAM
                </div>
              </div>
              <div className="relative flex-1 w-full min-h-[300px] lg:min-h-[400px]">
                <div className="absolute inset-0 bg-[#0B1B3D]/10 z-10 mix-blend-overlay pointer-events-none"></div>
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  preload="auto"
                  poster={images.heroBg}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" />
                </video>

                <div className="absolute bottom-4 right-4 z-20 bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-white shadow-[2px_2px_0px_#0B1B3D] animate-pulse">
                  🔴 RECORDING
                </div>
              </div>
            </div>
            
            {/* Badge */}
            <div className="absolute top-4 left-4 z-30 bg-white text-[#0B1B3D] text-[10px] font-black uppercase tracking-widest px-3 py-1 border-2 border-[#0B1B3D] shadow-[2px_2px_0px_#FF6B00]">
              CAMPUS FEED
            </div>
          </div>
          
          {/* Text Container */}
          <div className="p-10 lg:p-16 flex flex-col justify-center bg-[#FF6B00] text-white relative border-l-2 border-[#FF6B00]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -mr-16 -mt-16 rotate-45"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#D2143A] -ml-20 -mb-20 rounded-full mix-blend-multiply opacity-80"></div>
            
            <div className="relative z-10">
              <span className="text-white text-xs font-black uppercase tracking-widest block mb-4 border-l-4 border-white pl-3">
                DYNAMIC LEARNING ENVIRONMENT
              </span>
              <h2 className="reveal-header text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                EXPERIENCE ARIHANT IN MOTION.
              </h2>

              <p className="text-white font-bold text-sm md:text-base leading-relaxed mb-8 max-w-md">
                We don't just talk about modern education. We build it. Watch our students engage with world-class facilities, interactive boards, and holistic development programs every single day.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="bg-white text-[#0B1B3D] px-6 py-3 font-black uppercase tracking-wider text-xs border-2 border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D]">
                  <Volume2 className="w-4 h-4 inline-block mr-2" />
                  Visual Showcase
                </div>
                <a href="#infrastructure" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0B1B3D] transition-colors px-6 py-3 font-black uppercase tracking-wider text-xs flex items-center">
                  Full Gallery <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE KOTA EDGE: DIRECTORS VISION (Authentic Non-AI Copy) */}
      <section id="about" className="py-20 bg-white border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="border-4 border-[#0B1B3D] shadow-[10px_10px_0px_#0B1B3D] overflow-hidden bg-white">
                <img 
                  src={images.globeStudy} 
                  alt="Anatomy class and guidance" 
                  className="w-full h-[450px] object-cover"
                />
                <div className="bg-[#0B1B3D] text-white p-6 border-t-4 border-[#0B1B3D]">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-extrabold uppercase tracking-widest text-sm text-[#FF6B00]">FOUNDATION FOR GREATNESS</h4>
                    <span className="text-xs font-bold text-gray-300">ESTD. 2008</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed font-medium">
                    "We do not believe in rote learning. We cultivate analytical faculties so that students naturally conquer boards and major entrance exams simultaneously."
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-[#FF6B00] text-white text-xs font-black uppercase tracking-wider px-4 py-2 border-2 border-[#0B1B3D] shadow-[3px_3px_0px_#0B1B3D]">
                Rangbadi Campus Leader
              </div>
            </div>

            <div className="lg:col-span-7">
              <span className="text-[#D2143A] text-xs font-black uppercase tracking-widest block mb-3">
                // EXECUTIVE VISION STATEMENT
              </span>
              <h2 className="reveal-header text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none mb-6">
                BRIDGING THE GAP BETWEEN ACADEMICS &amp; COMPETITIVE SUCCESS.
              </h2>

              
              <div className="space-y-6 text-gray-700 font-medium text-base leading-relaxed">
                <p>
                  Kota is globally acclaimed for producing doctors and engineers, but often at the cost of a balanced schooling life. <strong className="text-[#0B1B3D]">Arihant Academy Sr. Sec. School</strong> was built to solve this exact dilemma. 
                </p>
                <p>
                  We offer a unified pathway. From nursery to senior secondary level, our school curriculum evolves systematically. Our primary wings focus on conceptual clarity via the hands-on Playway approach, while secondary stages master NCERT, and our senior secondary students have the option to step into the <span className="text-[#FF6B00] font-extrabold uppercase">Kota Integrated Stream</span>.
                </p>
                <p className="border-l-4 border-[#FF6B00] pl-4 text-[#0B1B3D] font-bold">
                  No running to coaching institutes at 4:00 PM. No exhausted children. We integrate elite coaching curriculum right inside the school hours, guided by mentors who have spent decades inside Kota’s largest test-prep ecosystems.
                </p>
              </div>

              {/* Highlights List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t-2 border-gray-100">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  <span className="font-bold text-sm text-[#0B1B3D] uppercase tracking-wider">CBSE Compliant Laboratory Practice</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D2143A] shrink-0" />
                  <span className="font-bold text-sm text-[#0B1B3D] uppercase tracking-wider">Expert Mental Aptitude Drills</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0B1B3D] shrink-0" />
                  <span className="font-bold text-sm text-[#0B1B3D] uppercase tracking-wider">Spacious Playgrounds &amp; Physical Health</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  <span className="font-bold text-sm text-[#0B1B3D] uppercase tracking-wider">Daily Doubt-Clearing Counters</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTERACTIVE CURRICULUM & ACADEMIC HUB */}
      <section id="curriculum" className="py-20 bg-[#FAF9F5] border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div ref={curriculumRef} className="text-center max-w-3xl mx-auto mb-16">
            <span className="reveal-header text-xs font-black uppercase tracking-widest text-[#FF6B00] bg-white px-3 py-1 border border-[#0B1B3D] inline-block mb-3">
              ACADEMIC SPECTRUM
            </span>
            <h2 className="reveal-header text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none mb-4">
              NURTURING MINDS AT EVERY TIER.
            </h2>
            <p className="reveal-header text-gray-600 font-bold text-sm uppercase tracking-wide">
              Click the educational tier to see timings, subjects, and specialized pedagogy.
            </p>
          </div>


          {/* Interactive Navigation Tabs */}
          {/* Interactive Navigation Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
            <button 
              onClick={() => setActiveTab("integrated")}
              className={`p-4 border-2 font-black uppercase text-xs sm:text-sm tracking-wider transition-all text-center flex items-center justify-center gap-2 ${
                activeTab === "integrated" 
                  ? "bg-[#FF6B00] text-white border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D]" 
                  : "bg-white text-[#0B1B3D] border-[#0B1B3D] hover:bg-[#F4F6F9]"
              }`}
            >
              <Zap className="w-4 h-4" /> JEE/NEET Integrated
            </button>
            <button 
              onClick={() => setActiveTab("senior")}
              className={`p-4 border-2 font-black uppercase text-xs sm:text-sm tracking-wider transition-all text-center flex items-center justify-center gap-2 ${
                activeTab === "senior" 
                  ? "bg-[#D2143A] text-white border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D]" 
                  : "bg-white text-[#0B1B3D] border-[#0B1B3D] hover:bg-[#F4F6F9]"
              }`}
            >
              <Award className="w-4 h-4" /> Senior Secondary
            </button>
            <button 
              onClick={() => setActiveTab("middle")}
              className={`p-4 border-2 font-black uppercase text-xs sm:text-sm tracking-wider transition-all text-center flex items-center justify-center gap-2 ${
                activeTab === "middle" 
                  ? "bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D]" 
                  : "bg-white text-[#0B1B3D] border-[#0B1B3D] hover:bg-[#F4F6F9]"
              }`}
            >
              <School className="w-4 h-4" /> Secondary Wing
            </button>
            <button 
              onClick={() => setActiveTab("primary")}
              className={`p-4 border-2 font-black uppercase text-xs sm:text-sm tracking-wider transition-all text-center flex items-center justify-center gap-2 ${
                activeTab === "primary" 
                  ? "bg-white text-[#FF6B00] border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D]" 
                  : "bg-white text-[#0B1B3D] border-[#0B1B3D] hover:bg-[#F4F6F9]"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Primary Playway
            </button>
          </div>

          {/* Active Tab Content display (Strict no-gradient design, high-contrast block) */}
          <div className="bg-white border-4 border-[#0B1B3D] p-6 sm:p-10 shadow-[6px_6px_0px_#0B1B3D]">
            {activeTab === "integrated" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4 text-[#FF6B00]">
                    <Sparkles className="w-5 h-5 text-[#FF6B00]" />
                    <span className="font-extrabold uppercase tracking-wider text-xs">EXCELLENCE MULTIPLIED // GRADE 11 &amp; 12</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] uppercase tracking-tight mb-4">
                    KOTA IIT-JEE &amp; NEET INTEGRATED PROGRAM
                  </h3>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    Designed for students aiming for top ranks in engineering and medical entrances. This program streamlines class lectures, practical lab work, and competitive test preparation into a highly optimized, fatigue-free schedule right inside the school campus.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider mb-6">
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">PROGRAM TIMING</span>
                      <span className="text-[#0B1B3D] text-sm">08:00 AM - 03:30 PM</span>
                    </div>
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">MOCK ASSESSMENT</span>
                      <span className="text-[#FF6B00] text-sm">Every Alternative Saturday</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Curriculum integrated seamlessly with CBSE Board preparation &amp; NCERT syllabus
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Printed study modules, daily practice problems (DPPs), and weekly rank testing
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Dedicated self-study library &amp; doubt-clearing desk active till 6:00 PM
                    </li>
                  </ul>
                  <a href="#admissions-inquiry" className="inline-flex items-center gap-2 text-xs font-black text-[#FF6B00] uppercase tracking-widest hover:underline">
                    Download Integrated Syllabus <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="lg:col-span-5 border-2 border-[#0B1B3D] p-4 bg-gray-50">
                  <img src={images.library} alt="Integrated Study" className="w-full h-56 object-cover mb-4 border border-[#0B1B3D]" />
                  <div className="bg-white p-3 border border-gray-200 text-xs text-gray-500 font-semibold text-center">
                    Students working on rank assessment sheets in the Senior Study Hall.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "senior" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4 text-[#D2143A]">
                    <Award className="w-5 h-5" />
                    <span className="font-extrabold uppercase tracking-wider text-xs">BOARD DOMINANCE // GRADE 11 &amp; 12</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] uppercase tracking-tight mb-4">
                    CBSE SENIOR SECONDARY (SCIENCE, COMMERCE &amp; HUMANITIES)
                  </h3>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    A rigorous academic approach that delivers exceptional scores in CBSE Board Examinations while solidifying professional career foundations. Students benefit from immersive laboratory activities and extensive project presentations.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider mb-6">
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">AVAILABLE STREAMS</span>
                      <span className="text-[#0B1B3D] text-sm">Medical, Non-Med, Commerce, Arts</span>
                    </div>
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">LAB HOURS</span>
                      <span className="text-[#D2143A] text-sm">6 Hours per week compulsory</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#D2143A]" />
                      Comprehensive Chemistry, Physics, and Biology laboratory experiments
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#D2143A]" />
                      English Communication &amp; Digital Tech literacy integration
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#D2143A]" />
                      Career counselling webinars and placement prep for tier-1 universities
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border-2 border-[#0B1B3D] p-4 bg-gray-50">
                  <img src={images.biologyLab} alt="Biology lab learning" className="w-full h-56 object-cover mb-4 border border-[#0B1B3D]" />
                  <div className="bg-white p-3 border border-gray-200 text-xs text-gray-500 font-semibold text-center">
                    Advanced biology instruction with real-world anatomical teaching.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "middle" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4 text-[#0B1B3D]">
                    <BookOpen className="w-5 h-5" />
                    <span className="font-extrabold uppercase tracking-wider text-xs">FOUNDATION BLOCK // GRADE 6 TO 10</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] uppercase tracking-tight mb-4">
                    MIDDLE &amp; SECONDARY WING EDUCATION
                  </h3>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    Developing critical thinking, computational logic, and social sciences comprehension. This stage bridges the transition from play-based cognitive development to organized conceptual learning, incorporating CBSE guidelines with innovative assessments.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider mb-6">
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">FOCUS AREAS</span>
                      <span className="text-[#0B1B3D] text-sm">STEM, Languages, Mental Math</span>
                    </div>
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">CO-CURRICULAR</span>
                      <span className="text-[#0B1B3D] text-sm">Coding, Robotics, Performing Arts</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#0B1B3D]" />
                      Regular Olympiad training programs (NCO, NSO, IMO)
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#0B1B3D]" />
                      Interactive smartboard classrooms with audio-visual learning
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#0B1B3D]" />
                      Active participation in Inter-School debates, sports tournaments &amp; music
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border-2 border-[#0B1B3D] p-4 bg-gray-50">
                  <img src={images.chemistryBoy} alt="Science lab child" className="w-full h-56 object-cover mb-4 border border-[#0B1B3D]" />
                  <div className="bg-white p-3 border border-gray-200 text-xs text-gray-500 font-semibold text-center">
                    Active experimental learning in Chemistry Labs.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "primary" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 mb-4 text-[#FF6B00]">
                    <Users className="w-5 h-5" />
                    <span className="font-extrabold uppercase tracking-wider text-xs">JOYFUL BEGINNINGS // NURSERY TO GRADE 5</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] uppercase tracking-tight mb-4">
                    PRIMARY &amp; PRE-PRIMARY PLAYWAY ACADEMY
                  </h3>
                  <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                    Cultivating curiosity, empathy, and fundamental literacy through a highly child-centric play-way mechanism. We ensure a warm, inviting environment where every milestone is celebrated with individual focus and care.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider mb-6">
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">TEACHER-STUDENT</span>
                      <span className="text-[#FF6B00] text-sm">15:1 Maximum Ratio</span>
                    </div>
                    <div className="bg-gray-50 p-3 border border-gray-200">
                      <span className="text-gray-500 block mb-1">DAILY ACTIVITY</span>
                      <span className="text-[#FF6B00] text-sm">Sensory learning, Outdoor sports</span>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Phonetics-integrated language modules for speech clarity
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Montessori educational materials and creative playrooms
                    </li>
                    <li className="flex items-center gap-2 font-bold text-sm text-[#0B1B3D]">
                      <span className="w-1.5 h-1.5 bg-[#FF6B00]" />
                      Regular motor-skills activities and digital storytelling hours
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-5 border-2 border-[#0B1B3D] p-4 bg-gray-50">
                  <img src={images.kidsReading} alt="Two children reading" className="w-full h-56 object-cover mb-4 border border-[#0B1B3D]" />
                  <div className="bg-white p-3 border border-gray-200 text-xs text-gray-500 font-semibold text-center">
                    Collaborative reading hours in our bright, airy pre-primary learning spaces.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 5.5 OUR SCHOOLS - CAMPUS NETWORK */}
      <section id="our-schools" ref={schoolsRef} className="py-20 bg-white border-b-4 border-[#0B1B3D] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 relative z-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D2143A] bg-gray-100 px-3 py-1 inline-block mb-3 border border-[#0B1B3D]">
                OUR EDUCATIONAL NETWORK
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none">
                3 PREMIER CAMPUSES.
              </h2>
            </div>
            <p className="text-gray-600 font-bold text-sm md:text-base max-w-md mt-4 md:mt-0 uppercase tracking-wide">
              A unified vision of excellence spread across the city to provide accessible, high-tier education.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* School 1 */}
            <div className="school-card group border-4 border-[#0B1B3D] bg-white hover:bg-[#0B1B3D] hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_#FF6B00] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#FF6B00] relative overflow-hidden flex flex-col z-10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6B00] -mr-8 -mt-8 rotate-45 transform group-hover:bg-white transition-colors duration-300"></div>
              <div className="p-8 flex-grow">
                <div className="w-12 h-12 bg-[#0B1B3D] group-hover:bg-white group-hover:text-[#0B1B3D] text-white flex items-center justify-center mb-6 transition-colors duration-300 border-2 border-[#FF6B00]">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Arihant Academy Sr. Sec.</h3>
                <p className="text-[#FF6B00] group-hover:text-[#FF6B00] font-extrabold text-xs uppercase tracking-widest mb-4">
                  Rangbadi Campus
                </p>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-300 leading-relaxed mb-6">
                  The flagship senior secondary branch offering CBSE and Integrated JEE/NEET preparation. State-of-the-art labs and massive library.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" /> Grades: Nursery to 12
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" /> Focus: Integrated Sciences
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-[#0B1B3D] group-hover:border-white p-4 text-center text-xs font-black uppercase tracking-widest bg-[#FAF9F5] group-hover:bg-[#FF6B00] group-hover:text-white transition-colors duration-300">
                Explore Branch <ArrowRight className="w-4 h-4 inline ml-1" />
              </div>
            </div>

            {/* School 2 */}
            <div className="school-card group border-4 border-[#0B1B3D] bg-white hover:bg-[#0B1B3D] hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_#D2143A] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#D2143A] relative overflow-hidden flex flex-col mt-0 lg:mt-8 z-10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#D2143A] -mr-8 -mt-8 rotate-45 transform group-hover:bg-white transition-colors duration-300"></div>
              <div className="p-8 flex-grow">
                <div className="w-12 h-12 bg-[#0B1B3D] group-hover:bg-white group-hover:text-[#0B1B3D] text-white flex items-center justify-center mb-6 transition-colors duration-300 border-2 border-[#D2143A]">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Arihant Public School</h3>
                <p className="text-[#D2143A] group-hover:text-[#D2143A] font-extrabold text-xs uppercase tracking-widest mb-4">
                  Talwandi Campus
                </p>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-300 leading-relaxed mb-6">
                  A premium foundational campus focusing on holistic cognitive development, smart classrooms, and extensive extracurriculars.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#D2143A]" /> Grades: Nursery to 8
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-[#D2143A]" /> Focus: Core Foundations
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-[#0B1B3D] group-hover:border-white p-4 text-center text-xs font-black uppercase tracking-widest bg-[#FAF9F5] group-hover:bg-[#D2143A] group-hover:text-white transition-colors duration-300">
                Explore Branch <ArrowRight className="w-4 h-4 inline ml-1" />
              </div>
            </div>

            {/* School 3 */}
            <div className="school-card group border-4 border-[#0B1B3D] bg-white hover:bg-[#0B1B3D] hover:text-white transition-colors duration-300 shadow-[8px_8px_0px_#0B1B3D] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#0B1B3D] relative overflow-hidden flex flex-col mt-0 lg:mt-16 z-10">
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#0B1B3D] -mr-8 -mt-8 rotate-45 transform group-hover:bg-white transition-colors duration-300"></div>
              <div className="p-8 flex-grow">
                <div className="w-12 h-12 bg-white group-hover:bg-[#FF6B00] text-[#0B1B3D] group-hover:text-white flex items-center justify-center mb-6 transition-colors duration-300 border-2 border-[#0B1B3D] group-hover:border-white">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Arihant International</h3>
                <p className="text-[#0B1B3D] group-hover:text-[#FF6B00] font-extrabold text-xs uppercase tracking-widest mb-4">
                  Kunadi Campus
                </p>
                <p className="text-sm font-medium text-gray-600 group-hover:text-gray-300 leading-relaxed mb-6">
                  Our newest high-tech facility featuring robotics labs, Olympic-level sports complex, and global curriculum standards.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 group-hover:text-[#FF6B00]" /> Grades: 1 to 10
                  </li>
                  <li className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 group-hover:text-[#FF6B00]" /> Focus: Tech & Athletics
                  </li>
                </ul>
              </div>
              <div className="border-t-2 border-[#0B1B3D] group-hover:border-white p-4 text-center text-xs font-black uppercase tracking-widest bg-[#FAF9F5] group-hover:bg-white group-hover:text-[#0B1B3D] transition-colors duration-300">
                Explore Branch <ArrowRight className="w-4 h-4 inline ml-1" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CAMPUS INFRASTRUCTURE & PHOTO GALLERY */}
      <section id="infrastructure" className="py-20 bg-[#0B1B3D] text-white border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] block mb-2">
                // WORLD-CLASS ARCHITECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none text-white">
                EXPLORE ARIHANT INFRASTRUCTURE
              </h2>
            </div>
            <p className="text-gray-300 font-medium text-sm md:text-base max-w-md mt-4 md:mt-0">
              Clean modern environments engineered to foster focus, inspiration, and systematic learning in Kota, Rajasthan.
            </p>
          </div>

          {/* Infrastructure Bento Grid - Final Precision Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-auto lg:h-[700px]">
            
            {/* Big Feature: Science Labs (Tall block) */}
            <div className="md:col-span-2 lg:col-span-3 lg:row-span-2 bg-[#112552] border-2 border-[#FF6B00] p-8 flex flex-col group relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <LayoutGrid className="w-32 h-32" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-8">
                  <span className="text-[10px] font-black bg-[#FF6B00] text-white px-2 py-1 uppercase tracking-widest inline-block mb-4">
                    // STEM HUB [SCHEMATIC 01]
                  </span>
                  <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 leading-none">Advanced Biotech & Science Labs</h3>
                  <p className="text-xs text-gray-400 font-medium leading-relaxed max-w-sm uppercase tracking-wide">
                    Equipped with high-resolution digital microscopes and safety systems adhering to international guidelines.
                  </p>
                </div>
                <div className="flex-grow overflow-hidden border border-[#FF6B00]/30 relative">
                  <img 
                    src={images.microscopeGirl} 
                    alt="Science Lab" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#0B1B3D]/40 group-hover:bg-transparent transition-colors duration-500" />
                  {/* Drawing overlay */}
                  <div className="absolute inset-0 pointer-events-none border-[1px] border-white/5 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <button 
                    onClick={() => setLightboxImage(images.microscopeGirl)} 
                    className="absolute bottom-4 right-4 bg-white text-[#0B1B3D] p-4 border-2 border-[#0B1B3D] hover:bg-[#FF6B00] hover:text-white transition-all z-20 group-hover:shadow-[4px_4px_0px_#FF6B00]"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Knowledge Hub: Library (Horizontal block) */}
            <div className="md:col-span-2 lg:col-span-3 lg:row-span-1 bg-[#112552] border-2 border-white p-6 flex flex-col md:flex-row gap-6 group relative overflow-hidden h-full">
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] font-black bg-white text-[#0B1B3D] px-2 py-1 uppercase tracking-widest inline-block mb-4 w-fit">
                  // KNOWLEDGE CORE [SCHEMATIC 02]
                </span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2 leading-none">Central Library</h3>
                <p className="text-xs text-gray-400 font-medium leading-relaxed uppercase tracking-wider">
                  15,000+ reference books with digital cataloging.
                </p>
                <button 
                  onClick={() => setLightboxImage(images.library)} 
                  className="mt-6 text-[10px] font-black uppercase tracking-widest text-white border-b-2 border-[#FF6B00] pb-1 hover:text-[#FF6B00] transition-colors inline-block w-fit"
                >
                  Explore Catalog
                </button>
              </div>
              <div className="w-full md:w-1/2 h-48 md:h-full overflow-hidden border border-white/20 relative shrink-0">
                <img 
                  src={images.library} 
                  alt="Library" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#0B1B3D]/20 group-hover:bg-transparent transition-colors" />
              </div>
            </div>

            {/* Smart Classrooms (Wide block) */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-[#112552] border-2 border-[#D2143A] p-6 flex flex-col group relative h-full">
              <div className="relative z-10">
                <span className="text-[10px] font-black bg-[#D2143A] text-white px-2 py-1 uppercase tracking-widest inline-block mb-4">
                  // TECH SPACES [SCHEMATIC 03]
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2">AV-Enabled Classrooms</h3>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Acoustically treated environments.</p>
              </div>
              <div className="mt-4 flex-grow overflow-hidden border border-[#D2143A]/30 relative">
                <img 
                  src={images.heroBg} 
                  alt="Classrooms" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </div>

            {/* Extra Highlight: Sports/Tech (Small aesthetic block) */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-1 bg-[#FF6B00] border-2 border-[#0B1B3D] p-6 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white transition-all relative h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0B1B3D]/20" />
              <Award className="w-16 h-16 text-white group-hover:text-[#FF6B00] mb-4 transition-transform group-hover:scale-110" />
              <h4 className="text-[10px] font-black uppercase text-white group-hover:text-[#0B1B3D] tracking-widest leading-tight">Olympic<br/>Standards</h4>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 border-4 border-white/10 rotate-45 pointer-events-none" />
            </div>

          </div>

          {/* Extra Campus Highlights Banner - Emojis removed */}
          <div className="mt-12 bg-white text-[#0B1B3D] border-4 border-[#FF6B00] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#FF6B00] text-white flex items-center justify-center shrink-0 border-2 border-[#0B1B3D]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#0B1B3D]">POWER BACKUP</h4>
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-tight">100% uninterrupted campus supply</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t-2 border-gray-100 md:border-t-0 md:border-l-2 md:pl-6">
              <div className="w-12 h-12 bg-[#0B1B3D] text-white flex items-center justify-center shrink-0 border-2 border-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#0B1B3D]">CCTV & SECURITY</h4>
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-tight">24/7 continuous campus monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t-2 border-gray-100 md:border-t-0 md:border-l-2 md:pl-6">
              <div className="w-12 h-12 bg-[#D2143A] text-white flex items-center justify-center shrink-0 border-2 border-white">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider text-[#0B1B3D]">SAFE TRANSPORT</h4>
                <p className="text-xs text-gray-600 font-semibold uppercase tracking-tight">GPS and helper assisted school buses</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE FEE ESTIMATOR (Fullstack high-utility calculator) */}
      <section id="fee-estimator" className="py-20 bg-white border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-6">
              <span className="text-[#D2143A] text-xs font-black uppercase tracking-widest block mb-2">
                // TRANSPARENCY IN EDUCATION
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none mb-6">
                INTERACTIVE CAMPUS FEE ESTIMATOR.
              </h2>
              <p className="text-gray-600 font-medium mb-6 leading-relaxed">
                We believe in complete pricing transparency with absolutely no hidden charges. Customize your student's education options on the right to view a real-time annual fee estimation, inclusive of examinations, books, and competitive stream upgrades.
              </p>

              <div className="space-y-4 bg-gray-50 p-6 border-2 border-[#0B1B3D] font-semibold text-sm">
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Standard Tuition (Annual):</span>
                  <span className="text-[#0B1B3D]">₹{estimatedFee.tuition.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Examination &amp; Lab Fee:</span>
                  <span className="text-[#0B1B3D]">₹{estimatedFee.exam.toLocaleString("en-IN")}</span>
                </div>
                {estimatedFee.coaching > 0 && (
                  <div className="flex justify-between pb-2 border-b border-gray-200 text-[#FF6B00]">
                    <span>Kota Integrated Mentorship Charge:</span>
                    <span>₹{estimatedFee.coaching.toLocaleString("en-IN")}</span>
                  </div>
                )}
                {includeTransport && (
                  <div className="flex justify-between pb-2 border-b border-gray-200 text-[#D2143A]">
                    <span>School Bus service:</span>
                    <span>₹{estimatedFee.transport.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 text-lg font-black text-[#0B1B3D]">
                  <span>TOTAL ESTIMATED FEE (ANNUAL):</span>
                  <span className="text-2xl text-[#FF6B00]">₹{estimatedFee.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 font-bold mt-3 uppercase tracking-wide">
                * Note: Installment options are available. Final fees may vary based on scholarship exams and CBSE registration.
              </p>
            </div>

            {/* Calculator controls */}
            <div className="lg:col-span-6 bg-[#0B1B3D] text-white p-6 sm:p-10 border-4 border-[#0B1B3D] shadow-[8px_8px_0px_#D2143A]">
              <div className="flex items-center gap-3 border-b border-white/20 pb-4 mb-6">
                <Calculator className="w-6 h-6 text-[#FF6B00]" />
                <h3 className="text-lg font-extrabold uppercase tracking-tight">Fee Estimation Panel</h3>
              </div>

              <div className="space-y-6">
                
                {/* 1. Grade Select */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-gray-300 mb-2">
                    SELECT STUDENT GRADE TIER:
                  </label>
                  <select 
                    value={estimateGrade}
                    onChange={(e) => {
                      setEstimateGrade(e.target.value);
                      if (e.target.value !== "senior") {
                        setIncludeIntegratedCoaching(false);
                      }
                    }}
                    className="w-full bg-white text-[#0B1B3D] border-2 border-white px-4 py-3 font-bold uppercase text-xs sm:text-sm tracking-wider focus:outline-none"
                  >
                    <option value="nursery">Pre-Primary (Nursery to KG)</option>
                    <option value="primary">Primary (Grade 1 to 5)</option>
                    <option value="middle">Middle (Grade 6 to 8)</option>
                    <option value="secondary">Secondary (Grade 9 to 10)</option>
                    <option value="senior">Senior Secondary (Grade 11 to 12)</option>
                  </select>
                </div>

                {/* 2. Integrated Coaching Option (Conditional) */}
                {estimateGrade === "senior" && (
                  <div className="bg-[#112552] p-4 border-l-4 border-[#FF6B00]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-white">
                          ADD KOTA INTEGRATED JEE / NEET PREP?
                        </h4>
                        <p className="text-[10px] text-gray-300 font-medium">
                          Includes printed competitive material &amp; master faculty lectures.
                        </p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={includeIntegratedCoaching}
                        onChange={(e) => setIncludeIntegratedCoaching(e.target.checked)}
                        className="w-5 h-5 accent-[#FF6B00] cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Transport option */}
                <div className="bg-[#112552] p-4 border-l-4 border-[#D2143A]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        REQUIRE GPS BUS TRANSPORT?
                      </h4>
                      <p className="text-[10px] text-gray-300 font-medium">
                        Covers all standard routes within Kota limits (Rangbadi, Kunhari, Talwandi).
                      </p>
                    </div>
                    <input 
                      type="checkbox"
                      checked={includeTransport}
                      onChange={(e) => setIncludeTransport(e.target.checked)}
                      className="w-5 h-5 accent-[#D2143A] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Submit redirect block */}
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      const element = document.getElementById("admissions-inquiry");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full bg-[#FF6B00] hover:bg-white hover:text-[#0B1B3D] text-white py-3 font-black uppercase tracking-wider text-xs transition-colors border border-white"
                  >
                    Lock Scholarship Estimation &amp; Apply
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. ADMISSIONS INQUIRY FORM (Fullstack DB-Saving form) */}
      <section id="admissions-inquiry" className="py-20 bg-[#FAF9F5] border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-5">
              <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest block mb-2">
                // RESERVE YOUR SPOT
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none mb-6">
                ADMISSIONS INQUIRY 2026-27.
              </h2>
              <p className="text-gray-700 font-medium mb-8 leading-relaxed">
                Submit the secure online inquiry form to register your interest for the academic cycle. Once processed, our senior registrar will schedule a mandatory diagnostic test and campus walk-through.
              </p>

              {/* Direct Support contact box */}
              <div className="bg-white border-2 border-[#0B1B3D] p-6 space-y-4">
                <h4 className="font-extrabold uppercase text-xs tracking-wider text-[#0B1B3D] border-b pb-2">
                  DIRECT REGISTRAR CHANNELS:
                </h4>
                <div className="flex items-center gap-3 font-bold text-xs sm:text-sm">
                  <Phone className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  <span>+91 744 240 8899 / +91 94141 82345</span>
                </div>
                <div className="flex items-center gap-3 font-bold text-xs sm:text-sm">
                  <Mail className="w-5 h-5 text-[#D2143A] shrink-0" />
                  <span>admissions@arihantacademykota.edu.in</span>
                </div>
                <div className="flex items-center gap-3 font-bold text-xs sm:text-sm text-gray-500">
                  <Clock className="w-5 h-5 text-[#0B1B3D] shrink-0" />
                  <span>Mon - Sat // 08:30 AM to 04:30 PM</span>
                </div>
              </div>

              {/* Toggle Admin Inquiries Monitor Button (Fullstack transparency!) */}
              <div className="mt-8">
                <button 
                  onClick={() => {
                    setShowAdminPanel(!showAdminPanel);
                    if(!showAdminPanel) fetchInquiries();
                  }}
                  className="flex items-center gap-2 bg-[#0B1B3D] text-white px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-[#0B1B3D] hover:bg-white hover:text-[#0B1B3D] transition-colors"
                >
                  <Database className="w-4 h-4" />
                  {showAdminPanel ? "Hide Live Database Inquiries" : "View Live Inquiries Feed (DB Proof)"}
                </button>
                <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase">
                  * Proof of instant PostgreSQL storage query.
                </p>
              </div>
            </div>

            {/* Form Box */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-10 border-4 border-[#0B1B3D] shadow-[8px_8px_0px_#0B1B3D]">
              
              {formSuccess && (
                <div className="bg-emerald-50 border-2 border-emerald-500 p-6 text-[#10b981] font-bold mb-6">
                  <div className="flex items-center gap-2 text-sm uppercase tracking-wide mb-2 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" />
                    Inquiry Lodged Successfully
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                    {formSuccess}
                  </p>
                </div>
              )}

              {formError && (
                <div className="bg-red-50 border-2 border-[#D2143A] p-6 text-[#D2143A] font-bold mb-6">
                  <div className="text-sm uppercase tracking-wide mb-1">
                    Submission Warning
                  </div>
                  <p className="text-xs font-semibold">{formError}</p>
                </div>
              )}

              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Student Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                      Student's Full Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>

                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                      Parent / Guardian Name *
                    </label>
                    <input 
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar Sharma"
                      className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                      Email Address *
                    </label>
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. parent@gmail.com"
                      className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                      Mobile / Phone Number *
                    </label>
                    <input 
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none"
                    />
                  </div>

                </div>

                {/* Grade Selection */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                    Select Targeted Grade Level *
                  </label>
                  <select 
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider focus:outline-none"
                  >
                    <option value="Pre-Primary (Nursery to KG)">Pre-Primary (Nursery to KG)</option>
                    <option value="Primary (Grade 1 to 5)">Primary (Grade 1 to 5)</option>
                    <option value="Middle (Grade 6 to 8)">Middle (Grade 6 to 8)</option>
                    <option value="Grade 9 to 10 (Secondary)">Grade 9 to 10 (Secondary)</option>
                    <option value="Grade 11 - CBSE Stream">Grade 11 - CBSE Standard Stream</option>
                    <option value="Grade 11 - IIT JEE Integrated">Grade 11 - IIT JEE Integrated Program</option>
                    <option value="Grade 11 - NEET Integrated">Grade 11 - NEET Integrated Program</option>
                    <option value="Grade 12 - CBSE Stream">Grade 12 - CBSE Standard Stream</option>
                    <option value="Grade 12 - IIT JEE Integrated">Grade 12 - IIT JEE Integrated Program</option>
                    <option value="Grade 12 - NEET Integrated">Grade 12 - NEET Integrated Program</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#0B1B3D] mb-1">
                    Additional Message / Scholarship query (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify past percentage, Olympiad ranks, or special transport requirements here..."
                    className="w-full bg-[#FAF9F5] border-2 border-[#0B1B3D] px-4 py-3 text-xs sm:text-sm font-semibold focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#FF6B00] text-white py-4 text-sm font-black uppercase tracking-wider border-2 border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#0B1B3D] transition-all disabled:opacity-50"
                >
                  {submitting ? " Lodging Your Request..." : "File Admissions Registration Form"}
                </button>

              </form>
            </div>

          </div>

          {/* 8b. DB LIVE MONITOR DISPLAY (Only visible when user toggles) */}
          {showAdminPanel && (
            <div className="mt-12 bg-white border-4 border-[#0B1B3D] p-6 shadow-[6px_6px_0px_#D2143A]">
              <div className="flex items-center justify-between border-b-2 border-[#0B1B3D] pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-[#D2143A]" />
                  <h3 className="font-extrabold uppercase tracking-tight text-sm text-[#0B1B3D]">
                    REAL-TIME POSTGRESQL INQUIRIES REGISTER
                  </h3>
                </div>
                <button 
                  onClick={fetchInquiries} 
                  className="text-xs font-black text-[#FF6B00] uppercase tracking-widest hover:underline"
                >
                  Refresh Feed
                </button>
              </div>

              {loadingInquiries ? (
                <p className="text-xs text-gray-500 font-bold uppercase py-6 text-center">
                  Querying database...
                </p>
              ) : dbInquiries.length === 0 ? (
                <p className="text-xs text-gray-500 font-bold uppercase py-6 text-center">
                  No inquiries found. Submit the form above to witness real-time insertion!
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-gray-100 uppercase font-black text-gray-700 border-b border-[#0B1B3D]">
                        <th className="p-3">Student</th>
                        <th className="p-3">Parent</th>
                        <th className="p-3">Email &amp; Phone</th>
                        <th className="p-3">Grade Targeted</th>
                        <th className="p-3">Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {dbInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-gray-50">
                          <td className="p-3 font-bold text-[#0B1B3D]">{inq.studentName}</td>
                          <td className="p-3">{inq.parentName}</td>
                          <td className="p-3 text-gray-600">
                            <div>{inq.email}</div>
                            <div className="text-[10px] text-[#FF6B00] font-bold">{inq.phone}</div>
                          </td>
                          <td className="p-3">
                            <span className="bg-[#FAF9F5] border border-gray-300 px-2 py-0.5 text-[10px] font-bold uppercase">
                              {inq.grade}
                            </span>
                          </td>
                          <td className="p-3 text-gray-500 text-[10px]">
                            {new Date(inq.createdAt).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      {/* 8.5 PRINCIPAL'S DESK */}
      <section className="py-20 bg-[#112552] border-b-4 border-[#0B1B3D] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D2143A] rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="border-4 border-white shadow-[10px_10px_0px_#FF6B00] overflow-hidden bg-white">
                <img src={images.library} alt="Principal Desk" className="w-full h-[400px] object-cover grayscale contrast-125 saturate-50 mix-blend-multiply" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-[#0B1B3D] border-4 border-[#0B1B3D] p-4 shadow-[5px_5px_0px_#D2143A]">
                <h4 className="font-black uppercase text-lg">Dr. R.K. Sharma</h4>
                <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest">Principal, Arihant Academy</p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <span className="text-[#FF6B00] text-xs font-black uppercase tracking-widest block mb-3 border-l-2 border-[#FF6B00] pl-2">
                // FROM THE PRINCIPAL'S DESK
              </span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none mb-6">
                SHAPING CHARACTER. DRIVING EXCELLENCE.
              </h2>
              <div className="space-y-4 text-gray-300 font-medium text-base leading-relaxed">
                <p>
                  "Welcome to Arihant Academy. Our core philosophy is built on a very simple premise: Education is not merely the accumulation of facts, but the preparation of the mind to think, analyze, and lead."
                </p>
                <p>
                  "In Kota, the competitive pressure is immense. We designed our academic ecosystem to absorb this pressure. Through our integrated programs and holistic environment, we ensure that our students are not just exam-ready, but life-ready. Discipline, moral integrity, and relentless curiosity are the pillars of our institution."
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="bg-[#D2143A] p-4 border border-white max-w-[150px]">
                  <h5 className="font-black text-xl text-white">25+</h5>
                  <p className="text-[10px] font-bold text-white uppercase tracking-wider">Years of Academic Leadership</p>
                </div>
                <div className="bg-transparent p-4 border border-gray-500 max-w-[150px]">
                  <h5 className="font-black text-xl text-white">1000s</h5>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Successful Alumni Globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.6 NOTICE BOARD & CIRCULARS */}
      <section className="py-16 bg-[#FAF9F5] border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Live Notice Board */}
            <div>
              <div className="flex items-center justify-between border-b-4 border-[#0B1B3D] pb-3 mb-6">
                <h3 className="text-2xl font-black text-[#0B1B3D] uppercase tracking-tight flex items-center gap-2">
                  <Activity className="w-6 h-6 text-[#D2143A]" /> 
                  Live Notice Board
                </h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#D2143A] rounded-full animate-pulse" />
                  <span className="text-[#D2143A] text-[10px] font-black uppercase tracking-widest">
                    SYSTEM LIVE
                  </span>
                </div>
              </div>
              <div className="bg-white border-4 border-[#0B1B3D] shadow-[6px_6px_0px_#FF6B00] overflow-hidden h-[300px] relative">
                <div className="absolute inset-0 p-6 overflow-y-auto space-y-4 custom-scrollbar" style={{ scrollbarWidth: 'thin' }}>
                  <div className="border-l-4 border-[#D2143A] pl-4 pb-4 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">05 May 2026</span>
                    <h5 className="font-extrabold text-[#0B1B3D] text-sm uppercase hover:text-[#D2143A] cursor-pointer transition-colors">CBSE Class 12 Practical Examination Schedule Released</h5>
                  </div>
                  <div className="border-l-4 border-[#FF6B00] pl-4 pb-4 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">02 May 2026</span>
                    <h5 className="font-extrabold text-[#0B1B3D] text-sm uppercase hover:text-[#FF6B00] cursor-pointer transition-colors">Revised Summer Timings & Transportation Routes</h5>
                  </div>
                  <div className="border-l-4 border-[#0B1B3D] pl-4 pb-4 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">28 Apr 2026</span>
                    <h5 className="font-extrabold text-[#0B1B3D] text-sm uppercase hover:text-[#0B1B3D] cursor-pointer transition-colors">Admissions Open 2026-27: Download Application Manual</h5>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4 pb-4 border-b border-gray-100">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">20 Apr 2026</span>
                    <h5 className="font-extrabold text-[#0B1B3D] text-sm uppercase hover:text-gray-600 cursor-pointer transition-colors">Mandatory Public Disclosure & CBSE Affiliation Status</h5>
                  </div>
                  <div className="border-l-4 border-gray-400 pl-4 pb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">15 Apr 2026</span>
                    <h5 className="font-extrabold text-[#0B1B3D] text-sm uppercase hover:text-gray-600 cursor-pointer transition-colors">Annual Sports Day Registration Deadline</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules & Discipline Guidelines */}
            <div>
              <div className="flex items-center justify-between border-b-4 border-[#0B1B3D] pb-3 mb-6">
                <h3 className="text-2xl font-black text-[#0B1B3D] uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#0B1B3D]" /> 
                  Rules & Discipline
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border-2 border-[#0B1B3D] p-4 hover:bg-[#0B1B3D] hover:text-white transition-colors group cursor-pointer">
                  <h4 className="font-extrabold text-sm uppercase mb-2">School Timings</h4>
                  <p className="text-xs text-gray-600 group-hover:text-gray-300 font-medium">Summer: 07:30 AM - 01:30 PM<br/>Winter: 08:00 AM - 02:00 PM</p>
                </div>
                <div className="bg-white border-2 border-[#0B1B3D] p-4 hover:bg-[#0B1B3D] hover:text-white transition-colors group cursor-pointer">
                  <h4 className="font-extrabold text-sm uppercase mb-2">Uniform Code</h4>
                  <p className="text-xs text-gray-600 group-hover:text-gray-300 font-medium">Strict adherence to prescribed summer/winter attire.</p>
                </div>
                <div className="bg-white border-2 border-[#0B1B3D] p-4 hover:bg-[#0B1B3D] hover:text-white transition-colors group cursor-pointer">
                  <h4 className="font-extrabold text-sm uppercase mb-2">Attendance</h4>
                  <p className="text-xs text-gray-600 group-hover:text-gray-300 font-medium">Minimum 75% attendance is mandatory for board exams.</p>
                </div>
                <div className="bg-white border-2 border-[#0B1B3D] p-4 hover:bg-[#D2143A] hover:border-[#D2143A] hover:text-white transition-colors group cursor-pointer">
                  <h4 className="font-extrabold text-sm uppercase mb-2">CBSE Disclosures</h4>
                  <p className="text-xs text-gray-600 group-hover:text-gray-200 font-medium flex items-center gap-1">Download PDF <ArrowRight className="w-3 h-3"/></p>
                </div>
              </div>
              
              {/* Additional Action */}
              <div className="mt-4 bg-[#FF6B00] text-white p-4 border-2 border-[#0B1B3D] shadow-[4px_4px_0px_#0B1B3D] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#0B1B3D] transition-all cursor-pointer flex justify-between items-center">
                <span className="font-black uppercase tracking-wider text-sm">Download School Almanac</span>
                <BookMarked className="w-5 h-5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. ACADEMIC EVENTS TIMELINE */}
      <section id="events" className="py-20 bg-white border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#D2143A] bg-gray-100 px-3 py-1 inline-block mb-3">
              ACADEMIC CALENDAR
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none mb-4">
              UPCOMING ENGAGEMENTS.
            </h2>
            <p className="text-gray-600 font-bold text-sm uppercase tracking-wide">
              Keep track of key entrance testing sessions and community dates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Event 1 */}
            <div className="border-4 border-[#0B1B3D] p-6 bg-white shadow-[6px_6px_0px_#0B1B3D]">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#FF6B00] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                  ENTRANCE DIAGNOSTIC
                </span>
                <span className="text-xs font-extrabold text-[#0B1B3D] uppercase">MARCH 15, 2026</span>
              </div>
              <h3 className="text-xl font-extrabold uppercase text-[#0B1B3D] mb-3">
                Arihant Super-30 Scholarship Exam
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
                Open testing for grades 10 going to 11. Top performers receive up to 100% waiver on senior secondary tuition.
              </p>
              <div className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
                Venue: Rangbadi Campus Hall // 10:00 AM
              </div>
            </div>

            {/* Event 2 */}
            <div className="border-4 border-[#0B1B3D] p-6 bg-[#FAF9F5] shadow-[6px_6px_0px_#D2143A]">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#D2143A] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                  COMMUNITY MEET
                </span>
                <span className="text-xs font-extrabold text-[#0B1B3D] uppercase">APRIL 04, 2026</span>
              </div>
              <h3 className="text-xl font-extrabold uppercase text-[#0B1B3D] mb-3">
                Annual Parent-Teacher Convocation
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
                Orientation session for newly admitted students and interactive blueprint projection by senior academic directors.
              </p>
              <div className="text-xs font-bold text-[#D2143A] uppercase tracking-widest">
                Venue: Main Seminar Auditorium // 09:30 AM
              </div>
            </div>

            {/* Event 3 */}
            <div className="border-4 border-[#0B1B3D] p-6 bg-white shadow-[6px_6px_0px_#FF6B00]">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#0B1B3D] text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider">
                  EXHIBITION
                </span>
                <span className="text-xs font-extrabold text-[#0B1B3D] uppercase">MAY 18, 2026</span>
              </div>
              <h3 className="text-xl font-extrabold uppercase text-[#0B1B3D] mb-3">
                State Science &amp; Innovation Expo
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
                Live exhibits from biology models, software programs, and physical science experiments made by students.
              </p>
              <div className="text-xs font-bold text-[#0B1B3D] uppercase tracking-widest">
                Venue: Athletic Courtyard // 11:00 AM
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 10. CAMPUS MAP & DETAILED CONTACT */}
      <section className="bg-[#FAF9F5] py-16 border-b-4 border-[#0B1B3D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00] block">
                // GEOGRAPHIC LOCATION
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[#0B1B3D] uppercase tracking-tight leading-none">
                CAMPUS FOOTPRINT IN KOTA.
              </h2>
              <p className="text-gray-700 font-medium text-base leading-relaxed">
                Arihant Academy is strategically placed inside Rangbadi, Kota, situated extremely close to prominent residential blocks and highly accessible via public bus transits and student pooling pathways.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6B00] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-[#0B1B3D] text-sm uppercase">CAMPUS ADDRESS:</h4>
                    <p className="text-xs text-gray-600 font-semibold uppercase">
                      Sector 4, Rangbadi Main Road, Near Rangbadi Balaji Temple, Kota, Rajasthan - 324005
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D2143A] mt-1 shrink-0" />
                  <div>
                    <h4 className="font-extrabold text-[#0B1B3D] text-sm uppercase">CAMPUS LANDLINE:</h4>
                    <p className="text-xs text-gray-600 font-semibold">
                      0744 - 2408899 / 2408900
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              {/* Beautiful, crisp geometric map substitute with high-end solid elements */}
              <div className="border-4 border-[#0B1B3D] bg-white p-4 shadow-[8px_8px_0px_#0B1B3D] relative overflow-hidden">
                <div className="bg-[#0B1B3D] text-white p-4 font-bold text-xs uppercase tracking-wider text-center mb-4">
                  📍 GEOGRAPHIC COORDINATES MAP VIEW
                </div>
                
                {/* Simulated beautiful stylized flat map for high-end aesthetic */}
                <div className="w-full h-64 bg-gray-100 border-2 border-[#0B1B3D] relative flex items-center justify-center p-6 text-center">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#FF6B00] text-white flex items-center justify-center mx-auto text-xl font-bold border-2 border-[#0B1B3D] shadow-md">
                      AA
                    </div>
                    <p className="text-[#0B1B3D] text-xs font-black uppercase tracking-widest">
                      Arihant Academy, Rangbadi Road, Kota
                    </p>
                    <p className="text-gray-500 text-[10px] font-semibold max-w-xs mx-auto">
                      Surrounded by Rangbadi Balaji Temple, Sector 4 Commercial Market, and leading student residency zones.
                    </p>
                    <a 
                      href="https://maps.google.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block bg-[#0B1B3D] text-white hover:bg-[#D2143A] transition-colors text-[10px] font-black uppercase tracking-wider py-1.5 px-3 border border-[#0B1B3D]"
                    >
                      Open Google Maps
                    </a>
                  </div>

                  {/* Simulated surrounding roads */}
                  <div className="absolute top-0 bottom-0 left-10 w-4 bg-gray-200 -z-10" />
                  <div className="absolute left-0 right-0 top-1/2 h-4 bg-gray-200 -z-10" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-[#0B1B3D] text-white py-16 border-t-8 border-[#FF6B00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-[#0B1B3D] flex items-center justify-center font-black text-xl border-2 border-[#FF6B00]">
                AA
              </div>
              <div>
                <span className="font-extrabold uppercase text-sm tracking-widest text-[#FF6B00] block leading-none">
                  ARIHANT ACADEMY
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-300">
                  SR. SEC. SCHOOL • KOTA
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-semibold">
              Serving premium education benchmarks in Kota, Rajasthan since 2008. Affiliated with Central Board of Secondary Education, Delhi.
            </p>
            <div className="pt-4 space-y-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                © {new Date().getFullYear()} ARIHANT ACADEMY. ALL RIGHTS RESERVED.
              </div>
              
              {/* Premium Developer Promotion Section: EXECUTIVE PLAN */}
              <div className="developer-promo pt-6 border-t border-gray-800">
                <div className="flex items-center gap-3 mb-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-[#FF6B00] flex items-center justify-center border-2 border-white shadow-[3px_3px_0px_#D2143A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-[#FF6B00] text-[11px] font-black uppercase tracking-[0.2em] leading-none mb-1">
                      CREATED BY
                    </h4>
                    <h3 className="text-white text-[16px] font-black uppercase tracking-tighter leading-none group-hover:text-[#FF6B00] transition-colors">
                      EXECUTIVE PLAN
                    </h3>
                  </div>
                </div>
                <div className="space-y-6">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed max-w-xs">
                    Transforming visions into high-impact digital experiences. We specialize in:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {[
                      "School Websites",
                      "E-commerce Stores",
                      "Portfolio Sites",
                      "Corporate Portals",
                      "Booking Systems",
                      "Custom Web Apps",
                      "Mobile App Dev",
                      "UI/UX Solutions"
                    ].map((type, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-[#FF6B00] rotate-45" />
                        <span className="text-white text-[9px] font-black uppercase tracking-wider">{type}</span>
                      </div>
                    ))}
                  </div>

                  <a 
                    href="https://wa.me/919024546041?text=Hi Executive Plan, I saw your work on the Arihant Academy website and I want to discuss a project." 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-white text-[#0B1B3D] px-6 py-3 text-[10px] font-black uppercase tracking-widest border-2 border-[#FF6B00] hover:bg-[#FF6B00] hover:text-white transition-all w-fit shadow-[8px_8px_0px_#D2143A] active:translate-x-1 active:translate-y-1 active:shadow-none"
                  >
                    <Phone className="w-4 h-4" />
                    Start Your Project
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wider text-[#FF6B00] text-sm mb-4 border-b border-white/10 pb-2">
              CURRICULUM WINGS
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-gray-300">
              <li><a href="#curriculum" className="hover:text-white transition-colors">IIT-JEE Integrated</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">NEET Integrated</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Secondary Wing</a></li>
              <li><a href="#curriculum" className="hover:text-white transition-colors">Primary Playway</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wider text-[#D2143A] text-sm mb-4 border-b border-white/10 pb-2">
              ACADEMY COMPLIANCE
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-gray-300">
              <li>CBSE Affiliation # 1730456</li>
              <li>School Code: 10812</li>
              <li>Annual Mandatory Disclosures</li>
              <li>Student Safety Policy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-wider text-white text-sm mb-4 border-b border-white/10 pb-2">
              CAMPUS DIRECT
            </h4>
            <p className="text-xs text-gray-300 font-semibold leading-relaxed mb-4">
              Sector 4, Rangbadi Main Road, Kota, Rajasthan
            </p>
            <div className="space-y-1 text-xs font-bold">
              <div className="text-[#FF6B00]">P: 0744 - 2408899</div>
              <div className="text-white">E: office@arihantacademy.edu</div>
            </div>
          </div>

        </div>
      </footer>

      {/* 12. LIGHTBOX MODAL (For displaying infrastructure photos) */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 bg-[#0B1B3D]/95 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white border-4 border-[#0B1B3D]">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 bg-white text-[#0B1B3D] hover:bg-[#FF6B00] hover:text-white border-2 border-[#0B1B3D] px-3 py-1 font-black uppercase text-xs tracking-wider"
            >
              Close [X]
            </button>
            <img 
              src={lightboxImage} 
              alt="High resolution school preview" 
              className="w-full h-auto object-contain max-h-[80vh]"
            />
            <div className="p-4 bg-white border-t-2 border-[#0B1B3D] font-black uppercase text-center text-xs text-[#0B1B3D] tracking-wider">
              Arihant Academy Sr. Sec. School Campus Tour Preview
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
