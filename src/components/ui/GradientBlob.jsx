import React from 'react'
import { motion } from 'framer-motion'

export function GradientBlob({ className = '', style, animate = true }) {
  const baseBlob = (
    <div
      className={`absolute rounded-full bg-gradient-to-tr from-primary-400/30 to-accent-300/30 blur-[80px] pointer-events-none -z-10 ${className}`}
      style={style}
      aria-hidden="true"
    />
  )

  if (!animate) return baseBlob

  return (
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 45, -45, 0],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      className={`absolute pointer-events-none -z-10 ${className}`}
      style={style}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-tr from-primary-400/40 to-accent-300/40 blur-[80px]" />
    </motion.div>
  )
}
