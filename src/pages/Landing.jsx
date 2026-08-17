import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>Welcome to re-level</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
          Level up your workflow
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
          The ultimate tool to streamline your process and boost your productivity.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
