import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Clock, FileText } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

export default function Dashboard() {
  const history = [
    { id: 1, title: 'Project Alpha Design', date: '2 hours ago', status: 'Active' },
    { id: 2, title: 'Landing Page Copy', date: 'Yesterday', status: 'Completed' },
    { id: 3, title: 'Component Library', date: '3 days ago', status: 'Draft' },
  ]

  return (
    <div className="min-h-screen p-6 bg-slate-50/50">
      <nav className="flex items-center justify-between mb-12 max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-navy transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <Button href="/app" variant="solid">
          New Project
        </Button>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary-50 rounded-xl">
            <Clock className="w-6 h-6 text-primary-600" />
          </div>
          <h1 className="text-h2 font-bold text-navy">Saved History</h1>
        </div>

        <Card>
          <div className="p-6 border-b border-slate-200 bg-white/50">
            <h2 className="font-semibold text-navy">Recent Projects</h2>
          </div>
          <div className="divide-y divide-slate-100 bg-white">
            {history.map((item) => (
              <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:text-primary-600 group-hover:bg-primary-50 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-navy">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <Badge variant={item.status === 'Active' ? 'primary' : item.status === 'Completed' ? 'accent' : 'outline'}>
                    {item.status}
                  </Badge>
                  <span className="text-sm font-medium text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Open &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
