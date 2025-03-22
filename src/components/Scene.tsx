'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Universe component with SSR disabled
const Universe = dynamic(() => import('./Universe'), { 
  ssr: false 
})

export default function Scene() {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [initializationTimeout, setInitializationTimeout] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Set a timeout to detect if the canvas doesn't initialize within 5 seconds
    const timeoutId = setTimeout(() => {
      setInitializationTimeout(true)
    }, 5000)
    
    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // Handle errors in the 3D rendering
  const handleError = (err: Error) => {
    console.error('Error initializing 3D scene:', err)
    setError(err.message)
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Failed to initialize 3D scene</h2>
        <p>Please make sure your browser supports WebGL and 3D graphics.</p>
        <p>Error: {error}</p>
      </div>
    )
  }

  if (!mounted) {
    return <div className="loading-fallback">Preparing 3D environment...</div>
  }

  if (initializationTimeout && !window.requestAnimationFrame) {
    return (
      <div className="error-message">
        <h2>3D Initialization Warning</h2>
        <p>The 3D scene is taking longer than expected to load.</p>
        <p>Your browser might not fully support the required 3D features.</p>
      </div>
    )
  }

  return <Universe />
} 