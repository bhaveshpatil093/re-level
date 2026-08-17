import React, { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Shield, Database, BrainCircuit, ScanText } from 'lucide-react';

export default function Disclosures() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-20 lg:py-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6 shadow-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-navy tracking-tight mb-4">
            AI Disclosures & Transparency
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            We believe in complete transparency regarding the tools, models, and data used to power Re-Level.
          </p>
        </div>

        <div className="space-y-8">
          
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-indigo-500" />
              </div>
              <h2 className="text-2xl font-bold text-navy">AI Models & APIs</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Re-Level utilizes external Large Language Models (LLMs) to perform reading-level adjustments and translations in real-time. 
            </p>
            <ul className="list-none text-slate-600 space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                <span><strong>Provider:</strong> Featherless AI (via OpenAI-compatible API)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                <div className="flex-1">
                  <strong>Models Used:</strong>
                  <ul className="mt-2 ml-1 space-y-1.5 text-sm">
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400"></span> meta-llama/Meta-Llama-3-8B-Instruct</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400"></span> mistralai/Mistral-7B-Instruct-v0.2</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400"></span> NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO</li>
                    <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400"></span> microsoft/Phi-3-mini-4k-instruct</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0"></span>
                <span><strong>Speech Synthesis:</strong> Native Browser Web Speech API (Client-side, Offline capable)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center">
                <ScanText className="w-6 h-6 text-teal-500" />
              </div>
              <h2 className="text-2xl font-bold text-navy">Optical Character Recognition (OCR)</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-4">
              Image-to-text extraction is handled entirely on your device to ensure privacy, security, and speed.
            </p>
            <ul className="list-none text-slate-600 space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                <span><strong>Tool:</strong> Tesseract.js</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0"></span>
                <span><strong>Environment:</strong> 100% Client-side (Browser WebAssembly)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center">
                <Database className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-navy">Training Data & Privacy</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-800">No external training dataset was used or collected to build this tool.</strong> 
              <br /><br />
              Re-Level operates entirely as a runtime application. It passes your input text through carefully engineered zero-shot prompts to standard LLM endpoints. We do not store, fine-tune, or use your uploaded text, images, or documents to train any internal models.
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
