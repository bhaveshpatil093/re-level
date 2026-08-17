import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Settings2, Sparkles, X, ChevronRight, ChevronLeft } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    title: "Start with any text",
    description: "Paste a difficult passage, upload a document, or simply snap a photo of your textbook.",
    icon: <Camera className="w-12 h-12 text-blue-500" />,
    color: "bg-blue-50",
    border: "border-blue-100"
  },
  {
    id: 2,
    title: "Choose your level",
    description: "Select your exact reading level (Grade 3 to 12) and pick a language to translate the text into.",
    icon: <Settings2 className="w-12 h-12 text-teal-500" />,
    color: "bg-teal-50",
    border: "border-teal-100"
  },
  {
    id: 3,
    title: "Read, hear, or re-ask",
    description: "Get a perfectly re-leveled explanation. Listen to it out loud, or ask us to explain it a different way!",
    icon: <Sparkles className="w-12 h-12 text-amber-500" />,
    color: "bg-amber-50",
    border: "border-amber-100"
  }
];

export function OnboardingModal({ isOpen, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden z-10"
      >
        <button 
          onClick={onClose}
          aria-label="Close onboarding"
          className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center text-center mt-4"
            >
              <div className={`w-28 h-28 ${SLIDES[currentSlide].color} ${SLIDES[currentSlide].border} border-2 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm rotate-3 transition-colors`}>
                {SLIDES[currentSlide].icon}
              </div>
              
              <h3 className="text-2xl font-bold text-navy mb-3">{SLIDES[currentSlide].title}</h3>
              <p className="text-slate-500 leading-relaxed px-2">
                {SLIDES[currentSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer / Controls */}
        <div className="px-8 pb-8 pt-4 flex flex-col gap-6">
          {/* Dots */}
          <div className="flex justify-center gap-2">
            {SLIDES.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-2">
            <button 
              onClick={onClose}
              className="text-slate-500 hover:text-slate-700 font-semibold text-[15px] px-4 py-2 transition-colors min-h-[44px]"
            >
              Skip
            </button>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                aria-label="Previous slide"
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="px-6 h-12 flex items-center justify-center gap-2 rounded-full bg-navy text-white font-bold hover:bg-slate-800 shadow-sm transition-all active:scale-95"
              >
                {currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}
                {currentSlide !== SLIDES.length - 1 && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
