// src/App.tsx
import './App.css'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import React, { useContext } from 'react'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Login from './pages/LoginPage'
import Signup from './pages/Signup'
import Logout from './components/Logout'
import { AuthContext } from './context/AuthContext'
import Logo from "../src/assets/logo.png"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useContext(AuthContext)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  const { token } = useContext(AuthContext)
  const location = useLocation()
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup'
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900">
        {!isAuthRoute && (
          <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-500 text-white shadow-lg backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
    {/* Left: Logo + Brand */}
    <div className="flex items-center gap-3">
      <img
        src={Logo}
        alt="HireSight Logo"
        className="h-9 w-9 rounded-lg shadow-md bg-white/10 p-1"
      />
      <h1 className="text-xl md:text-2xl font-bold tracking-wide">HireSight</h1>
    </div>

    {/* Right: Navigation */}
    <nav>
      <ul className="flex items-center gap-1 md:gap-2 text-sm font-medium">
        <li>
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/20"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className="px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-white/20"
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link
            to="/logout"
            className="px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-red-500/80 hover:text-white"
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  </div>
</header>   
        )}

        {/* Main Content */}
        <main className={isAuthRoute ? "px-0" : "px-6 py-8"}>
          <Routes>
            <Route
              path="/"
              element={token ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
  )
}

export default App;