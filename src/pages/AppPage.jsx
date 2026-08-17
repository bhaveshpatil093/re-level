import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { History, Plus, ChevronLeft, ChevronRight, FileText, Settings, LogOut, UploadCloud, Image as ImageIcon, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [inputText, setInputText] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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

  // Mock history data
  const history = [
    { id: 1, title: 'Cellular Respiration', date: 'Today' },
    { id: 2, title: 'Hamlet Act 1 Scene 2', date: 'Yesterday' },
    { id: 3, title: 'Federalist Paper 10', date: 'Oct 12' },
    { id: 4, title: 'Photosynthesis Overview', date: 'Oct 10' },
  ];

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
            
            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar px-2 -mx-2">
              {history.map((item) => (
                <button key={item.id} className="w-full text-left px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors group flex flex-col border border-transparent hover:border-slate-100">
                  <span className="font-medium text-navy text-sm truncate group-hover:text-blue-600 transition-colors w-full">{item.title}</span>
                  <span className="text-xs text-slate-400 mt-1">{item.date}</span>
                </button>
              ))}
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
            
            {/* Mobile Sidebar Toggle */}
            <button className="md:hidden text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
              <History className="w-5 h-5" />
            </button>
          </div>
          
          {/* Workspace Area */}
          <div className="flex-1 bg-slate-50/50 p-6 lg:p-10 overflow-y-auto">
            <div className="max-w-3xl mx-auto w-full pt-8 lg:pt-12 pb-20">
              <div className="mb-8 text-center md:text-left">
                <h3 className="text-3xl font-bold text-navy mb-3">What are we learning today?</h3>
                <p className="text-slate-500 text-[15px]">
                  Drop a photo of your textbook page, upload a file, or paste your complex text below.
                </p>
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
                  <button className="bg-navy text-white px-8 py-3 rounded-full font-bold text-[15px] hover:bg-blue-600 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-300" />
                    Re-Level this
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
