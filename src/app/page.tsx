'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Script from 'next/script'
import WormholeEffect from './components/WormholeEffect'
import PlatformInterface from './components/PlatformInterface'
import ThreeDFallbackHandler from '../components/3DFallbackHandler'

// Dynamically import the Scene component with no server-side rendering
const Scene = dynamic(() => import('../components/Scene'), { 
  ssr: false,
  loading: () => (
    <div className="loading-container">
      <div className="hologram-text">Initializing Digital Universe...</div>
    </div>
  )
})

interface SocialNode {
  id: string
  name: string
  handle: string
  url: string
  color: string
  icon: string
  orbitRadius: number
  orbitSpeed: number
  orbitAngle: number
  stats: string[]
  trail: Array<{x: number, y: number}>
  profileImage: string
}

const socialNodes: SocialNode[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    handle: '@arthurpopa',
    url: 'https://youtube.com/@arthurpopa',
    color: '#FF0000',
    icon: '▶️',
    orbitRadius: 280,
    orbitSpeed: 0.002,
    orbitAngle: 0,
    stats: ['1.5K+ Subscribers', '300K+ Total Views', '100+ Videos'],
    trail: [],
    profileImage: 'poza-profil-youtube.jpg'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'arthur-popa',
    url: 'https://www.linkedin.com/in/arthur-popa-591439331/',
    color: '#0077B5',
    icon: '💼',
    orbitRadius: 380,
    orbitSpeed: 0.0015,
    orbitAngle: Math.PI * 0.5,
    stats: ['100+ Connections', '5+ Years Experience', 'Video Production Expert, Full Stack Developer'],
    trail: [],
    profileImage: 'poza-profil-linkedin.jpg'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@arthur_popa',
    url: 'https://instagram.com/arthur_popa',
    color: '#E1306C',
    icon: '📸',
    orbitRadius: 280,
    orbitSpeed: 0.0025,
    orbitAngle: Math.PI,
    stats: ['350+ Followers', '10+ Posts', 'Creative Content'],
    trail: [],
    profileImage: 'poza-profil-instagram.jpg'
  },
  {
    id: 'portfolio',
    name: 'PunctualVideo',
    handle: 'punctual.video',
    url: 'https://punctual.video',
    color: '#FFD700',
    icon: '🎬',
    orbitRadius: 380,
    orbitSpeed: 0.0018,
    orbitAngle: Math.PI * 1.5,
    stats: ['50+ Projects', 'Award Winning', 'Professional Video Production'],
    trail: [],
    profileImage: 'poza-profil-portfolio.jpg'
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@ArthurPopaYT",
    url: "https://github.com/ArthurPopaYT", 
    color: "#6e5494",
    icon: "💻",
    orbitRadius: 330,
    orbitSpeed: 0.0022,
    orbitAngle: Math.PI * 0.25,
    stats: [
      "Developer",
      "Open Source",
      "3 Repositories",
      "Arctic Code Vault Contributor"
    ],
    trail: [],
    profileImage: 'poza-profil-github.jpg'
  },
  {
    id: "creality",
    name: "Creality",
    handle: "Creality Cloud",
    url: "https://www.crealitycloud.com/user/5329807170",
    color: "#4CAF50",
    icon: "🖨️",
    orbitRadius: 350,
    orbitSpeed: 0.0019,
    orbitAngle: Math.PI * 0.75,
    stats: [
      "10+ Digital Models",
      "1000+ Views",
      "3D Printing Creator"
    ],
    trail: [],
    profileImage: 'poza-profil-creality.jpg'
  }
]

