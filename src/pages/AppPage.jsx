import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Layout } from 'lucide-react'

export default function AppPage() {
  return (
    <div className="min-h-screen p-6">
      <nav className="flex items-center justify-between mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Link to="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
          Dashboard
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Layout className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold">App Interface</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
            <p className="text-zinc-500">Main Workspace Area</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="font-semibold mb-4 text-zinc-300">Tools</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-zinc-800/50 rounded-lg border border-zinc-800/50 flex items-center px-4">
                  <span className="text-sm text-zinc-500">Tool {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
