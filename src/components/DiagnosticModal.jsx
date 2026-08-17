import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, X, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useRelevel } from '../context/RelevelContext';
import { generateDiagnosticQuestions } from '../lib/api';

export function DiagnosticModal() {
  const { 
    inputText, 
    setGradeLevel, 
    handleRelevel,
    setShowDiagnosticModal,
    setHasCompletedDiagnostic
  } = useRelevel();

  const [step, setStep] = useState('generating'); // 'generating', 'answering', 'result'
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [suggestedGrade, setSuggestedGrade] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchQuestions = async () => {
      try {
        // Use the first 1500 chars to avoid overwhelming the prompt
        const textSample = inputText.slice(0, 1500); 
        const generated = await generateDiagnosticQuestions(textSample);
        if (mounted && generated && generated.length > 0) {
          setQuestions(generated);
          setStep('answering');
        }
      } catch (error) {
        console.error("Diagnostic generation failed, skipping...", error);
        if (mounted) {
          completeAndSkip();
        }
      }
    };

    fetchQuestions();

    return () => { mounted = false; };
  }, [inputText]);

  const completeAndSkip = () => {
    setHasCompletedDiagnostic(true);
    setShowDiagnosticModal(false);
    handleRelevel(true); // Pass true to skip the diagnostic check
  };

  const handleAnswer = (selectedIndex) => {
    const isCorrect = selectedIndex === questions[currentQIndex].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);

    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      // Calculate grade based on final score
      const finalScore = score + (isCorrect ? 1 : 0);
      let newGrade = 6;
      if (finalScore === 0) newGrade = 4;
      else if (finalScore === 1) newGrade = 7;
      else if (finalScore >= 2) newGrade = 10;

      setSuggestedGrade(newGrade);
      setGradeLevel(newGrade);
      setStep('result');

      // Auto advance to re-level after 2.5 seconds
      setTimeout(() => {
        completeAndSkip();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={completeAndSkip}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
      >
        <button 
          onClick={completeAndSkip}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          
          <AnimatePresence mode="wait">
            {step === 'generating' && (
              <motion.div 
                key="generating"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6"
              >
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 relative">
                  <BrainCircuit className="w-10 h-10 text-blue-500" />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">Finding your perfect level</h3>
                <p className="text-slate-500 text-[15px] leading-relaxed max-w-xs">
                  We're generating a quick reading check based on your text to auto-tune the Re-Level engine...
                </p>
                <button onClick={completeAndSkip} className="mt-8 text-sm font-semibold text-slate-400 hover:text-navy transition-colors">
                  Skip this step
                </button>
              </motion.div>
            )}

            {step === 'answering' && (
              <motion.div 
                key="answering"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="w-full flex flex-col"
              >
                <div className="flex items-center gap-2 mb-6 self-center">
                  {questions.map((_, idx) => (
                    <div key={idx} className={`w-12 h-1.5 rounded-full ${idx <= currentQIndex ? 'bg-blue-500' : 'bg-slate-200'}`} />
                  ))}
                </div>
                
                <h3 className="text-xl font-bold text-navy mb-6 text-left">
                  {questions[currentQIndex].question}
                </h3>
                
                <div className="flex flex-col gap-3 w-full">
                  {questions[currentQIndex].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-left p-4 rounded-xl border-2 border-slate-100 hover:border-blue-400 hover:bg-blue-50 text-[15px] font-medium text-slate-700 transition-colors shadow-sm active:scale-[0.98]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                
                <button onClick={completeAndSkip} className="mt-6 text-sm font-medium text-slate-400 hover:text-navy transition-colors self-center">
                  Skip to Re-Level
                </button>
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center py-6"
              >
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Level Set!</h3>
                <p className="text-slate-500 text-[15px] mb-8">
                  We've auto-tuned your starting reading level to <strong className="text-emerald-600">Grade {suggestedGrade}</strong>.
                </p>
                <div className="flex items-center justify-center gap-2 text-blue-600 text-sm font-bold bg-blue-50 px-4 py-2 rounded-full">
                  <Sparkles className="w-4 h-4" /> Re-Leveling your text now...
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
