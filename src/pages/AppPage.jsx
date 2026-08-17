import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { History, Plus, ChevronLeft, ChevronRight, FileText, Settings, LogOut, UploadCloud, Image as ImageIcon, X, Sparkles, ChevronDown, Search, RefreshCw, Play, Pause, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
];

export default function AppPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  
  // Controls state
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [langSearch, setLangSearch] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(8);
  const dropdownRef = useRef(null);
  
  // App view state
  const [appState, setAppState] = useState("input"); // "input", "loading", "result"
  const [explanationHistory, setExplanationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState(
    "This is your highly simplified, re-leveled output text. It has been perfectly adjusted to your selected reading level.\n\nNotice how the complex vocabulary and convoluted sentence structures have been carefully unwrapped into clear, direct statements.\n\nYou can click anywhere in this card to edit the text manually if you want to make further tweaks before saving it to your history or exporting it."
  );
  
  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const handleRelevel = () => {
    if (!inputText.trim() && !uploadedImage) return;
    setAppState("loading");
    // Simulate API call
    setTimeout(() => {
      setAppState("result");
    }, 2500);
  };
  
  const handleExplainDifferently = () => {
    setIsRegenerating(true);
    setExplanationHistory(prev => [currentExplanation, ...prev]);
    
    // Simulate regeneration
    setTimeout(() => {
      setCurrentExplanation(
        "Let's think about this a different way: Imagine your text is a puzzle. We've just rearranged the pieces so that the picture makes perfect sense to someone at your exact reading level!\n\nThis new version uses a completely different analogy to help the concept click for you."
      );
      setIsRegenerating(false);
    }, 800);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate audio playback progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + (5 * playbackSpeed);
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const filteredLangs = LANGUAGES.filter(l => l.name.toLowerCase().includes(langSearch.toLowerCase()));

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
      setUploadedImage(URL.createObjectURL(e.dataTransfer.files[0]));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // History state
  const [historyItems, setHistoryItems] = useState([
    { 
      id: 1, 
      title: 'Cellular Respiration', 
      snippet: 'Think of mitochondria as the tiny power plants inside your body\'s cells.',
      originalText: 'The mitochondria are double-membrane-bound organelles found in most eukaryotic organisms. They generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.',
      resultText: 'Think of mitochondria as the tiny power plants inside your body\'s cells. They take in nutrients and create a special energy (called ATP) that the cell needs to work.',
      lang: LANGUAGES.find(l => l.code === 'en'),
      grade: 6,
      date: '2h ago' 
    },
    { 
      id: 2, 
      title: 'Hamlet Act 1 Scene 2', 
      snippet: 'El rey de Dinamarca habla a la corte sobre su matrimonio...',
      originalText: 'Though yet of Hamlet our dear brother\'s death The memory be green, and that it us befitted To bear our hearts in grief and our whole kingdom To be contracted in one brow of woe...',
      resultText: 'El rey de Dinamarca habla a la corte sobre su matrimonio con la reina. Dice que aunque todos están tristes por la muerte de su hermano (el rey anterior), la vida debe continuar y por eso se ha casado.',
      lang: LANGUAGES.find(l => l.code === 'es'),
      grade: 8,
      date: 'Yesterday' 
    },
    { 
      id: 3, 
      title: 'Photosynthesis Overview', 
      snippet: 'Les plantes utilisent la lumière du soleil pour fabriquer...',
      originalText: 'Photosynthesis is a process used by plants and other organisms to convert light energy into chemical energy that, through cellular respiration, can later be released to fuel the organism\'s activities.',
      resultText: 'Les plantes utilisent la lumière du soleil pour fabriquer leur propre nourriture. C\'est comme cuisiner, mais au lieu d\'un four, elles utilisent le soleil !',
      lang: LANGUAGES.find(l => l.code === 'fr'),
      grade: 5,
      date: 'Oct 10' 
    }
  ]);

  const handleLoadHistory = (item) => {
    setInputText(item.originalText);
    setUploadedImage(null);
    setGradeLevel(item.grade);
    setSelectedLang(item.lang);
    setCurrentExplanation(item.resultText);
    setExplanationHistory([]); 
    setAppState("result");
    
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans flex flex-col h-screen overflow-hidden">
      <Navbar isApp={true} />

      {/* Main Layout Area */}
      <div className="flex flex-1 pt-24 pb-6 px-4 gap-6 max-w-[1400px] mx-auto w-full h-full box-border relative z-0">
        
        {/* Sidebar */}
        <motion.div 
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
          className="bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col shrink-0 relative h-full hidden md:flex overflow-hidden"
        >
          <div className="p-6 flex flex-col h-full w-[280px]">
            <button className="flex items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors rounded-xl px-4 py-3 font-semibold text-sm mb-8 w-full justify-center border border-blue-100 hover:scale-105 active:scale-95 duration-200">
              <Plus className="w-4 h-4" />
              New Re-Level
            </button>
            
            <div className="flex items-center gap-2 text-slate-400 font-semibold text-xs uppercase tracking-wider mb-4 px-2">
              <History className="w-4 h-4" />
              Recent History
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 no-scrollbar px-2 -mx-2">
              {historyItems.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleLoadHistory(item)}
                  className="relative group w-full text-left p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 cursor-pointer shadow-sm hover:shadow"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-navy text-sm truncate pr-6 group-hover:text-blue-600 transition-colors">{item.title}</span>
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0 mt-0.5">{item.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-2.5 leading-relaxed">
                    {item.snippet}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded border border-blue-100 uppercase">Gr {item.grade}</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200 uppercase flex items-center gap-1">{item.lang.flag} {item.lang.code}</span>
                  </div>
                  
                  {/* Delete button */}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setHistoryItems(prev => prev.filter(i => i.id !== item.id)); 
                    }}
                    className="absolute top-2 right-2 w-7 h-7 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                    aria-label="Delete history item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              
              {historyItems.length === 0 && (
                <div className="text-center p-4 text-sm text-slate-400">
                  No history yet. Start learning!
                </div>
              )}
            </div>
            
            <div className="mt-auto pt-6 border-t border-slate-100 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-navy transition-colors font-medium text-sm">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors font-medium text-sm">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Toggle for Desktop */}
        <div className="hidden md:flex items-center h-full relative -ml-3 z-10">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-6 h-12 bg-white border border-slate-200 rounded-r-xl shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-400 hover:text-navy transition-colors"
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-sm border border-slate-100 flex flex-col overflow-hidden relative h-full">
          {/* Header */}
          <div className="h-16 border-b border-slate-100 flex items-center px-6 shrink-0 bg-white/50 backdrop-blur-sm z-10 justify-between">
            <h2 className="font-semibold text-navy flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-400" />
              New Workspace
            </h2>
            
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-slate-500 hover:text-navy hover:bg-slate-100 bg-slate-50 p-2 rounded-lg border border-slate-200 transition-colors"
            >
              <History className="w-5 h-5" />
            </button>
          </div>
          
          {/* Workspace Area */}
          <div className="flex-1 bg-slate-50/50 p-6 lg:p-10 overflow-y-auto">
            
            {appState === "input" && (
              <div className="max-w-3xl mx-auto w-full pt-8 lg:pt-12 pb-20">
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
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">Translate To</div>
                  <button 
                    onClick={() => setLangOpen(!langOpen)}
                    className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm hover:border-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 h-[50px]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{selectedLang.flag}</span>
                      <span className="font-medium text-navy text-[15px]">{selectedLang.name}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
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
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Reading Level</div>
                    <div className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">Grade {gradeLevel}</div>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm flex items-center gap-4 h-[50px] hover:border-blue-300 transition-colors focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100">
                    <span className="text-xs font-bold text-slate-400 shrink-0 uppercase tracking-wider">Gr. 3</span>
                    <div className="flex-1 flex items-center">
                      <input 
                        type="range" 
                        min="3" 
                        max="12" 
                        value={gradeLevel}
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
                    <div className="w-24 h-24 bg-slate-200 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                      <img src={uploadedImage} alt="Uploaded text" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 pt-2 pr-10">
                      <h4 className="font-semibold text-navy text-[15px] flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-400" /> Image uploaded successfully
                      </h4>
                      <p className="text-slate-500 text-sm mt-1">We'll extract the text from this image when you click Re-Level.</p>
                    </div>
                    <button 
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-4 right-4 p-2 bg-white text-slate-400 hover:text-rose-500 rounded-full shadow-sm border border-slate-100 hover:bg-rose-50 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {/* Textarea */}
                <div className="p-4 flex-1">
                  <textarea 
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full min-h-[160px] resize-none bg-transparent outline-none text-slate-700 placeholder-slate-400 text-[15px] leading-relaxed"
                    placeholder="...or paste your difficult text here directly."
                  ></textarea>
                </div>
                
                {/* Footer Toolbar */}
                <div className="flex justify-between items-center px-4 pb-4 pt-2 border-t border-slate-100 mt-2">
                  <div className="text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    {inputText.length} characters
                  </div>
                  <button 
                    onClick={handleRelevel}
                    disabled={!inputText.trim() && !uploadedImage}
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
                  className="flex items-center gap-2 text-slate-500 hover:text-navy transition-colors mb-6 font-medium text-[15px]"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to editor
                </button>
                
                <div className="flex flex-col lg:flex-row gap-6 min-h-[600px] h-full">
                  
                  {/* Left Column: Original Text */}
                  <div className="w-full lg:w-5/12 flex flex-col">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 pl-2 flex items-center gap-2">
                      Original Input
                    </div>
                    <div className="bg-slate-100/70 rounded-[2rem] p-6 lg:p-8 border border-slate-200/60 flex-1 relative overflow-y-auto max-h-[600px]">
                       {uploadedImage ? (
                         <div className="rounded-xl overflow-hidden shadow-sm border border-slate-200 opacity-80">
                           <img src={uploadedImage} alt="Original" className="w-full h-auto object-contain" />
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
                              className="font-sans text-[17px] text-slate-700 leading-loose outline-none whitespace-pre-wrap flex-1 mb-6" 
                              contentEditable 
                              suppressContentEditableWarning
                            >
                              {currentExplanation}
                            </motion.div>
                          </AnimatePresence>

                          {/* TTS Controls */}
                          <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col gap-4">
                            {/* Progress bar */}
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-teal-500 rounded-full"
                                animate={{ width: `${playbackProgress}%` }}
                                transition={{ duration: 0.5, ease: "linear" }}
                              />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <button 
                                onClick={() => {
                                  setIsPlaying(!isPlaying);
                                  if (playbackProgress >= 100) setPlaybackProgress(0);
                                }}
                                className="w-11 h-11 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center hover:bg-teal-100 transition-colors shadow-sm active:scale-95"
                                aria-label={isPlaying ? "Pause" : "Play"}
                              >
                                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
                              </button>
                              
                              <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                                {[0.75, 1, 1.25].map(speed => (
                                  <button
                                    key={speed}
                                    onClick={() => setPlaybackSpeed(speed)}
                                    className={`px-3 py-1.5 rounded-md text-[13px] font-bold transition-all ${playbackSpeed === speed ? 'bg-white text-navy shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                  >
                                    {speed}x
                                  </button>
                                ))}
                              </div>
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
                                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Version {explanationHistory.length - idx}</div>
                                        {hist}
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
            
          </div>
        </div>

      </div>
    </div>
  );
}
