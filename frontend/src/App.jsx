import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

// Pages
import Catalog from './pages/Catalog'
import Admin from './pages/Admin'
import Login from './pages/Login'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('celfra_admin_auth') === 'true'
  })

  const handleLogin = () => {
    localStorage.setItem('celfra_admin_auth', 'true')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('celfra_admin_auth')
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <div className="min-h-screen bg-cream-light flex flex-col">
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Catalog />} />
            <Route 
              path="/admin" 
              element={
                isAuthenticated ? (
                  <Admin onLogout={handleLogout} />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              } 
            />
          </Routes>
        </main>

        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  )
}
