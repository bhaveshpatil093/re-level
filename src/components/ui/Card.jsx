import React from 'react'

export function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`bg-white rounded-2xl border border-slate-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
