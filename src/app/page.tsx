"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Database, Server, Cloud, Code, Box, Layers, Globe, Terminal, Cpu, Heart, Star, Eye, X, ExternalLink, Sparkles } from "lucide-react";

// --- DATA ---
const lessons = [
  { title: "REST API", icon: <Globe className="w-8 h-8" />, desc: "The standard architectural style for communication between computer systems.", ref: "Understanding REST APIs felt like learning the grammar of the internet. It made me realize that applications aren't just isolated islands; they're constantly having conversations." },
  { title: "Map Reduce", icon: <Database className="w-8 h-8" />, desc: "A programming model for processing big data sets with a parallel algorithm.", ref: "Breaking a massive task into tiny pieces was a lightbulb moment. It taught me that we don't always need a faster computer; sometimes we just need a smarter way to divide the work." },
  { title: "AWS / VM", icon: <Server className="w-8 h-8" />, desc: "On-demand cloud computing platforms and virtual servers.", ref: "Setting up an EC2 instance felt like renting a computer in the sky. I realized I don't need expensive hardware to build enterprise-grade apps." },
  { title: "Cloud Native", icon: <Cloud className="w-8 h-8" />, desc: "Building applications specifically to exist and run in the cloud.", ref: "This shifted my mindset from 'migrating' to 'inhabiting' the cloud. It's not just about where the code lives, but how it's built." },
  { title: "DevOps", icon: <Code className="w-8 h-8" />, desc: "Practices combining software development (Dev) and IT operations (Ops).", ref: "I used to think coding was just writing logic, but DevOps taught me that deployment is just as creative. It's about empathy." },
  { title: "Docker", icon: <Box className="w-8 h-8" />, desc: "Platform for developing, shipping, and running apps in containers.", ref: "Docker solved the 'it works on my machine' headache. Packaging everything into one box gave me confidence to run my project anywhere." },
  { title: "Virtualization", icon: <Layers className="w-8 h-8" />, desc: "Comparing traditional VMs against lightweight Containers.", ref: "While VMs are like separate houses, containers are like apartments—sharing resources but still private and efficient." },
  { title: "Kubernetes", icon: <Cpu className="w-8 h-8" />, desc: "Automating deployment, scaling, and management of containerized apps.", ref: "If Docker is the musician, Kubernetes is the conductor. Seeing it self-heal crashed containers showed me true reliability." },
  { title: "Terraform", icon: <Terminal className="w-8 h-8" />, desc: "Infrastructure as Code tool to build infrastructure safely.", ref: "Writing code to build infrastructure is a game changer. I can version control my server setup just like my application code." }
];

const assignments = [
  { id: 1, title: "Assignment #1 - REST API", subtitle: "Testing CRUD via Postman", file: "Gamboa_Assignment 1 - REST API.pdf", content: "I explored fundamentals of CRUD operations using Postman. It wasn't just about sending requests; it was about verifying how the backend handles data." },
  { id: 2, title: "Assignment #2 - AWS Guide", subtitle: "How-To Guide for Beginners", file: "GAMBOA_HOW-TO-DOCUMENT.pdf", content: "Creating a guide for AWS EC2 taught me that technical skill is useless if you can't explain it. Good documentation is truly an act of empathy." },
  { id: 3, title: "Assignment #3 - Docker Plan", subtitle: "Student Study Plan", file: "FaithGabrielle_Gamboa_DC.pdf", content: "Mapping out a study plan for Docker forced me to look at the big picture. I realized that learning a complex tool like Docker requires a structured approach." },
  { id: 4, title: "Assignment #4 - Narrative", subtitle: "Virtualization vs. Containers", file: "Gamboa_Assignment # 4.pdf", content: "I learned that while the cloud is powerful, the 'Edge' (IoT) has resource limits that make VMs too heavy. Containerization is a necessity for the future." },
  { id: 5, title: "Assignment #5 - Kubernetes", subtitle: "Home Lab with Minikube", file: "GAMBOA_Assignment# 5 - Kubernetes Home Lab Activity.pdf", content: "Deploying WordPress made 'Pods' and 'Services' real. Troubleshooting why a pod wasn't starting taught me patience and the importance of checking logs." }
];

// --- COMPONENTS ---

// Navigation Bar with enhanced glow
const NavBar = () => (
  <motion.nav 
    initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 1 }}
    className="fixed top-0 inset-x-0 z-50 flex justify-center pt-6 px-4"
  >
    <div className="glass-panel rounded-full px-8 py-3 flex items-center gap-8 shadow-[0_8px_32px_rgba(139,92,246,0.4),0_0_60px_rgba(236,72,153,0.3)]">
      {["Home", "Journey", "Works"].map((item) => (
        <a 
          key={item} 
          href={`#${item.toLowerCase()}`} 
          className="font-bubbly font-bold text-lg text-indigo-900 hover:text-pink-500 transition-all hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
        >
          {item}
        </a>
      ))}
    </div>
  </motion.nav>
);

