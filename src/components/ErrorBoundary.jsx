import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error in application:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F5F7FA] font-sans flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-50">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <h1 className="text-2xl font-bold text-navy mb-3">
              Something went wrong
            </h1>
            
            <p className="text-slate-500 mb-8 leading-relaxed">
              We encountered an unexpected error. Please try refreshing the page or navigating back to safety.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button 
                onClick={() => window.location.reload()}
                className="flex-1 flex items-center justify-center gap-2 bg-navy text-white px-6 py-3 rounded-full font-medium shadow-sm hover:shadow-lg hover:bg-slate-800 transition-all active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Page
              </button>
              
              <a 
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 px-6 py-3 rounded-full font-medium hover:bg-slate-50 hover:text-navy transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
