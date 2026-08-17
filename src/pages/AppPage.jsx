import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { History, Plus, ChevronLeft, ChevronRight, FileText, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <div className="flex-1 bg-slate-50/50 p-6 lg:p-10 overflow-y-auto flex items-center justify-center">
            <div className="text-center max-w-md w-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">Start a new Re-Level</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-[15px]">
                Paste any complex text, upload a document, or snap a photo of your textbook to get started.
              </p>
              
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-col gap-2 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-200 hover:shadow-md">
                <textarea 
                  className="w-full h-32 resize-none bg-transparent outline-none p-4 text-slate-700 placeholder-slate-400 text-[15px]"
                  placeholder="Paste your difficult text here..."
                ></textarea>
                <div className="flex justify-between items-center px-2 pb-2">
                  <button className="text-slate-400 hover:text-navy px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-slate-50">
                    Upload File
                  </button>
                  <button className="bg-navy text-white px-6 py-2.5 rounded-xl font-medium text-[15px] hover:bg-slate-800 transition-colors shadow-sm hover:shadow active:scale-95 duration-200">
                    Re-Level Text
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
