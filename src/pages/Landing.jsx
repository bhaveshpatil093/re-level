import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { GradientBlob } from '../components/ui/GradientBlob'
import { Badge } from '../components/ui/Badge'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative flex flex-col items-center justify-center p-4 overflow-hidden z-0" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <GradientBlob className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-[-10vh]"
        >
          <div className="mb-8 flex justify-center">
            <Badge variant="accent">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome to re-level
            </Badge>
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
      </main>
      <Footer />
    </div>
  )
}
