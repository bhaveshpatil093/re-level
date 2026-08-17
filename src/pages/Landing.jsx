import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-200 text-small text-accent-700 mb-8">
          <Sparkles className="w-4 h-4 text-accent-500" />
          <span className="font-medium">Welcome to re-level</span>
        </div>
        <h1 className="text-hero font-extrabold tracking-tight mb-6 text-navy">
          Level up your workflow
        </h1>
        <p className="text-body text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate tool to streamline your process and boost your productivity.
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/app" variant="solid" className="gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button href="/dashboard" variant="outline">
            Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
