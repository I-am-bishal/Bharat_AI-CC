import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0d1f3c',
            color: '#e8f4fd',
            border: '1px solid rgba(0,245,212,0.2)',
            borderRadius: '12px',
            fontFamily: 'DM Sans, sans-serif',
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
)
