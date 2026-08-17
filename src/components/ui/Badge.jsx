import React from 'react'

export function Badge({ children, className = '', variant = 'primary', ...props }) {
  const baseStyle = "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors"
  
  const variants = {
    primary: "bg-primary-50 text-primary-700 border border-primary-200",
    accent: "bg-accent-50 text-accent-700 border border-accent-200",
    outline: "bg-transparent text-slate-600 border border-slate-300"
  }

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  )
}
