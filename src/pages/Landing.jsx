import { motion } from 'framer-motion'
import { Sparkles, Languages, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { GradientBlob } from '../components/ui/GradientBlob'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans">
      <Navbar />
      
      <main className="relative pt-28 pb-16 px-4 overflow-hidden z-0">
        <GradientBlob className="w-[800px] h-[800px] top-1/4 left-1/2 -translate-x-1/2" />
        
        <div className="max-w-[1100px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          
          {/* Left Side - Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-300 to-cyan-400 flex items-center justify-center mb-8 shadow-sm shadow-cyan-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            
            <h1 className="text-4xl lg:text-[46px] font-bold tracking-tight mb-5 text-navy leading-[1.2]">
              Every student deserves to understand, <br className="hidden xl:block" />
              <span className="relative whitespace-nowrap inline-block mt-1">
                <span className="absolute inset-0 bg-[#FFEA00] rounded -rotate-1 scale-105 z-0" style={{ transformOrigin: 'center left' }}></span>
                <span className="relative z-10 px-1">in their own words</span>
              </span>
            </h1>
            
            <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-lg">
              Instantly translate complex text into simple, easy-to-read language that matches your exact reading level.
            </p>
            
            <div className="flex flex-wrap items-center gap-3">
              <Button href="/app" variant="solid" className="px-6 py-3 text-[15px]">
                Try it free
              </Button>
              <Link 
                to="/demo" 
                className="bg-navy text-white hover:bg-slate-800 transition-colors px-6 py-3 rounded-full text-[15px] font-medium shadow-sm"
              >
                Free Assessment
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Mock App Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative w-full h-full min-h-[400px] rounded-[2rem] bg-[#0F172A] shadow-xl flex items-center justify-center"
          >
            {/* Abstract UI Representation */}
            <div className="absolute inset-0 bg-[#0F172A] rounded-[2rem] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent blur-2xl" />
            </div>
            
            <div className="relative z-10 w-4/5 max-w-sm bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col gap-5 shadow-2xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                  <Languages className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-2 w-1/3 bg-white/40 rounded-full mb-2" />
                  <div className="h-1.5 w-1/4 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/20 rounded-full" />
                <div className="h-2 w-5/6 bg-white/20 rounded-full" />
                <div className="h-2 w-4/6 bg-white/20 rounded-full" />
                <div className="h-2 w-3/4 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -8, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute top-[20%] -left-6 md:-left-8 z-20"
            >
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg font-semibold text-navy text-sm flex items-center gap-2 border border-slate-100/50">
                <Sparkles className="w-4 h-4 text-teal-500" /> 
                Simplify
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
              className="absolute top-[50%] -right-4 md:-right-6 z-20"
            >
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg font-semibold text-navy text-sm flex items-center gap-2 border border-slate-100/50">
                <Languages className="w-4 h-4 text-blue-500" />
                Translate
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
              className="absolute bottom-[20%] left-6 md:left-4 z-20"
            >
              <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg font-semibold text-navy text-sm flex items-center gap-2 border border-slate-100/50">
                <Volume2 className="w-4 h-4 text-purple-500" />
                Read aloud
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Level Selector Strip (Decorative) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-[1100px] mx-auto w-full mt-8 bg-white rounded-[2rem] md:rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 py-3.5 px-6 md:px-10 flex flex-wrap items-center justify-center gap-4 md:gap-10 relative z-10"
        >
          {['Grade 6', 'Grade 8', 'Grade 10'].map(level => (
            <span key={level} className="text-[15px] font-medium text-slate-600 hover:text-navy transition-colors whitespace-nowrap">
              {level}
            </span>
          ))}
          
          <div className="bg-[#3B82F6] text-white px-8 py-2.5 rounded-full text-[15px] font-medium shadow-sm whitespace-nowrap">
            Reading Levels
          </div>
          
          {['ESL Beginner', 'ESL Intermediate', 'ESL Advanced'].map(level => (
            <span key={level} className="text-[15px] font-medium text-slate-600 hover:text-navy transition-colors whitespace-nowrap">
              {level}
            </span>
          ))}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}
