/// <reference path="../types/react-three-fiber.d.ts" />
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from './ThemeProvider'

function Particles() {
  const { theme } = useTheme()
  const ref = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const color = new THREE.Color(theme === 'dark' ? '#DAC5A7' : '#000000')
    
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 25
      positions[i + 1] = (Math.random() - 0.5) * 25
      positions[i + 2] = (Math.random() - 0.5) * 25
      
      colors[i] = color.r
      colors[i + 1] = color.g
      colors[i + 2] = color.b
    }
    return { positions, colors }
  }, [theme])

  useFrame((_state: any, delta: number) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.05
      ref.current.rotation.y += delta * 0.08
    }
  })

  return (
    <Points ref={ref} positions={particles.positions} colors={particles.colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function GeometricShape() {
  const { theme } = useTheme()
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_state: any, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
      <mesh ref={meshRef} position={[2, 1, -5]}>
      <octahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        color={theme === 'dark' ? '#DAC5A7' : '#000000'}
        attach="material"
        distort={0.3}
        speed={2}
        transparent
        opacity={0.2}
      />
    </mesh>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  )
}

