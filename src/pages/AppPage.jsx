import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { OnboardingModal } from '../components/OnboardingModal';
import { DiagnosticModal } from '../components/DiagnosticModal';
import { useRelevel, RelevelProvider } from '../context/RelevelContext';
import { History, Plus, ChevronLeft, ChevronRight, FileText, Settings, LogOut, UploadCloud, Image as ImageIcon, X, Sparkles, ChevronDown, Search, RefreshCw, Play, Pause, Trash2, AlertCircle, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SAMPLE_TEXTS = [
  {
    title: "Science",
    text: "Mitosis is a process of nuclear division in eukaryotic cells that occurs when a parent cell divides to produce two identical daughter cells. During prophase, the chromatin condenses into distinct chromosomes. The nuclear envelope breaks down, and spindle fibers form at opposite poles of the cell."
  },
  {
    title: "History",
    text: "The French Revolution was a period of radical political and societal change in France that began with the Estates General of 1789 and ended with the formation of the French Consulate in November 1799. Many of its ideas are considered fundamental principles of liberal democracy."
  },
  {
    title: "Literature",
    text: "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles And by opposing end them."
  }
];

function AppPageContent() {
  const {
    LANGUAGES,
    appState, setAppState,
    inputText, setInputText,
    inputError, setInputError,
    uploadedImage, setUploadedImage,
    isExtractingText,
    ocrProgress,
    showDiagnosticModal,
    selectedLang, setSelectedLang,
    gradeLevel, setGradeLevel,
    currentExplanation,
    currentModel,
    explanationHistory,
    isRegenerating,
    fallbackToast,
    historyItems,
    handleRelevel,
    handleExplainDifferently,
    handleLoadHistory,
    handleNewRelevel,
    processImageOCR
  } = useRelevel();

  // Local UI states
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [isDragging, setIsDragging] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  // Controls local state
  const [langSearch, setLangSearch] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const [showHistory, setShowHistory] = useState(false);
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  
  const utteranceRef = useRef(null);

  const playAudio = () => {
    if (!currentExplanation) return;
    
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }
    
    if (window.speechSynthesis.speaking) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentExplanation);
    
    // Find voice matching the language
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(selectedLang.code.toLowerCase()));
    
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    } else {
      utterance.lang = selectedLang.code;
    }
    
    utterance.rate = playbackSpeed;
    
    utterance.onstart = () => {
      setIsAudioLoading(false);
      setIsPlaying(true);
    };
    
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const progress = (event.charIndex / currentExplanation.length) * 100;
        setPlaybackProgress(progress);
      }
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setPlaybackProgress(100); // Fill bar at the end
      setTimeout(() => setPlaybackProgress(0), 1000);
    };
    
    utterance.onerror = () => {
      setIsAudioLoading(false);
      setIsPlaying(false);
    };

    utteranceRef.current = utterance;
    setIsAudioLoading(true);
    window.speechSynthesis.speak(utterance);
  };

  const pauseAudio = () => {
    window.speechSynthesis.pause();
    setIsPlaying(false);
  };
  
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setPlaybackProgress(0);
      // Let the user click play again, restarting on speed change is safest across browsers
    }
  };

  // Ensure voices are loaded (some browsers need this triggered)
  useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }, []);

  // Handlers moved to RelevelContext
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLangs = LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()));

  // OCR handled in RelevelContext
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadedImage(URL.createObjectURL(file));
      processImageOCR(file);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedImage(URL.createObjectURL(file));
      processImageOCR(file);
    }
  };

  // History loaded via context
  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans flex flex-col h-screen overflow-hidden">
      <Navbar isApp={true} />
      
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <div className={`
          absolute md:relative z-40 inset-y-0 left-0
          ${sidebarOpen ? 'translate-x-0 w-[280px] md:w-64' : '-translate-x-full w-[280px] md:translate-x-0 md:w-0'}
          bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col shrink-0 h-full shadow-2xl md:shadow-none
        `}>
          <div className="p-4 flex items-center justify-between shrink-0">
            <button 
              onClick={() => {
                handleNewRelevel();
                if (window.innerWidth < 768) setSidebarOpen(false);
              }}
              className="flex items-center gap-2 bg-navy text-white px-4 py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors shadow-sm active:scale-95 w-full justify-center min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              New Re-Level
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="md:hidden ml-2 p-3 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden px-4 pb-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pl-1">
              Recent History
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
              {historyItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    handleLoadHistory(item);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className="relative group w-full text-left p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 cursor-pointer shadow-sm hover:shadow"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-navy text-sm truncate pr-6 group-hover:text-blue-600 transition-colors">{item.title}</span>
                    <span className="text-[11px] font-semibold text-slate-500 shrink-0 mt-0.5">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                    {item.snippet}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">Gr {item.grade}</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 uppercase flex items-center gap-1">{item.lang.flag} {item.lang.code}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100 space-y-2 shrink-0">
              <button className="flex items-center gap-3 w-full p-2 text-sm font-medium text-slate-600 hover:text-navy hover:bg-slate-50 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-slate-400" />
                Settings
              </button>
              <button className="flex items-center gap-3 w-full p-2 text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-500" />
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-slate-50/50 flex flex-col relative h-full overflow-hidden">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white shrink-0 shadow-sm z-10">
             <button 
               onClick={() => setSidebarOpen(true)} 
               className="p-3 -ml-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
               aria-label="Open sidebar"
             >
                <Menu className="w-6 h-6" />
             </button>
             <span className="font-bold text-navy text-[15px]">Workspace</span>
             <div className="w-6"></div> {/* Spacer for centering */}
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 no-scrollbar">
            
            {appState === "input" && (
              <div className="max-w-3xl mx-auto w-full pt-4 md:pt-8 lg:pt-12 pb-20">
                
              {historyItems.length === 0 && (
                <div className="mb-10 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-[2.5rem] border border-blue-100/50 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-40 translate-x-1/2 -translate-y-1/2"></div>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-sm border border-blue-50 relative z-10">
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-2 relative z-10">Welcome to Re-Level!</h3>
                  <p className="text-slate-500 text-[15px] text-center max-w-sm relative z-10 leading-relaxed">
                    Paste your first difficult passage, or snap a photo of your textbook below to get started.
                  </p>
                </div>
              )}
                
              <div className="mb-8 text-center md:text-left">
                <h3 className="text-3xl font-bold text-navy mb-3">What are we learning today?</h3>
                <p className="text-slate-500 text-[15px]">
                  Drop a photo of your textbook page, upload a file, or paste your complex text below.
                </p>
              </div>
              
              {/* Controls Bar */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                
                {/* Language Selector */}
                <div className="relative w-full md:w-[280px] z-20" ref={dropdownRef}>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">Translate To</div>
                  <button 
                    onClick={() => setLangOpen(!langOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={langOpen}
                    aria-label="Select target language"
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 h-[50px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl" aria-hidden="true">{selectedLang.flag}</span>
                      <span className="font-medium text-navy text-[15px]">{selectedLang.name}</span>
                    </div>
                    <ChevronDown aria-hidden="true" className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {langOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-30"
                      >
                        <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                          <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                              type="text" 
                              placeholder="Search language..." 
                              value={langSearch}
                              onChange={(e) => setLangSearch(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-[15px] focus:outline-none focus:border-blue-300 transition-colors shadow-sm"
                            />
                          </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto p-1 no-scrollbar">
                          {filteredLangs.length > 0 ? filteredLangs.map(lang => (
                            <button
                              key={lang.code}
                              onClick={() => { setSelectedLang(lang); setLangOpen(false); setLangSearch(""); }}
                              className={`w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 hover:bg-slate-50 transition-colors ${selectedLang.code === lang.code ? 'bg-blue-50/50 text-blue-600' : 'text-slate-600'}`}
                            >
                              <span className="text-xl">{lang.flag}</span>
                              <span className="font-medium text-[15px]">{lang.name}</span>
                            </button>
                          )) : (
                            <div className="p-4 text-center text-slate-500 text-[15px]">No languages found</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Reading Level Slider */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Reading Level</div>
                    <div className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">Grade {gradeLevel}</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4 h-[50px] hover:border-blue-300 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
                    <span className="text-xs font-bold text-slate-500 shrink-0 uppercase tracking-wider">Gr. 3</span>
                    <div className="flex-1 flex items-center">
                      <input 
                        type="range" 
                        min="3" 
                        max="12" 
                        value={gradeLevel}
                        aria-label="Select reading grade level"
                        onChange={(e) => setGradeLevel(parseInt(e.target.value))}
                        className="w-full custom-slider"
                        style={{
                          background: `linear-gradient(to right, #3B82F6 ${(gradeLevel - 3) / 9 * 100}%, #E2E8F0 ${(gradeLevel - 3) / 9 * 100}%)`
                        }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-400 shrink-0 uppercase tracking-wider">Gr. 12</span>
                  </div>
                </div>

              </div>
              
              <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-2 overflow-hidden flex flex-col focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
                
                {/* Drag & Drop Zone */}
                {!uploadedImage ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`m-2 border-2 border-dashed rounded-[1.5rem] p-8 text-center transition-colors flex flex-col items-center justify-center cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50 hover:border-slate-300 bg-slate-50/30'}`}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-4 text-blue-500">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <p className="font-semibold text-navy text-[15px]">Drop a photo of your textbook page</p>
                    <p className="text-slate-400 text-sm mt-1">or click to browse</p>
                  </div>
                ) : (
                  <div className="m-2 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-start gap-4 relative">
                    <div className="w-24 h-24 bg-slate-200 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm relative">
                      <img src={uploadedImage} alt="Uploaded textbook page" className={`w-full h-full object-cover transition-all ${isExtractingText ? 'opacity-50 blur-sm' : ''}`} />
                      {isExtractingText && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <RefreshCw className="w-6 h-6 text-blue-500 animate-spin mb-1" />
                           <span className="text-[10px] font-bold text-blue-600">{ocrProgress}%</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 pt-2 pr-10">
                      <h4 className="font-semibold text-navy text-[15px] flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-400" /> Image uploaded successfully
                      </h4>
                      {isExtractingText ? (
                        <p className="text-blue-500 font-medium text-sm mt-1 animate-pulse">Extracting text... please wait.</p>
                      ) : (
                        <p className="text-slate-500 text-sm mt-1">We've extracted the text! Please review and edit it below before clicking Re-Level.</p>
                      )}
                    </div>
                    {!isExtractingText && (
                      <button 
                        onClick={() => { setUploadedImage(null); setInputText(""); }}
                        aria-label="Remove uploaded image"
                        className="absolute top-4 right-4 p-2 bg-white text-slate-500 hover:text-rose-500 rounded-full shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
                
                {/* Sample Texts */}
                <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-1 hidden sm:inline-block">Try an example:</span>
                  {SAMPLE_TEXTS.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setUploadedImage(null); setInputText(sample.text); }}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold transition-colors border border-blue-100/50 min-h-[44px]"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
                
                {/* Textarea */}
                <div className="p-4 pt-2 flex-1">
                  <textarea 
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (inputError) setInputError(""); // Clear error on type
                    }}
                    disabled={isExtractingText}
                    aria-label="Original text to re-level"
                    className="w-full min-h-[160px] resize-none bg-transparent outline-none text-slate-700 placeholder-slate-500 text-[15px] leading-relaxed disabled:opacity-50"
                    placeholder="...or paste your difficult text here directly."
                  ></textarea>
                </div>
                
                {/* Validation Error Message */}
                <AnimatePresence>
                  {inputError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0, y: -10 }}
                      className="px-4 py-2.5 mx-4 mb-3 bg-amber-50 border border-amber-200 text-amber-700 text-[13px] font-semibold rounded-xl flex items-center gap-2 shadow-sm"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {inputError}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Footer Toolbar */}
                <div className="flex justify-between items-center px-4 pb-4 pt-2 border-t border-slate-100 mt-2">
                  <div className={`text-xs font-medium px-3 py-1.5 rounded-lg border ${inputText.length > 5000 ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-slate-50 border-slate-100 text-slate-400'}`}>
                    {inputText.length} / 5000 chars
                  </div>
                  <button 
                    onClick={handleRelevel}
                    disabled={isExtractingText}
                    className="bg-navy text-white px-8 py-3 rounded-full font-bold text-[15px] hover:bg-blue-600 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    Re-Level this
                  </button>
                </div>
              </div>

            </div>
            )}

            {/* Output View (Loading & Result) */}
            {(appState === "loading" || appState === "result") && (
              <div className="max-w-[1200px] mx-auto w-full pt-2 lg:pt-6 pb-20">
                <button 
                  onClick={() => setAppState("input")}
                  className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors mb-6 font-medium text-[15px] min-h-[44px]"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to editor
                </button>
                
                <div className="flex flex-col lg:flex-row gap-6 min-h-[600px] h-full">
                  
                  {/* Left Column: Original Text */}
                  <div className="w-full lg:w-5/12 flex flex-col">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 pl-2 flex items-center gap-2">
                      Original Input
                    </div>
                    <div className="bg-slate-100/70 rounded-[2rem] p-6 lg:p-8 border border-slate-200/60 flex-1 relative overflow-y-auto max-h-[600px]">
                       {uploadedImage ? (
                         <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 opacity-80">
                           <img src={uploadedImage} alt="Uploaded textbook page" className="w-full h-auto object-contain" />
                         </div>
                       ) : (
                         <p className="text-slate-500 font-serif leading-relaxed opacity-80 whitespace-pre-wrap">
                           {inputText}
                         </p>
                       )}
                    </div>
                  </div>
                  
                  {/* Right Column: Result */}
                  <div className="w-full lg:w-7/12 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3 px-2 shrink-0">
                       <div className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-1.5">
                         <Sparkles className="w-4 h-4" /> Re-Leveled Result
                       </div>
                       <div className="flex items-center gap-2">
                         <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md border border-indigo-100 truncate max-w-[120px]" title={currentModel}>
                           {currentModel ? currentModel.split('/').pop() : 'Llama-3-8B'}
                         </span>
                         <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                           Grade {gradeLevel}
                         </span>
                         <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                           {selectedLang.flag} {selectedLang.name}
                         </span>
                       </div>
                    </div>
                    
                    <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-200 flex-1 relative focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-300 transition-all duration-300 overflow-y-auto mb-4">
                      {appState === "loading" ? (
                        <div className="animate-pulse flex flex-col gap-5 pt-2">
                          <div className="h-5 bg-slate-200 rounded-full w-3/4"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-5/6"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-11/12 mt-6"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-4/5"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-full"></div>
                          <div className="h-5 bg-slate-200 rounded-full w-2/3 mt-6"></div>
                        </div>
                      ) : (
                        <div className="flex flex-col h-full min-h-[350px]">
                          <AnimatePresence mode="wait">
                            <motion.div 
                              key={currentExplanation}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className={`font-sans text-[17px] text-slate-700 leading-loose outline-none whitespace-pre-wrap flex-1 mb-6 transition-all duration-300 ${isRegenerating ? 'opacity-40 blur-[2px]' : ''}`} 
                              contentEditable={!isRegenerating} 
                              suppressContentEditableWarning
                            >
                              {currentExplanation}
                            </motion.div>
                          </AnimatePresence>

                          {/* TTS Controls */}
                          <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-4">
                            <button 
                              onClick={isPlaying ? pauseAudio : playAudio}
                              disabled={isAudioLoading}
                              aria-label={isPlaying ? "Pause audio" : "Play audio"}
                              className="w-11 h-11 bg-teal-500 text-white rounded-full flex items-center justify-center hover:bg-teal-600 shadow-sm hover:shadow transition-all active:scale-95 z-10 shrink-0 disabled:opacity-50"
                            >
                              {isAudioLoading ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                              ) : isPlaying ? (
                                <Pause className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5 ml-1" />
                              )}
                            </button>
                            
                            {/* Progress Bar */}
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden shrink-0 min-w-20">
                              <motion.div 
                                className="h-full bg-teal-500 rounded-full"
                                initial={{ width: "0%" }}
                                animate={{ width: `${playbackProgress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                              />
                            </div>
                            
                            {/* Speed Controls */}
                            <div className="flex bg-slate-100 rounded-lg p-1 shrink-0">
                              {[0.75, 1, 1.25].map(speed => (
                                <button 
                                  key={speed}
                                  onClick={() => handleSpeedChange(speed)}
                                  aria-label={`Set playback speed to ${speed}x`}
                                  className={`px-3 py-2 text-sm font-bold rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center ${playbackSpeed === speed ? 'bg-white text-teal-600 shadow-sm' : 'text-slate-600 hover:text-slate-800 hover:bg-slate-200'}`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Explain Differently Actions */}
                    {appState === "result" && (
                      <div className="shrink-0 flex flex-col gap-3">
                        <button 
                          onClick={handleExplainDifferently}
                          disabled={isRegenerating}
                          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-slate-200 text-slate-600 font-semibold text-[15px] hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-wait"
                        >
                          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                          Explain it a different way
                        </button>
                        
                        {explanationHistory.length > 0 && (
                          <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                            <button 
                              onClick={() => setShowHistory(!showHistory)}
                              className="w-full flex items-center justify-between p-3 text-sm font-medium text-slate-600 hover:text-navy transition-colors focus:outline-none"
                            >
                              <span className="flex items-center gap-2">
                                <History className="w-4 h-4" /> Previous explanations ({explanationHistory.length})
                              </span>
                              <ChevronDown className={`w-4 h-4 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                              {showHistory && (
                                <motion.div 
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 pt-0 border-t border-slate-200 flex flex-col gap-4 mt-2 max-h-[300px] overflow-y-auto no-scrollbar">
                                    {explanationHistory.map((hist, idx) => (
                                      <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-[15px] text-slate-600 leading-relaxed whitespace-pre-wrap">
                                        <div className="flex items-center justify-between mb-2">
                                          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Version {explanationHistory.length - idx}</div>
                                          <div className="text-[10px] font-bold text-indigo-400 bg-indigo-50/50 px-1.5 py-0.5 rounded border border-indigo-100">{hist.model ? hist.model.split('/').pop() : 'Unknown'}</div>
                                        </div>
                                        {hist.text || hist}
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
            )}

            {/* Error View */}
            {appState === "error" && (
              <div className="max-w-2xl mx-auto w-full pt-16 pb-20">
                <div className="bg-amber-50 rounded-[2.5rem] p-8 md:p-12 border border-amber-100 flex flex-col items-center text-center shadow-sm">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-amber-100 relative">
                    <div className="absolute inset-0 bg-amber-100 rounded-full animate-ping opacity-20"></div>
                    <AlertCircle className="w-10 h-10 text-amber-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Oops, something went wrong</h3>
                  <p className="text-slate-600 mb-8 max-w-md leading-relaxed text-[15px]">
                    We couldn't quite process your text. This sometimes happens if an uploaded photo is too blurry, or if our translation servers are taking a brief nap.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setAppState("input")}
                      className="px-6 py-3 rounded-xl border border-amber-200 bg-white text-amber-700 font-bold text-[15px] hover:bg-amber-100/50 transition-colors shadow-sm"
                    >
                      Go back
                    </button>
                    <button 
                      onClick={handleRelevel}
                      className="bg-amber-500 text-white px-8 py-3 rounded-xl font-bold text-[15px] hover:bg-amber-600 shadow-sm hover:shadow active:scale-95 transition-all flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>

      </div>

      {/* Onboarding Modal */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>

      {/* Diagnostic Modal */}
      <AnimatePresence>
        {showDiagnosticModal && <DiagnosticModal />}
      </AnimatePresence>
      
      {/* Fallback Toast */}
      <AnimatePresence>
        {fallbackToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-indigo-900 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-sm border border-indigo-700"
          >
            <div className="w-10 h-10 bg-indigo-800 rounded-full flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5 animate-spin text-indigo-300" />
            </div>
            <div>
              <p className="font-bold text-[15px]">Switching models...</p>
              <p className="text-indigo-200 text-xs mt-0.5 leading-relaxed">
                The primary model is busy. Falling back to <span className="font-bold text-white">{fallbackToast.split('/').pop()}</span> to ensure a fast response.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AppPage() {
  return (
    <RelevelProvider>
      <AppPageContent />
    </RelevelProvider>
  );
}
