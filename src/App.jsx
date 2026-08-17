import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import AppPage from './pages/AppPage'
import Dashboard from './pages/Dashboard'
import Disclosures from './pages/Disclosures'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<AppPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/disclosures" element={<Disclosures />} />
      </Routes>
    </Router>
  )
}

export default App
