import React, { createContext, useContext, useState, useEffect } from 'react';
import { relevelText, reexplainText } from '../lib/api';
import Tesseract from 'tesseract.js';

export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' }
];

const RelevelContext = createContext(null);

export function RelevelProvider({ children }) {
  const [appState, setAppState] = useState("input");
  
  const [inputText, setInputText] = useState("");
  const [inputError, setInputError] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [gradeLevel, setGradeLevel] = useState(6);
  
  const [currentExplanation, setCurrentExplanation] = useState("");
  const [explanationHistory, setExplanationHistory] = useState([]);
  const [isRegenerating, setIsRegenerating] = useState(false);

  // History state mapped to localStorage
  const [historyItems, setHistoryItems] = useState(() => {
    const saved = localStorage.getItem('relevel_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('relevel_history', JSON.stringify(historyItems));
  }, [historyItems]);

  const handleRelevel = async () => {
    setInputError("");
    const text = inputText.trim();
    
    if (!text) {
      setInputError("Please enter some text to re-level.");
      return;
    }
    
    if (text.length < 10) {
      setInputError("That text is a bit too short. Please enter at least 10 characters.");
      return;
    }
    
    if (text.length > 5000) {
      setInputError("That text is too long! Please keep it under 5000 characters.");
      return;
    }
    
    setAppState("loading");
    
    try {
      const response = await relevelText(text, selectedLang.name, gradeLevel);
      setCurrentExplanation(response);
      setAppState("result");
      
      const title = text.split(' ').slice(0, 4).join(' ') + '...';
      const snippet = response.split(' ').slice(0, 10).join(' ') + '...';
      const newItem = {
        id: Date.now(),
        title,
        snippet,
        originalText: text,
        resultText: response,
        lang: selectedLang,
        grade: gradeLevel,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      };
      setHistoryItems(prev => [newItem, ...prev]);
      
    } catch (error) {
      console.error(error);
      setAppState("error");
    }
  };
  
  const handleExplainDifferently = async () => {
    setIsRegenerating(true);
    const historyToPass = [currentExplanation, ...explanationHistory];
    setExplanationHistory(historyToPass);
    
    try {
      const response = await reexplainText(inputText.trim(), selectedLang.name, gradeLevel, historyToPass);
      setCurrentExplanation(response);
      window.speechSynthesis.cancel();
    } catch (error) {
      console.error(error);
      setExplanationHistory(prev => prev.slice(1)); 
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleLoadHistory = (item) => {
    setInputText(item.originalText);
    setUploadedImage(null);
    const matchingLang = LANGUAGES.find(l => l.code === item.lang.code) || item.lang;
    setGradeLevel(item.grade);
    setSelectedLang(matchingLang);
    setCurrentExplanation(item.resultText);
    setExplanationHistory([]); 
    setAppState("result");
  };
  
  const handleNewRelevel = () => {
    setInputText("");
    setInputError("");
    setUploadedImage(null);
    setCurrentExplanation("");
    setExplanationHistory([]);
    setAppState("input");
  };

  const deleteHistoryItem = (id) => {
    setHistoryItems(prev => prev.filter(i => i.id !== id));
  };

  const processImageOCR = async (file) => {
    setIsExtractingText(true);
    setOcrProgress(0);
    setInputError("");
    try {
      const result = await Tesseract.recognize(
        file,
        'eng',
        { logger: m => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }}
      );
      
      const extractedText = result.data.text.trim();
      if (!extractedText) {
        setInputText("");
        setInputError("We couldn't detect any text in that image. Try a clearer photo or typing manually.");
      } else {
        setInputText(extractedText);
      }
    } catch (error) {
      console.error("OCR Error:", error);
      setInputText("");
      setInputError("Failed to extract text from image. Please type manually.");
    } finally {
      setIsExtractingText(false);
      setOcrProgress(0);
    }
  };

  return (
    <RelevelContext.Provider value={{
      LANGUAGES,
      appState, setAppState,
      inputText, setInputText,
      inputError, setInputError,
      uploadedImage, setUploadedImage,
      isExtractingText, setIsExtractingText,
      ocrProgress, setOcrProgress,
      selectedLang, setSelectedLang,
      gradeLevel, setGradeLevel,
      currentExplanation, setCurrentExplanation,
      explanationHistory, setExplanationHistory,
      isRegenerating, setIsRegenerating,
      historyItems, setHistoryItems,
      handleRelevel,
      handleExplainDifferently,
      handleLoadHistory,
      handleNewRelevel,
      deleteHistoryItem,
      processImageOCR
    }}>
      {children}
    </RelevelContext.Provider>
  );
}

export function useRelevel() {
  const context = useContext(RelevelContext);
  if (!context) {
    throw new Error("useRelevel must be used within a RelevelProvider");
  }
  return context;
}
