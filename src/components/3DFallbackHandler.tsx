'use client'

import { useEffect, useState } from 'react'

export default function ThreeDFallbackHandler({
  children,
}: {
  children: React.ReactNode
}) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for WebGL support
    function checkWebGL() {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || 
                  canvas.getContext('experimental-webgl')
        
        if (!gl) {
          console.warn('WebGL not available')
          return false
        }
        
        // Additional checks for required WebGL features
        // Cast gl to WebGLRenderingContext to fix TypeScript errors
        const webGLContext = gl as WebGLRenderingContext
        const debugInfo = webGLContext.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = webGLContext.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          console.log('WebGL Renderer:', renderer)
        }
        
        return true
      } catch (e) {
        console.error('Error checking WebGL:', e)
        return false
      }
    }

    // Add global error handler for Three.js
    const handleError = (event: ErrorEvent) => {
      console.error('3D Error detected:', event.error)
      if (event.error && event.error.toString().includes('WebGL')) {
        setError('WebGL error detected. Using simplified view.')
      }
    }

    window.addEventListener('error', handleError)
    
    // Delay slightly to ensure DOM is ready
    setTimeout(() => {
      const webGLSupported = checkWebGL()
      setHasWebGL(webGLSupported)
      
      if (!webGLSupported) {
        setError('Your browser does not support WebGL, which is required for the 3D experience.')
      }
    }, 200)

    return () => {
      window.removeEventListener('error', handleError)
    }
  }, [])

  if (error) {
    return (
      <div className="fallback-container" style={{ 
        color: 'white', 
        padding: '2rem', 
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: '8px',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Arthur Popa</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#4A90E2' }}>Digital Creator</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <p>{error}</p>
          <p>Please try a different browser or device.</p>
        </div>
        
        <div className="social-links" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <a href="https://youtube.com/@arthurpopa" style={{ 
            padding: '0.8rem', 
            background: '#FF0000', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>YouTube</a>
          
          <a href="https://www.linkedin.com/in/arthur-popa-591439331/" style={{ 
            padding: '0.8rem', 
            background: '#0077B5', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>LinkedIn</a>
          
          <a href="https://instagram.com/arthur_popa" style={{ 
            padding: '0.8rem', 
            background: '#E4405F', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>Instagram</a>
          
          <a href="https://github.com/ArthurPopaYT" style={{ 
            padding: '0.8rem', 
            background: '#6e5494', 
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>GitHub</a>
          
          <a href="https://punctual.video" style={{ 
            padding: '0.8rem', 
            background: '#00FF00', 
            color: 'black',
            textDecoration: 'none',
            borderRadius: '4px'
          }}>Portfolio</a>
        </div>
      </div>
    )
  }

  // While checking WebGL support, show loading
  if (hasWebGL === null) {
    return (
      <div className="checking-3d-support" style={{ color: 'white', textAlign: 'center' }}>
        <p>Checking 3D support...</p>
      </div>
    )
  }

  // Return the 3D content if WebGL is supported
  return <>{children}</>
} 