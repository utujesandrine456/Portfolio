'use client'

import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

function BalancedGrid() {
  const lineCount = 80
  const gridData = useMemo(() => {
    const l = []
    const spacing = 4
    const opacity = 0.045

    for (let i = -lineCount; i <= lineCount; i++) {
      const pos = i * spacing
      l.push([new THREE.Vector3(-300, pos, 0), new THREE.Vector3(300, pos, 0)])
      l.push([new THREE.Vector3(pos, -300, 0), new THREE.Vector3(pos, 300, 0)])
    }
    return { lines: l, opacity }
  }, [])

  return (
    <group position={[0, 0, -10]}>
      {gridData.lines.map((line, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([line[0].x, line[0].y, line[0].z, line[1].x, line[1].y, line[1].z])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#DAC5A7" transparent opacity={gridData.opacity} />
        </line>
      ))}
    </group>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <color attach="background" args={['#020202']} />
        <ambientLight intensity={1.5} color="#DAC5A7" />

        <pointLight position={[-20, 0, 10]} intensity={1} color="#DAC5A7" />
        <pointLight position={[20, 0, 10]} intensity={1} color="#DAC5A7" />

        <BalancedGrid />
      </Canvas>
    </div>
  )
}
