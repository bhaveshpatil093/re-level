import { motion } from 'framer-motion'
import { Sparkles, Languages, Volume2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { GradientBlob } from '../components/ui/GradientBlob'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Navbar />
      
      <main className="relative pt-32 pb-20 px-4 overflow-hidden z-0">
        <GradientBlob className="w-[800px] h-[800px] top-1/4 left-1/2 -translate-x-1/2" />
        
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
          
          {/* Left Side - Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center mb-10 shadow-lg shadow-primary-500/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight mb-6 text-navy leading-[1.15]">
              Every student deserves to understand, <br className="hidden xl:block" />
              <span className="relative whitespace-nowrap inline-block mt-2">
                <span className="absolute inset-0 bg-yellow-300 rounded-lg -rotate-1 scale-105"></span>
                <span className="relative z-10">in their own words</span>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-xl">
              Instantly translate complex text into simple, easy-to-read language that matches your exact reading level.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/app" variant="solid" className="px-8 py-4 text-[17px]">
                Try it free
              </Button>
              <Link 
                to="/demo" 
                className="bg-navy text-white hover:bg-slate-800 transition-colors px-8 py-4 rounded-full text-[17px] font-medium shadow-md"
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
            className="relative w-full min-h-[500px] lg:min-h-full rounded-[2.5rem] bg-navy overflow-visible shadow-2xl flex items-center justify-center border-4 border-white/10"
          >
            {/* Abstract UI Representation */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-navy rounded-[2.3rem] overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500 via-transparent to-transparent blur-3xl" />
            </div>
            
            <div className="relative z-10 w-3/4 max-w-md bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 flex flex-col gap-6 shadow-2xl">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center">
                  <Languages className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="h-2.5 w-1/3 bg-white/40 rounded-full mb-2" />
                  <div className="h-2 w-1/4 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-3 w-full bg-white/20 rounded-full" />
                <div className="h-3 w-5/6 bg-white/20 rounded-full" />
                <div className="h-3 w-4/6 bg-white/20 rounded-full" />
                <div className="h-3 w-3/4 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute top-[15%] -left-8 md:-left-12 z-20"
            >
              <div className="bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-full shadow-xl font-semibold text-navy text-[15px] flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-accent-500" /> 
                Simplify
              </div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
              className="absolute top-[45%] -right-6 md:-right-10 z-20"
            >
              <div className="bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-full shadow-xl font-semibold text-navy text-[15px] flex items-center gap-2.5">
                <Languages className="w-5 h-5 text-primary-500" />
                Translate
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} 
              className="absolute bottom-[20%] left-4 md:-left-6 z-20"
            >
              <div className="bg-white/90 backdrop-blur-md px-6 py-3.5 rounded-full shadow-xl font-semibold text-navy text-[15px] flex items-center gap-2.5">
                <Volume2 className="w-5 h-5 text-purple-500" />
                Read aloud
              </div>
            </motion.div>
          </motion.div>

        </div>
      </main>
      
      <Footer />
    </div>
  )
}
