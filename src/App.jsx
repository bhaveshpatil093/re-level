import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import { ErrorBoundary } from './components/ErrorBoundary'
import NotFound from './pages/NotFound'

const AppPage = lazy(() => import('./pages/AppPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Disclosures = lazy(() => import('./pages/Disclosures'))

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA]">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<AppPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/disclosures" element={<Disclosures />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  )
}

export default App
