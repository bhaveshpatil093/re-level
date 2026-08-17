import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export function Button({ 
  children, 
  variant = 'solid', 
  className = '', 
  href,
  onClick,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-in-out px-6 py-3 text-small tracking-wide hover:-translate-y-0.5 hover:scale-105 active:scale-95"
  
  const variants = {
    solid: "bg-navy text-white hover:bg-slate-800 hover:shadow-lg border border-transparent shadow-sm",
    outline: "bg-transparent text-navy border-2 border-navy hover:bg-slate-50",
  }

  const classes = `${baseStyle} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={onClick} 
      className={classes} 
      {...props}
    >
      {children}
    </motion.button>
  )
}
