import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, FileText } from 'lucide-react'

export default function Dashboard() {
  const history = [
    { id: 1, title: 'Project Alpha Design', date: '2 hours ago' },
    { id: 2, title: 'Landing Page Copy', date: 'Yesterday' },
    { id: 3, title: 'Component Library', date: '3 days ago' },
  ]

  return (
    <div className="min-h-screen p-6">
      <nav className="flex items-center justify-between mb-12">
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Link to="/app" className="inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors">
          New Project
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-8 h-8 text-purple-400" />
          <h1 className="text-3xl font-bold">Saved History</h1>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-zinc-800">
            <h2 className="font-medium text-zinc-300">Recent Projects</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {history.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-zinc-200">{item.title}</h3>
                    <p className="text-sm text-zinc-500">{item.date}</p>
                  </div>
                </div>
                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                  Open
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