// Componenta pentru logo-ul GitHub - cu logo-ul oficial
const GitHubIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    width="48" 
    height="48" 
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.236 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isWarping, setIsWarping] = useState(false)
  const [hologramOpacity, setHologramOpacity] = useState(0)
  const [hologramScale, setHologramScale] = useState(1)
  const [hologramBlur, setHologramBlur] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Array<Particle>>([])
  const connectionsRef = useRef<Array<Connection>>([])
  const animationFrameRef = useRef<number>(0)
  const universeInitialized = useRef(false)
  const nodeLabelRefs = useRef<(HTMLDivElement | null)[]>([])

  // State pentru navigație și animație wormhole
  const [wormholeActive, setWormholeActive] = useState(false);
  const [destinationNode, setDestinationNode] = useState<string | null>(null);
  const [showPlatformInterface, setShowPlatformInterface] = useState(false);
  const wormholeCanvasRef = useRef<HTMLCanvasElement>(null);

  // Define particle and connection types
  type Particle = {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    color: string
    alpha: number
  }

  type Connection = {
    start: { x: number, y: number }
    end: { x: number, y: number }
    width: number
    color: string
    alpha: number
  }

  // Create ripple effect on click
  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    // Removed ripple effect
  }

  // Handle node click - acum cu wormhole
  const handleNodeClick = (id: string) => {
    console.log('Node clicked:', id);
    
    // Set the destination node
    setDestinationNode(id);
    
    // Activate the wormhole effect - add class to the universe container
    setWormholeActive(true);
    const universeContainer = document.querySelector('.universe-container');
    if (universeContainer) {
      universeContainer.classList.add('warping');
    }
    
    // Add warping class to all planets for animation
    const planets = document.querySelectorAll('.social-node');
    planets.forEach(planet => {
      if (planet.getAttribute('data-id') === id) {
        planet.classList.add('selected-planet');
      }
      planet.classList.add('warping-planet');
    });
    
    // Log for debugging
    console.log('Wormhole activated for:', id);
    
    // Give time for the wormhole animation to complete
    setTimeout(() => {
      // Show platform interface
      setShowPlatformInterface(true);
      
      // After platform interface is visible, reset wormhole
      setTimeout(() => {
        // Clean up classes and reset wormhole
        if (universeContainer) {
          universeContainer.classList.remove('warping');
        }
        planets.forEach(planet => {
          planet.classList.remove('warping-planet');
          planet.classList.remove('selected-planet');
        });
        setWormholeActive(false);
      }, 500);
    }, 2000); // Keep the same timing
  }

  // Hologram animation effect with improved CRT-like behavior
  useEffect(() => {
    if (loading) return; // Don't animate until loaded
    
    // Fade in the hologram once loaded
    let opacity = 0;
    const fadeIn = () => {
      opacity += 0.02;
      setHologramOpacity(opacity);
      if (opacity < 1) {
        requestAnimationFrame(fadeIn);
      }
    };
    
    // Only run the fade-in once when loaded
    if (hologramOpacity === 0) {
      fadeIn();
    }
    
    // Animate the hologram with subtle CRT-like effects
    let animationFrame: number;
    
    const animateHologram = () => {
      // Very subtle scale for stability
      setHologramScale(1.0 + (Math.sin(Date.now() / 2000) * 0.005));
      
      // Occasional subtle blur to simulate focus changes on CRT
      // Most of the time no blur (0), occasionally slight blur
      const now = Date.now();
      if (now % 5000 < 200) { // Brief blur every 5 seconds
        setHologramBlur(0.5);
      } else {
        setHologramBlur(0);
      }
      
      // Continue animation loop
      animationFrame = requestAnimationFrame(animateHologram);
    };
    
    animationFrame = requestAnimationFrame(animateHologram);
    
    // Cleanup animation loop on unmount
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [loading, hologramOpacity]);

  // Initialize universe
  useEffect(() => {
    // Loading animation
    const loadingTimer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingTimer)
          setTimeout(() => {
            setLoading(false)
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 25)

    return () => {
      clearInterval(loadingTimer)
    }
  }, [])

  // Initialize canvas and animations
  useEffect(() => {
    if (loading || !canvasRef.current || universeInitialized.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    universeInitialized.current = true

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasDimensions()

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX,
        y: e.clientY
      }
    }

    // Create particles
    const createParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: '#00E5FF',
          alpha: Math.random() * 0.6 + 0.2
        })
      }
    }

    // Create connections
    const createConnections = () => {
      connectionsRef.current = []
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Add central connections
      socialNodes.forEach(node => {
        const angle = node.orbitAngle
        const x = centerX + Math.cos(angle) * node.orbitRadius
        const y = centerY + Math.sin(angle) * node.orbitRadius
        
        connectionsRef.current.push({
          start: { x: centerX, y: centerY },
          end: { x, y },
          width: 1,
          color: node.color,
          alpha: 0.2
        })
      })
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Update particles
      particlesRef.current.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Check distance from sun
        const dxSun = centerX - particle.x
        const dySun = centerY - particle.y
        const distanceFromSun = Math.sqrt(dxSun * dxSun + dySun * dySun)
        
        // If too close to sun, push particle away
        if (distanceFromSun < 400) {
          const angle = Math.atan2(dySun, dxSun)
          particle.x = centerX - Math.cos(angle) * 400
          particle.y = centerY - Math.sin(angle) * 400
        }
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 229, 255, ${particle.alpha})`
        ctx.fill()
        
        // Connect particles that are close to mouse
        const dx = mousePos.current.x - particle.x
        const dy = mousePos.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          // Main connection line
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mousePos.current.x, mousePos.current.y)
          const alpha = 1 - distance / 200
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.4})`
          ctx.lineWidth = 1.5
          ctx.stroke()

          // Outer glow effect
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mousePos.current.x, mousePos.current.y)
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha * 0.2})`
          ctx.lineWidth = 3
          ctx.stroke()
        }
      })
      
      // Update and draw node positions
      socialNodes.forEach((node, index) => {
        // Check if we're in wormhole mode
        const isWarping = document.querySelector('.universe-container.warping');
        let speedMultiplier = 1;
        
        // Apply much faster speed when in wormhole mode
        if (isWarping) {
          speedMultiplier = 20; // Make orbits 5x faster during warp (reduced from 100x)
        }
        
        // Update orbit position with normal or accelerated speed
        node.orbitAngle += node.orbitSpeed * speedMultiplier;
        
        // Calculate current position - maintain exact original orbit
        const x = centerX + Math.cos(node.orbitAngle) * node.orbitRadius;
        const y = centerY + Math.sin(node.orbitAngle) * node.orbitRadius;
        
        // Update node element position FIRST (before anything else)
        const nodeElement = document.querySelector(`[data-id="${node.id}"]`) as HTMLElement
        if (nodeElement) {
          nodeElement.style.top = `${y}px`
          nodeElement.style.left = `${x}px`
          nodeElement.style.zIndex = `${Math.round(y)}`
          
          // Get the actual node center for accurate trail positioning
          const nodeRect = nodeElement.getBoundingClientRect()
          
          // We need to calculate the tangential direction of movement
          // The tangent is perpendicular to the radius, so we add 90 degrees (PI/2)
          const movementAngle = node.orbitAngle + Math.PI/2
          
          // Calculate the radius of the node
          const nodeRadius = nodeRect.width / 2
          
          // Calculate the position opposite to the direction of movement (behind the planet)
          // We need to use the negative direction of the tangent (-movementAngle)
          const nodeX = nodeRect.left + nodeRect.width / 2 - Math.cos(movementAngle) * nodeRadius * 0.8
          const nodeY = nodeRect.top + nodeRect.height / 2 - Math.sin(movementAngle) * nodeRadius * 0.8
          
          // Update trail with trailing edge position
          node.trail.push({x: nodeX, y: nodeY})
          
          // Adjust trail length based on speed for smoother trails during warping
          const maxTrailLength = isWarping ? 300 : 800;
          if (node.trail.length > maxTrailLength) {
            node.trail.shift()
          }
          
          // Draw trail using the exact node position
          if (node.trail.length > 1) {
            // Use a more complex drawing method for smoother trails
            const pathPoints = []
            
            // Get more points for smoother drawing during warping
            const step = isWarping 
              ? Math.max(1, Math.ceil(node.trail.length / 200)) // Reduced from 400 to 200 points
              : Math.max(1, Math.ceil(node.trail.length / 60)); // Reduced from 120 to 60 for normal state

            for (let i = 0; i < node.trail.length; i += step) {
              pathPoints.push(node.trail[i]);
            }

            // Always include more recent points for smoother trail start
            const recentPoints = isWarping ? 15 : 5; // Reduced from 25/8 to 15/5
            for (let i = Math.max(0, node.trail.length - recentPoints); i < node.trail.length; i++) {
              if (!pathPoints.includes(node.trail[i])) {
                pathPoints.push(node.trail[i]);
              }
            }

            // Make sure we include the most recent point
            if (pathPoints[pathPoints.length - 1] !== node.trail[node.trail.length - 1]) {
              pathPoints.push(node.trail[node.trail.length - 1]);
            }
            
            // Draw main trail with smoother bezier curve
            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            
            // Use the same path as before but with adjusted control points
            if (pathPoints.length > 2) {
              const reversedPoints = [...pathPoints].reverse()
              ctx.lineTo(reversedPoints[1].x, reversedPoints[1].y)
              
              for (let i = 1; i < reversedPoints.length - 1; i++) {
                const p0 = reversedPoints[i - 1]
                const p1 = reversedPoints[i]
                const p2 = reversedPoints[i + 1]
                
                const cp1x = p1.x - (p0.x - p1.x) * 0.15 // Reduced from 0.2 to 0.15
                const cp1y = p1.y - (p0.y - p1.y) * 0.15
                const cp2x = p1.x + (p2.x - p1.x) * 0.15
                const cp2y = p1.y + (p2.y - p1.y) * 0.15
                
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
              }
            } else {
              ctx.lineTo(pathPoints[0].x, pathPoints[0].y)
            }
            
            // Create a more subtle gradient for the trail
            const trailLength = Math.min(
              Math.sqrt(
                Math.pow(nodeX - node.trail[0].x, 2) + 
                Math.pow(nodeY - node.trail[0].y, 2)
              ),
              800 // Increased from 400 to 800 for longer trails
            )
            
            const gradient = ctx.createLinearGradient(
              nodeX, nodeY,
              nodeX + (node.trail[0].x - nodeX) * (trailLength / 800),
              nodeY + (node.trail[0].y - nodeY) * (trailLength / 800)
            )
            
            // More gradual opacity transitions
            const baseOpacity = isWarping ? '40' : '40'
            gradient.addColorStop(0, node.color + baseOpacity)
            gradient.addColorStop(0.1, node.color + '35')
            gradient.addColorStop(0.2, node.color + '30')
            gradient.addColorStop(0.3, node.color + '25')
            gradient.addColorStop(0.4, node.color + '20')
            gradient.addColorStop(0.5, node.color + '15')
            gradient.addColorStop(0.6, node.color + '12')
            gradient.addColorStop(0.7, node.color + '10')
            gradient.addColorStop(0.8, node.color + '08')
            gradient.addColorStop(0.9, node.color + '05')
            gradient.addColorStop(1, 'transparent')
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = isWarping ? 28 : 28
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
            
            // Add subtle outer glow effect with longer fade
            ctx.beginPath()
            ctx.moveTo(nodeX, nodeY)
            
            // Use the same path for the glow
            if (pathPoints.length > 2) {
              const reversedPoints = [...pathPoints].reverse()
              ctx.lineTo(reversedPoints[1].x, reversedPoints[1].y)
              
              for (let i = 1; i < reversedPoints.length - 1; i++) {
                const p0 = reversedPoints[i - 1]
                const p1 = reversedPoints[i]
                const p2 = reversedPoints[i + 1]
                
                const cp1x = p1.x - (p0.x - p1.x) * 0.15
                const cp1y = p1.y - (p0.y - p1.y) * 0.15
                const cp2x = p1.x + (p2.x - p1.x) * 0.15
                const cp2y = p1.y + (p2.y - p1.y) * 0.15
                
                ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y)
              }
            } else {
              ctx.lineTo(pathPoints[0].x, pathPoints[0].y)
            }
            
            const glowGradient = ctx.createLinearGradient(
              nodeX, nodeY,
              nodeX + (node.trail[0].x - nodeX) * (trailLength / 800),
              nodeY + (node.trail[0].y - nodeY) * (trailLength / 800)
            )
            
            // More gradual glow opacity
            const glowOpacity = isWarping ? '20' : '20'
            glowGradient.addColorStop(0, node.color + glowOpacity)
            glowGradient.addColorStop(0.2, node.color + '15')
            glowGradient.addColorStop(0.4, node.color + '12')
            glowGradient.addColorStop(0.6, node.color + '08')
            glowGradient.addColorStop(0.8, node.color + '05')
            glowGradient.addColorStop(1, 'transparent')
            
            ctx.strokeStyle = glowGradient
            ctx.lineWidth = isWarping ? 42 : 42
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()
          }
          
          // Draw connection from sun to planet
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(nodeX, nodeY)
          
          const connectionGradient = ctx.createLinearGradient(centerX, centerY, nodeX, nodeY)
          connectionGradient.addColorStop(0, node.color + '10')
          connectionGradient.addColorStop(1, node.color + '40')
          
          ctx.strokeStyle = connectionGradient
          ctx.lineWidth = 2
          ctx.stroke()
          
          // Add glow to connection
          ctx.beginPath()
          ctx.moveTo(centerX, centerY)
          ctx.lineTo(nodeX, nodeY)
          ctx.strokeStyle = node.color + '20'
          ctx.lineWidth = 4
          ctx.stroke()
          
          // Update connection reference
          if (connectionsRef.current[index]) {
            connectionsRef.current[index].end = { x: nodeX, y: nodeY }
          }
        }
      })
      
      // Draw connections
      connectionsRef.current.forEach(connection => {
        ctx.beginPath()
        ctx.moveTo(connection.start.x, connection.start.y)
        ctx.lineTo(connection.end.x, connection.end.y)
        ctx.strokeStyle = `${connection.color}${Math.floor(connection.alpha * 255).toString(16).padStart(2, '0')}`
        ctx.lineWidth = connection.width
        ctx.stroke()
        
        // Add glow effect
        ctx.beginPath()
        ctx.moveTo(connection.start.x, connection.start.y)
        ctx.lineTo(connection.end.x, connection.end.y)
        ctx.strokeStyle = `${connection.color}20`
        ctx.lineWidth = connection.width + 2
        ctx.stroke()
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    // Initialize everything
    setCanvasDimensions()
    createParticles()
    createConnections()
    
    window.addEventListener('resize', () => {
      setCanvasDimensions()
      createConnections()
    })
    window.addEventListener('mousemove', handleMouseMove)
    
    animationFrameRef.current = requestAnimationFrame(animate)
    
    // Add node hover animations
    anime({
      targets: '.social-node',
      translateY: ['-10px', '0px'],
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 3000,
      delay: anime.stagger(200)
    })
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameRef.current)
      universeInitialized.current = false
    }
  }, [loading])

  // Create rays
  useEffect(() => {
    if (loading) return;

    const createRays = () => {
      const container = document.querySelector('.universe-container');
      if (!container) return;

      // Remove existing rays
      container.querySelectorAll('.ray').forEach(ray => ray.remove());

      // Create new rays
      const numRays = 12;
      for (let i = 0; i < numRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';
        const angle = (i * 360) / numRays;
        ray.style.transform = `rotate(${angle}deg)`;
        container.appendChild(ray);
      }
    };

    createRays();
    window.addEventListener('resize', createRays);

    return () => {
      window.removeEventListener('resize', createRays);
    };
  }, [loading]);

  // Create asteroids
  useEffect(() => {
    if (loading) return;

    const createAsteroids = () => {
      const nodes = document.querySelectorAll('.node-circle');
      nodes.forEach(node => {
        // Remove existing asteroids
        node.querySelectorAll('.asteroid').forEach(asteroid => asteroid.remove());

        // Add new asteroids
        const numAsteroids = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numAsteroids; i++) {
          const asteroid = document.createElement('div');
          asteroid.className = 'asteroid';
          asteroid.style.animationDelay = `${Math.random() * 8}s`;
          asteroid.style.transform = `rotate(${Math.random() * 360}deg)`;
          node.appendChild(asteroid);
        }
      });
    };

    createAsteroids();
    const interval = setInterval(createAsteroids, 8000);

    return () => {
      clearInterval(interval);
    };
  }, [loading]);

  // Funcția pentru a iniția efectul de wormhole
  const initiateWormholeEffect = (nodeId: string) => {
    console.log('Initiating wormhole effect for node:', nodeId);
    setDestinationNode(nodeId);
    setWormholeActive(true);
    
    // Adăugăm o clasă specială la toate planetele pentru a activa animația
    const planets = document.querySelectorAll('.social-node');
    planets.forEach(planet => {
      // Setăm planeta selectată cu o clasă specială
      if (planet.getAttribute('data-id') === nodeId) {
        planet.classList.add('selected-planet');
      }
      planet.classList.add('warping-planet');
    });
    
    // Temporizator pentru a arăta interfața platformei după ce animația wormhole se termină
    setTimeout(() => {
      setShowPlatformInterface(true);
      // După ce interfața a fost afișată, resetăm starea wormhole
      setTimeout(() => {
        setWormholeActive(false);
        // Curățăm și clasele adăugate planetelor
        planets.forEach(planet => {
          planet.classList.remove('warping-planet');
          planet.classList.remove('selected-planet');
        });
      }, 500); // Timp scurt pentru a nu fi vizibilă resetarea
    }, 2000); // Durata animației wormhole
  };
  
  // Gestionează completarea animației wormhole
  const handleWormholeComplete = () => {
    // Această funcție este apelată când animația wormhole s-a terminat
    console.log('Wormhole animation complete');
  };
  
  // Închide interfața platformei și resetează starea
  const handleClosePlatform = () => {
    console.log('Closing platform interface');
    setShowPlatformInterface(false);
    setDestinationNode(null);
    setWormholeActive(false);
  };
  
  // Obține culoarea pentru efectul wormhole pe baza platformei active
  const getWormholeColor = () => {
    if (!destinationNode) return '#ffffff';
    
    const selectedNode = socialNodes.find(node => node.id === destinationNode);
    return selectedNode?.color || '#ffffff';
  };

  // Interfața minimalistă pentru platforme sociale
  const renderPlatformInterface = () => {
    console.log('Rendering platform interface for:', destinationNode);
    if (!destinationNode) {
      console.log('No destination node set');
      return null;
    }
    
    // Folosim componenta PlatformInterface implementată anterior
    return (
      <div className="platform-container">
        <button 
          className="close-button" 
          onClick={handleClosePlatform}
          aria-label="Close platform interface"
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            zIndex: 2000, // Asigură că este peste tot
            transition: 'background-color 0.2s'
          }}
        >
          <i className="fas fa-times"></i>
        </button>
        <PlatformInterface platformId={destinationNode} onClose={handleClosePlatform} />
      </div>
    );
  };

  // Funcții pentru afișarea/ascunderea etichetelor nodurilor
  const showNodeLabel = (e: React.MouseEvent, index: number) => {
    const label = nodeLabelRefs.current[index];
    if (label) {
      label.style.opacity = '1';
    }
  };

  const hideNodeLabel = (index: number) => {
    const label = nodeLabelRefs.current[index];
    if (label) {
      label.style.opacity = '0';
    }
  };
  
  // Funcția care renderizează nodurile sociale
  const renderSocialNodes = () => {
    return socialNodes.map((node, index) => {
      // Calculează poziția pe orbită
      const angle = node.orbitAngle;
      const radius = node.orbitRadius;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Stil pentru nod
      const nodeStyle = {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        backgroundColor: node.color,
        boxShadow: `0 0 10px ${node.color}`,
        '--node-orbit-radius': `${radius}px`, // Variabila pentru animația de rotație
        '--orbit-radius': `${radius}px`
      } as React.CSSProperties;

      // Stil pentru eticheta nodului
      const labelStyle: React.CSSProperties = {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px',
      };

      return (
        <div 
          key={node.id}
          className="social-node"
          style={nodeStyle}
          onClick={() => handleNodeClick(node.id)}
          onMouseEnter={(e) => showNodeLabel(e, index)}
          onMouseLeave={() => hideNodeLabel(index)}
        >
          <i className={node.icon}></i>
          <div className="social-node-label" style={labelStyle} ref={(el) => (nodeLabelRefs.current[index] = el)}>
            {node.name}
          </div>
        </div>
      );
    });
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Required Scripts */}
      <Script
        id="three-js-fix"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // Fix for Three.js WebGL detection
            window.addEventListener('load', function() {
              if (typeof window !== 'undefined') {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (!gl) {
                  console.warn('WebGL not supported, falling back to basic view');
                }
              }
            });
          `,
        }}
      />

      {/* Loading Screen */}
      <div className={`loading-screen ${loading ? '' : 'loaded'}`}>
        <h1 className="loading-title" data-text="Arthur Popa">Arthur Popa</h1>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${loadingProgress}%` }}></div>
        </div>
        <div className="loading-text">Initializing Digital Universe...</div>
      </div>

      {/* Digital Universe */}
      <ThreeDFallbackHandler>
        <div className={`universe-container ${wormholeActive ? 'warping' : ''}`} onClick={createRipple}>
          <canvas ref={canvasRef} id="universe-canvas"></canvas>
          
          {/* Hologram Title */}
          <div className="hologram-projection">
            <div className="hologram-divider hologram-divider-top"></div>
            <div className="hologram-text">ARTHUR POPA</div>
            <div className="hologram-subtitle">DIGITAL CREATOR</div>
            <div className="hologram-divider hologram-divider-bottom"></div>
            <div className="hologram-scanlines"></div>
          </div>
          
          {/* Wormhole Canvas pentru animația de tranzitie */}
          <canvas 
            ref={wormholeCanvasRef} 
            className={`wormhole-canvas ${wormholeActive ? 'active' : ''}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 999,
              backgroundColor: 'transparent'
            }}
          ></canvas>
          
          {/* Wormhole Effect */}
          <WormholeEffect 
            active={wormholeActive} 
            color={getWormholeColor()}
            onAnimationComplete={handleWormholeComplete}
          />
          
          {/* Platform Interface */}
          {showPlatformInterface && renderPlatformInterface()}
          
          {/* Add signature wrapper */}
          <div className="signature-wrapper">
            <Image 
              src="/images/signature.png"
              alt="Arthur Popa Signature"
              width={180}
              height={90}
              className="signature-image"
            />
          </div>
          
          <div 
            className="central-avatar"
          >
            <Image 
              src="/images/sun.jpg"
              alt="Digital Sun"
              width={250}
              height={250}
              className="sun-image"
              priority
            />
            <div className="sun-glow"></div>
            <div className="sun-rays"></div>
            <div className="sun-flare"></div>
            <div className="orbit-ring orbit-ring-1"></div>
            <div className="orbit-ring orbit-ring-2"></div>
            <div className="orbit-ring orbit-ring-3"></div>
          </div>
            
          {/* Social Nodes */}
          {socialNodes.map(node => (
            <div 
              key={node.id}
              className="social-node" 
              data-id={node.id} 
              onClick={() => handleNodeClick(node.id)}
              style={{
                '--node-color': node.color,
                '--node-orbit-radius': `${node.orbitRadius}px`, // Variabila pentru animația de rotație
                '--orbit-radius': `${node.orbitRadius}px`
              } as React.CSSProperties}
            >
              <div className="node-circle">
                <div className="node-glow"></div>
                {node.id === 'github' ? (
                  <div className="node-icon">
                    <GitHubIcon />
                  </div>
                ) : (
                  <Image
                    src={node.id === 'creality' ? "/images/crealitycloud-logo.png" : 
                         node.id === 'portfolio' ? "/images/punctual-video-logo.png" : 
                         `/images/${node.id}-logo.png`}
                    alt={`${node.name} logo`}
                    width={300}
                    height={300}
                    className="node-icon"
                  />
                )}
                <div className="node-label">{node.name}</div>
              </div>
              <div className="node-stats">
                {node.stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="stat-item"
                    style={{ '--index': index } as React.CSSProperties}
                  >
                    {stat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ThreeDFallbackHandler>

      {/* Additional fallback content that will only show if 3D fails */}
      <noscript>
        <div className="fallback-content" style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
          <h1>Arthur Popa</h1>
          <h2>Digital Creator</h2>
          <div className="fallback-links" style={{ marginTop: '2rem' }}>
            <a href="https://youtube.com/@arthurpopa" style={{ display: 'block', margin: '1rem', color: '#FF0000' }}>YouTube - Videos, tutorials, and creative content</a>
            <a href="https://www.linkedin.com/in/arthur-popa-591439331/" style={{ display: 'block', margin: '1rem', color: '#0077B5' }}>LinkedIn - Professional profile and connections</a>
            <a href="https://instagram.com/arthur_popa" style={{ display: 'block', margin: '1rem', color: '#E4405F' }}>Instagram - Photos and social updates</a>
            <a href="https://github.com/ArthurPopaYT" style={{ display: 'block', margin: '1rem', color: '#6e5494' }}>GitHub - Code projects and repositories</a>
          </div>
        </div>
      </noscript>

      {/* Copyright notice that will always show */}
      <div className="copyright-notice" style={{ position: 'fixed', bottom: '1rem', color: 'white', opacity: 0.7, fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} Arthur Popa. All rights reserved.
      </div>
    </main>
  )
} 