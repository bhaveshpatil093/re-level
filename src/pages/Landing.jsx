import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Languages, Volume2, BookOpen, Brain, GraduationCap, Camera, Settings, CheckCircle2, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { GradientBlob } from '../components/ui/GradientBlob'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "10th Grade Student",
    quote: "I used to spend hours re-reading my AP History textbook and still felt completely lost. Re-Level breaks down those impossible paragraphs into language I actually understand. It saved my grade!",
    avatar: "S"
  },
  {
    name: "David Chen",
    role: "ESL Learner",
    quote: "As someone learning English, standard translators often give me weird, literal translations that don't make sense. This tool rewrites the text so it's simple but keeps the true meaning. It is amazing.",
    avatar: "D"
  },
  {
    name: "Marcus Williams",
    role: "College Freshman",
    quote: "College reading assignments are incredibly dense. Being able to take a huge wall of text and get a bulleted, simplified explanation in seconds has been a total game changer for my study sessions.",
    avatar: "M"
  }
];

export default function Landing() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

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

        {/* Features Section - Your Toolkit */}
        <section className="max-w-[1100px] mx-auto w-full px-4 pt-32 pb-16 relative z-10">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center bg-teal-50 text-teal-600 px-5 py-2 rounded-full font-semibold text-sm mb-6 border border-teal-100 shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Your toolkit
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-navy mb-8 tracking-tight"
            >
              Everything you need to master any text
            </motion.h2>
            
            {/* Tab Pill Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-6"
            >
              {['Translate', 'Simplify', 'Re-explain', 'Read Aloud', 'Save & Track'].map((tab, idx) => (
                <button key={tab} className={`px-6 py-3 rounded-full text-[15px] font-medium transition-colors ${idx === 1 ? 'bg-navy text-white shadow-md' : 'bg-white text-slate-600 hover:text-navy hover:bg-slate-50 border border-slate-200'}`}>
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Interactive Mockup Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgb(0,0,0,0.05)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row mt-12"
          >
            
            {/* Left Panel: Original Dense Text */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-slate-50/50 border-b lg:border-b-0 lg:border-r border-slate-100 relative flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300"></div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Original Text</div>
              </div>
              
              <div className="flex-1 font-serif text-lg leading-loose text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
                <p>
                  "The mitochondria are double-membrane-bound organelles found in most eukaryotic organisms. They generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy. A mitochondrion contains outer and inner membranes composed of phospholipid bilayers and proteins. The two membranes have different properties."
                </p>
              </div>
            </div>

            {/* Right Panel: Re-Level Output */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-white relative flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-teal-500">
                  <Sparkles className="w-4 h-4" />
                  <div className="text-xs font-bold uppercase tracking-widest">Re-Leveled</div>
                </div>
                
                {/* Simple Reading Level Slider */}
                <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-400">K-5</span>
                  <div className="w-24 bg-slate-200 h-1.5 rounded-full relative">
                    <div className="absolute left-0 top-0 h-full bg-[#3B82F6] rounded-full w-[60%]"></div>
                    <div className="absolute left-[60%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-2 border-[#3B82F6] rounded-full shadow-sm"></div>
                  </div>
                  <span className="text-[11px] font-semibold text-navy">Grade 8</span>
                </div>
              </div>
              
              <div className="flex-1 font-sans text-lg leading-relaxed text-slate-800 bg-blue-50/40 p-6 rounded-2xl border border-blue-100/50">
                <p className="mb-5">
                  Think of mitochondria as the tiny power plants inside your body's cells. They take in nutrients and create a special energy (called ATP) that the cell needs to work.
                </p>
                <p>
                  Each of these power plants has two walls—an inner one and an outer one—made of fats and proteins. Both walls have completely different jobs!
                </p>
              </div>
            </div>

          </motion.div>
        </section>

        {/* Who We Help Section */}
        <section className="max-w-[1100px] mx-auto w-full px-4 pt-24 pb-32 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-semibold text-sm mb-6 border border-blue-100 shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              For every learner
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-navy mb-6 tracking-tight"
            >
              Who Re-Level is for
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'ESL Students',
                desc: 'Move past literal, dense translations. Get content delivered in simplified English that helps you learn naturally without losing the context.',
                icon: <Languages className="w-6 h-6 text-indigo-500" />,
                color: 'bg-indigo-50 border-indigo-100',
              },
              {
                title: 'Reading-Level Gaps',
                desc: 'Keep up in mainstream classrooms. Adjust any complex textbook passage or worksheet down to a reading level that you are comfortable with.',
                icon: <BookOpen className="w-6 h-6 text-teal-500" />,
                color: 'bg-teal-50 border-teal-100',
              },
              {
                title: 'Focus & Attention',
                desc: 'Break down overwhelming walls of text. Get information re-explained in shorter, punchy chunks that are much easier to process and digest.',
                icon: <Brain className="w-6 h-6 text-amber-500" />,
                color: 'bg-amber-50 border-amber-100',
              },
              {
                title: 'Home & Self-Learners',
                desc: 'Learn independently without waiting for a tutor. Instantly clarify concepts you are stuck on, as if a teacher is sitting right next to you.',
                icon: <GraduationCap className="w-6 h-6 text-rose-500" />,
                color: 'bg-rose-50 border-rose-100',
              }
            ].map((card, idx) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${card.color}`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-navy mb-3">{card.title}</h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="max-w-[1100px] mx-auto w-full px-4 pt-16 pb-32 relative z-10">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-navy mb-4 tracking-tight"
            >
              How it works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-500 max-w-2xl mx-auto"
            >
              Three simple steps to break down any complex text.
            </motion.p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Thin connecting line for Desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-slate-200 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
              {/* Step 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center relative z-10 mb-6">
                  <Camera className="w-8 h-8 text-blue-500" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shadow-sm border-[3px] border-white">1</div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 px-4">Paste or snap a photo of any text</h3>
              </motion.div>

              {/* Step 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center relative z-10 mb-6">
                  <Settings className="w-8 h-8 text-teal-500" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold shadow-sm border-[3px] border-white">2</div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-3 px-4">Pick your language and reading level</h3>
              </motion.div>

              {/* Step 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center text-center relative"
              >
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-sm flex items-center justify-center relative z-10 mb-6">
                  <CheckCircle2 className="w-8 h-8 text-purple-500" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold shadow-sm border-[3px] border-white">3</div>
                </div>
                <h3 className="text-xl font-bold text-navy mb-2 px-2">Get an explanation you actually understand</h3>
                <p className="text-slate-500 text-[15px] px-2">Read it, hear it, or ask for it a different way.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel Section */}
        <section className="max-w-[1100px] mx-auto w-full px-4 pt-16 pb-32 relative z-10">
          <div className="bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-3xl rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 md:p-16">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center bg-rose-50 text-rose-600 px-5 py-2 rounded-full font-semibold text-sm mb-6 border border-rose-100 shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Testimonials
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-navy tracking-tight"
              >
                What students are saying
              </motion.h2>
            </div>

            <div className="max-w-4xl mx-auto relative">
              <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-xl border border-slate-100 relative text-center min-h-[350px] flex flex-col justify-center">
                <div className="flex justify-center gap-1.5 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl font-medium text-slate-700 leading-relaxed mb-10 italic">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                
                <div className="flex flex-col items-center justify-center mt-auto">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md border-4 border-white">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <h4 className="text-lg font-bold text-navy">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-slate-500 text-[15px]">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevTestimonial}
                className="absolute top-1/2 -translate-y-1/2 -left-5 md:-left-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-50 transition-colors border border-slate-100 text-navy z-20"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="absolute top-1/2 -translate-y-1/2 -right-5 md:-right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-slate-50 transition-colors border border-slate-100 text-navy z-20"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentTestimonial === idx ? 'bg-navy' : 'bg-slate-300 hover:bg-slate-400'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
