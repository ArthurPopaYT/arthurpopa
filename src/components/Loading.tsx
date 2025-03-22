'use client'

import { useEffect, useState } from 'react'

export default function Loading() {
  const [dots, setDots] = useState('.')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate the dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 400)

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 10
        return next > 100 ? 100 : next
      })
    }, 300)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [])

  return (
    <div className="loading-container">
      <h1 className="loading-title">Arthur Popa</h1>
      <div className="loading-bar-container">
        <div className="loading-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="loading-text">Initializing Digital Universe{dots}</div>

      <style jsx>{`
        .loading-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          background-color: #000;
          color: #fff;
        }
        .loading-title {
          font-size: 3rem;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.5rem;
          text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff;
          animation: glow 2s ease-in-out infinite alternate;
        }
        .loading-bar-container {
          width: 300px;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }
        .loading-bar {
          height: 100%;
          background: linear-gradient(90deg, #00e5ff, #0077ff);
          transition: width 0.3s ease;
          border-radius: 4px;
          box-shadow: 0 0 10px #00e5ff;
        }
        .loading-text {
          font-size: 1rem;
          letter-spacing: 0.1rem;
          opacity: 0.8;
        }
        @keyframes glow {
          from {
            text-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff;
          }
          to {
            text-shadow: 0 0 15px #00e5ff, 0 0 30px #00e5ff, 0 0 40px #00e5ff;
          }
        }
      `}</style>
    </div>
  )
} 