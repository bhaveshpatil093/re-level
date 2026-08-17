import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FileQuestion, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4 py-32 relative overflow-hidden">
        {/* Decorative Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[100px] opacity-40 z-0 pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-lg w-full text-center flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-white shadow-lg border border-slate-100 rounded-3xl flex items-center justify-center mb-8 rotate-3">
            <FileQuestion className="w-10 h-10 text-slate-300" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-extrabold text-navy tracking-tight mb-4">
            404
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-bold text-slate-700 mb-6">
            Page not found
          </h2>
          
          <p className="text-slate-500 text-lg leading-relaxed mb-10 max-w-sm">
            Looks like you've wandered into an uncharted chapter. The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-navy text-white px-8 py-3.5 rounded-full font-bold shadow-sm hover:shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Homepage
          </Link>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