// Enhanced Star Field
const StarField = () => {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 10 + 3,
      delay: Math.random() * 4
    }));
    setStars(arr);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((s) => (
        <Star 
          key={s.id}
          className="absolute text-white animate-twinkle"
          fill="white"
          style={{ 
            left: s.left, 
            top: s.top, 
            width: s.size, 
            height: s.size, 
            animationDelay: `${s.delay}s`,
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))'
          }} 
        />
      ))}
    </div>
  );
};

// PDF Preview Modal
const PdfModal = ({ file, isOpen, onClose }: any) => {
  if (!isOpen) return null;
  const fileUrl = file ? `/${encodeURIComponent(file)}` : "";

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-950/70 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, y: 50 }}
          className="bg-white w-full max-w-5xl h-[85vh] rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-pink-100 p-4 flex justify-between items-center border-b border-pink-200">
            <h3 className="font-bubbly font-bold text-indigo-900 truncate pr-4 text-lg">
              Previewing: {file}
            </h3>
            <div className="flex gap-2">
              <a 
                href={fileUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-xs font-bold transition-colors"
              >
                <ExternalLink size={14} /> Open in New Tab
              </a>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-red-100 rounded-full text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-slate-100 relative">
             {fileUrl && <iframe src={fileUrl} className="w-full h-full border-none" title="PDF Preview" />}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 -z-10 gap-2">
                <FileText size={48} />
                <p className="font-soft">Loading Document...</p>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function Portfolio() {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  return (
    <main className="relative min-h-screen font-soft pb-20 overflow-x-hidden">
      
      <NavBar />
      <PdfModal file={selectedPdf} isOpen={!!selectedPdf} onClose={() => setSelectedPdf(null)} />

      {/* --- ENHANCED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <StarField />
        
        {/* Cloud 1 - Top Left */}
        <motion.div 
          animate={{ 
            x: [-40, 40, -40],
            y: [-20, 20, -20],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[8%] left-[3%] opacity-80"
        >
           <Cloud size={280} className="text-white blur-3xl" fill="white" style={{ filter: 'drop-shadow(0 0 60px rgba(255,255,255,0.9))' }} />
        </motion.div>
        
        {/* Cloud 2 - Right Middle */}
        <motion.div 
          animate={{ 
            x: [50, -50, 50],
            y: [15, -15, 15],
            scale: [1, 1.15, 1]
          }} 
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[45%] right-[2%] opacity-70"
        >
           <Cloud size={400} className="text-pink-200 blur-[80px]" fill="white" style={{ filter: 'drop-shadow(0 0 80px rgba(236,72,153,0.7))' }} />
        </motion.div>
        
        {/* Cloud 3 - Bottom Left */}
        <motion.div 
          animate={{ 
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            scale: [1, 1.08, 1]
          }} 
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-[12%] left-[25%] opacity-60"
        >
           <Cloud size={240} className="text-purple-200 blur-3xl" fill="white" style={{ filter: 'drop-shadow(0 0 70px rgba(168,85,247,0.8))' }} />
        </motion.div>
        
        {/* Cloud 4 - Top Right */}
        <motion.div 
          animate={{ 
            x: [-30, 30, -30],
            y: [20, -20, 20],
            scale: [1, 1.12, 1]
          }} 
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[25%] right-[15%] opacity-50"
        >
           <Cloud size={200} className="text-indigo-200 blur-3xl" fill="white" style={{ filter: 'drop-shadow(0 0 50px rgba(129,140,248,0.7))' }} />
        </motion.div>
        
        {/* Cloud 5 - Bottom Right */}
        <motion.div 
          animate={{ 
            x: [35, -35, 35],
            y: [-18, 18, -18],
            scale: [1, 1.1, 1]
          }} 
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-[25%] right-[8%] opacity-55"
        >
           <Cloud size={260} className="text-pink-100 blur-[70px]" fill="white" style={{ filter: 'drop-shadow(0 0 65px rgba(251,207,232,0.8))' }} />
        </motion.div>

        {/* Cloud 6 - Center */}
        <motion.div 
          animate={{ 
            x: [-20, 20, -20],
            y: [-25, 25, -25],
            scale: [1, 1.05, 1]
          }} 
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[60%] left-[10%] opacity-45"
        >
           <Cloud size={220} className="text-purple-100 blur-3xl" fill="white" style={{ filter: 'drop-shadow(0 0 55px rgba(196,181,253,0.7))' }} />
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative"
        >
          {/* Enhanced Badge with Pulse */}
          <motion.div 
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(236,72,153,0.4)',
                '0 0 40px rgba(236,72,153,0.7)',
                '0 0 20px rgba(236,72,153,0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/50 border-2 border-white backdrop-blur-md mb-6"
          >
            <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" style={{ filter: 'drop-shadow(0 0 8px rgba(236,72,153,1))' }} />
            <span className="text-sm font-bold tracking-[0.2em] text-indigo-900 uppercase font-bubbly">Welcome</span>
          </motion.div>

          {/* Title with Enhanced Glow */}
          <h1 className="font-bubbly font-black text-6xl md:text-9xl tracking-tight mb-2 leading-tight text-white" style={{ textShadow: '4px 4px 0px #fff, 0 0 30px rgba(236,72,153,0.8), 0 0 60px rgba(168,85,247,0.6)' }}>
            CLOUD
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-5xl md:text-8xl mt-1">
              COMPUTING
            </span>
          </h1>

          {/* Name */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col items-center gap-3"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 font-bubbly tracking-wide" style={{ textShadow: '2px 2px 0px #fff, 0 0 20px rgba(168,85,247,0.5)' }}>
              Faith Gabrielle Gamboa
            </h2>
            <motion.div 
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-2 rounded-full bg-white" 
              style={{ boxShadow: '0 0 20px rgba(255,255,255,0.9)' }}
            />
            <p className="text-indigo-800 uppercase tracking-[0.3em] text-lg font-bold mt-2 font-bubbly">IV-BCSAD</p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- JOURNEY SECTION --- */}
      <section id="journey" className="relative z-10 py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-bubbly text-5xl md:text-6xl font-bold mb-20 text-center text-indigo-900"
            style={{ textShadow: '3px 3px 0px #fff, 0 0 25px rgba(236,72,153,0.7), 0 0 50px rgba(168,85,247,0.5)' }}
          >
            My Learning Journey
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, delay: index * 0.3, repeat: Infinity, ease: "easeInOut" }}
                  className="glass-panel rounded-[2.5rem] p-8 h-full flex flex-col hover:bg-white/80 transition-all duration-300 group"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(139,92,246,0.25), 0 0 60px rgba(236,72,153,0.2), inset 0 0 30px rgba(255,255,255,0.6)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="p-4 bg-gradient-to-br from-white to-pink-50 rounded-2xl text-pink-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]"
                    >
                      {lesson.icon}
                    </motion.div>
                    <h3 className="font-bubbly font-bold text-xl text-indigo-900 group-hover:text-purple-600 transition-colors">{lesson.title}</h3>
                  </div>
                  
                  <p className="text-base text-indigo-800 leading-relaxed font-bold mb-6 font-soft">
                    {lesson.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-indigo-100">
                    <p className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-2 font-bubbly">My Reflection</p>
                    <p className="text-sm text-indigo-900/80 italic font-medium">"{lesson.ref}"</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ASSIGNMENTS SECTION --- */}
      <section id="works" className="relative z-10 py-32 px-6 md:px-12 bg-white/20 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-bubbly text-5xl font-bold mb-4 text-indigo-900" style={{ textShadow: '3px 3px 0px #fff, 0 0 25px rgba(236,72,153,0.7), 0 0 50px rgba(168,85,247,0.5)' }}>
              Assignments
            </h2>
            <p className="text-indigo-800 font-soft text-lg font-bold">Click on a card to preview the document.</p>
          </motion.div>

          <div className="space-y-8">
            {assignments.map((assign, index) => (
              <motion.div
                key={assign.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, delay: index * 0.5, repeat: Infinity, ease: "easeInOut" }}
                  onClick={() => setSelectedPdf(assign.file)}
                  className="glass-panel rounded-[3rem] p-8 md:p-10 relative overflow-hidden cursor-pointer group hover:bg-white/90 transition-all duration-300"
                  style={{ 
                    boxShadow: '0 8px 32px rgba(139,92,246,0.3), 0 0 80px rgba(236,72,153,0.25), inset 0 0 30px rgba(255,255,255,0.6)'
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    
                    {/* Visual Preview */}
                    <div className="w-full md:w-56 shrink-0 flex flex-col gap-3 group-hover:scale-105 transition-transform">
                      <motion.div 
                        whileHover={{ rotate: 2 }}
                        className="bg-white rounded-3xl border-2 border-dashed border-purple-200 aspect-[3/4] flex flex-col items-center justify-center text-purple-400 shadow-lg relative overflow-hidden group-hover:border-purple-400 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/50" />
                        <FileText size={48} className="mb-2 relative z-10" />
                        <span className="text-[12px] font-bold uppercase text-purple-600 font-bubbly relative z-10">PREVIEW PDF</span>
                      </motion.div>
                      <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg group-hover:bg-pink-500 group-hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all">
                        <Eye size={16} /> View Document
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                       <div className="inline-block px-4 py-1 bg-pink-100 text-pink-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-4 shadow-sm font-bubbly">
                         Assignment 0{assign.id}
                       </div>
                       <h3 className="font-bubbly font-bold text-3xl text-indigo-900 mb-2 group-hover:text-purple-600 transition-colors">{assign.title}</h3>
                       <p className="text-pink-500 font-bold text-base mb-4 font-bubbly flex items-center justify-center md:justify-start gap-2">
                         <Sparkles size={16} /> {assign.subtitle}
                       </p>
                       <p className="text-indigo-900 leading-relaxed font-bold text-lg">
                         {assign.content}
                       </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-24 text-center">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex justify-center mb-6"
        >
          <Cloud className="w-16 h-16 text-white fill-white" style={{ filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.9))' }} />
        </motion.div>
        <p className="text-indigo-900 font-bubbly text-base font-bold">
          Created with <span className="text-pink-500 text-xl">♥</span> by Faith Gabrielle Gamboa
        </p>
      </footer>
    </main>
  );
}