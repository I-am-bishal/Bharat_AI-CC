import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const LandingPage = lazy(() => import('./pages/LandingPage'))

// Minimal fullscreen loader shown while code-splitting chunks load
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050a14',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div className="loader-ring" />
      <p style={{ color: '#00f5d4', fontFamily: 'DM Sans, sans-serif', fontSize: '14px', letterSpacing: '2px' }}>
        INITIALISING TRAVEL OS
      </p>
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* Future routes: /destination/:id, /planner, /profile, /booking */}
      </Routes>
    </Suspense>
  )
}
