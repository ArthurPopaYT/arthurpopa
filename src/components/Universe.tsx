'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Text } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion-3d'

const socialLinks = [
  { name: 'YouTube', handle: '@arthurpopa', url: 'https://youtube.com/@arthurpopa', color: '#FF0000' },
  { name: 'LinkedIn', handle: 'arthur-popa', url: 'https://www.linkedin.com/in/arthur-popa-591439331/', color: '#0077B5' },
  { name: 'Instagram', handle: '@arthur_popa', url: 'https://instagram.com/arthur_popa', color: '#E4405F' },
  { name: 'Portfolio', handle: 'punctual.video', url: 'https://punctual.video', color: '#00FF00' }
]

export default function Universe() {
  const groupRef = useRef<THREE.Group>(null)
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Avatar Node */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#4A90E2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Social Media Nodes */}
      {socialLinks.map((link, index) => {
        const angle = (index * Math.PI * 2) / socialLinks.length
        const radius = 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <group key={link.name} position={[x, y, 0]}>
            <motion.mesh
              whileHover={{ scale: 1.2 }}
              onPointerEnter={() => setHoveredNode(index)}
              onPointerLeave={() => setHoveredNode(null)}
              onClick={() => window.open(link.url, '_blank')}
            >
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial
                color={link.color}
                emissive={link.color}
                emissiveIntensity={hoveredNode === index ? 1 : 0.5}
              />
            </motion.mesh>
            <Text
              position={[0, 0.5, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {link.name}
            </Text>
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.1}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {link.handle}
            </Text>
          </group>
        )
      })}

      {/* Connecting Lines */}
      {socialLinks.map((_, index) => {
        const angle = (index * Math.PI * 2) / socialLinks.length
        const radius = 2
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <line key={`line-${index}`}>
            <bufferGeometry
              attach="geometry"
              attributes={{
                position: new THREE.BufferAttribute(
                  new Float32Array([0, 0, 0, x, y, 0]),
                  3
                ),
              }}
            />
            <lineBasicMaterial
              attach="material"
              color="#4A90E2"
              transparent
              opacity={0.3}
              linewidth={1}
            />
          </line>
        )
      })}
    </group>
  )
} 