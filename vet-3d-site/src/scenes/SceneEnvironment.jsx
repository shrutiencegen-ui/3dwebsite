import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// 🎨 NEW COLOR PALETTE (soft + premium)
const COLORS = {
  primary: '#6ee7b7',     // soft green
  secondary: '#93c5fd',   // soft blue
  accent: '#fcd34d',      // warm amber
  pink: '#f9a8d4',
  bg: '#07110a'
}

// Floating paw print
function PawPrint({ position, scale = 1, speed = 1, phase = 0 }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.4
      groupRef.current.rotation.x = Math.sin(t * 0.6) * 0.25
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.25
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.2} />
      </mesh>

      {[[-0.12, 0.17, 0], [0.12, 0.17, 0], [-0.2, 0.06, 0], [0.2, 0.06, 0]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

// DNA Helix
function DNAHelix({ position }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.4
  })

  return (
    <group ref={ref} position={position}>
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 4
        const y = (i / 20) * 3 - 1.5
        return (
          <group key={i}>
            <mesh position={[Math.cos(angle) * 0.3, y, Math.sin(angle) * 0.3]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={COLORS.primary} emissive={COLORS.primary} emissiveIntensity={0.6} />
            </mesh>

            <mesh position={[-Math.cos(angle) * 0.3, y, -Math.sin(angle) * 0.3]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={COLORS.accent} emissive={COLORS.accent} emissiveIntensity={0.6} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// Glow Orb
function GlowOrb({ position, color, size = 0.3, speed = 1, phase = 0 }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + phase
    if (ref.current) {
      ref.current.position.x = position[0] + Math.sin(t) * 0.6
      ref.current.position.y = position[1] + Math.cos(t * 0.7) * 0.6
      ref.current.scale.setScalar(1 + Math.sin(t * 2) * 0.15)
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
}

// Medical Cross
function MedicalCross({ position, scale = 0.3 }) {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.25
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4
    }
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.3, 1, 0.3]} />
        <meshStandardMaterial color={COLORS.secondary} emissive={COLORS.secondary} emissiveIntensity={0.4} />
      </mesh>
      <mesh>
        <boxGeometry args={[1, 0.3, 0.3]} />
        <meshStandardMaterial color={COLORS.secondary} emissive={COLORS.secondary} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

// Ground
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color={COLORS.bg} roughness={0.9} />
    </mesh>
  )
}

// Grid
function GridFloor() {
  const ref = useRef()

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 0.4) * 0.05
    }
  })

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.98, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color={COLORS.primary}
        wireframe
        transparent
        opacity={0.1}
      />
    </mesh>
  )
}

export function SceneEnvironment() {
  return (
    <>
      {/* LIGHTING (soft cinematic) */}
      <ambientLight intensity={0.4} />

      <directionalLight position={[5, 10, 5]} intensity={1.2} color="#ffffff" />

      <pointLight position={[-5, 5, -5]} intensity={1} color={COLORS.primary} />
      <pointLight position={[5, 2, 5]} intensity={0.8} color={COLORS.accent} />

      <spotLight position={[0, 8, 0]} angle={0.4} intensity={1.5} color="#ffffff" />

      {/* STARS */}
      <Stars radius={90} depth={60} count={4000} factor={3} fade speed={0.4} />

      {/* FLOATING OBJECTS */}
      <PawPrint position={[-4, 1, -3]} scale={0.8} speed={0.7} />
      <PawPrint position={[4, 2, -4]} scale={0.6} speed={0.5} />

      <GlowOrb position={[-5, 1, -3]} color={COLORS.primary} />
      <GlowOrb position={[5, 2, -4]} color={COLORS.accent} />
      <GlowOrb position={[0, 1, -2]} color={COLORS.secondary} />

      <MedicalCross position={[-6, 2, -4]} />
      <MedicalCross position={[6, 1, -5]} />

      <DNAHelix position={[-7, 0, -5]} />
      <DNAHelix position={[7, 0.5, -6]} />

      <Ground />
      <GridFloor />

      {/* FOG */}
      <fog attach="fog" args={[COLORS.bg, 10, 28]} />
    </>
  )
}