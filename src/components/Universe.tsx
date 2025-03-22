'use client'

import { useEffect, useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Main Universe Component
export default function Universe() {
  const [initialized, setInitialized] = useState(false)
  
  useEffect(() => {
    setInitialized(true)
    console.log('Universe component mounted on client side')
  }, [])
  
  if (!initialized) {
    return null
  }
  
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Central sphere */}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#00e5ff" />
        </mesh>
        
        {/* Orbit planets */}
        <mesh position={[3, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
        
        <mesh position={[-3, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
        
        <mesh position={[0, 0, 3]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="purple" />
        </mesh>
        
        <mesh position={[0, 0, -3]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="green" />
        </mesh>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={15}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
} 