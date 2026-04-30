import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Cat3D({ position = [3, -2, -2], scrollProgress = 0 }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const bodyRef = useRef()
  const leftEarRef = useRef()
  const rightEarRef = useRef()

  // 🐱 REFINED CAT PALETTE
  const COLORS = {
    baseFur: '#9CA3AF',    // Grey cat
    darkFur: '#4B5563',    // Stripes/Ears
    belly: '#F3F4F6',      // White belly
    eyeIris: '#34D399',    // Emerald eyes
    nose: '#F87171',       // Pink nose
    mouth: '#FECACA'
  }

  // 👁️ CUTE CAT EYE COMPONENT
  const CatEye = ({ position, refEye }) => (
    <group position={position} ref={refEye}>
      {/* Sclera/Iris */}
      <mesh>
        <sphereGeometry args={[0.08, 24, 24]} />
        <meshStandardMaterial color={COLORS.eyeIris} emissive={COLORS.eyeIris} emissiveIntensity={0.3} />
      </mesh>
      {/* Slit Pupil (Cat characteristic) */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.015, 0.09, 0.02]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* Eye Shine (Cute factor) */}
      <mesh position={[0.03, 0.03, 0.06]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.2} />
      </mesh>
    </group>
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress
    if (!groupRef.current) return

    // 🫁 Breathing & Subtle Vibrating (Purring effect)
    if (bodyRef.current) {
      const breathing = 1 + Math.sin(t * 1.5) * 0.015
      bodyRef.current.scale.set(breathing, breathing, breathing)
    }

    // 🎬 SCENE LOGIC
    let targetRotY = -0.6
    let targetY = position[1]
    let targetX = position[0]
    let headTilt = 0

    if (sp < 0.2) {
      // Hero: Shy Peeking
      targetRotY = -0.8 + Math.sin(t * 0.5) * 0.1
    } 
    else if (sp < 0.4) {
      // Services: Playful Wiggle (Pouncing stance)
      targetX = position[0] + Math.sin(t * 3) * 0.3
      targetY = position[1] - Math.abs(Math.sin(t * 6)) * 0.05
      targetRotY = -0.3
    } 
    else if (sp < 0.6) {
      // About: Sitting & Cleaning (Head tilt)
      targetRotY = -0.2
      headTilt = Math.sin(t * 2) * 0.1
    } 
    else if (sp > 0.8) {
      // Contact: Staring at cursor
      targetRotY = 0
      headTilt = Math.sin(t * 1.2) * 0.1
    }

    // Smooth Transitions
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05

    // 🐈 Tail: S-shape wiggle
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 2) * 0.4
      tailRef.current.rotation.x = Math.cos(t * 1.5) * 0.2
    }

    // 🐱 Head Curiosity
    if (headRef.current) {
      headRef.current.rotation.z = headTilt
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.15
    }

    // 👂 Ear Twitching
    if (leftEarRef.current) leftEarRef.current.rotation.x = Math.sin(t * 10) > 0.98 ? 0.3 : 0
  })

  return (
    <group ref={groupRef} position={position} scale={0.75}>
      
      {/* BODY */}
      <group ref={bodyRef}>
        <mesh castShadow>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial color={COLORS.baseFur} />
        </mesh>
        {/* White Chest Fur */}
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color={COLORS.belly} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* HEAD */}
      <group ref={headRef} position={[0, 0.8, 0.4]}>
        <mesh castShadow>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color={COLORS.baseFur} />
        </mesh>

        {/* EARS - Pointy & Animated */}
        <group ref={leftEarRef} position={[-0.25, 0.35, 0]} rotation={[0, 0, -0.2]}>
          <mesh><coneGeometry args={[0.15, 0.4, 4]} /><meshStandardMaterial color={COLORS.darkFur} /></mesh>
        </group>
        <group ref={rightEarRef} position={[0.25, 0.35, 0]} rotation={[0, 0, 0.2]}>
          <mesh><coneGeometry args={[0.15, 0.4, 4]} /><meshStandardMaterial color={COLORS.darkFur} /></mesh>
        </group>

        {/* Realistic Cute Eyes */}
        <CatEye position={[-0.18, 0.08, 0.38]} />
        <CatEye position={[0.18, 0.08, 0.38]} />

        {/* Snout & Mouth Area */}
        <mesh position={[0, -0.08, 0.4]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color={COLORS.belly} />
        </mesh>
        <mesh position={[0, -0.04, 0.5]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color={COLORS.nose} />
        </mesh>
      </group>

      {/* TAIL - Improved multi-segment feel */}
      <group ref={tailRef} position={[0, 0.2, -0.6]}>
        <mesh rotation={[1.1, 0, 0]} position={[0, 0.3, -0.2]}>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 12]} />
          <meshStandardMaterial color={COLORS.darkFur} />
        </mesh>
        <mesh position={[0, 0.85, -0.6]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color={COLORS.darkFur} />
        </mesh>
      </group>

      {/* SOFT PAWS */}
      <mesh position={[-0.3, -0.55, 0.4]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={COLORS.belly} />
      </mesh>
      <mesh position={[0.3, -0.55, 0.4]} castShadow>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial color={COLORS.belly} />
      </mesh>
      
      {/* Subtle Whiskers */}
      <group position={[0, 0.7, 0.8]}>
        {[-0.1, 0, 0.1].map((y, i) => (
          <group key={i}>
             <mesh position={[-0.35, y + 0.05, 0]} rotation={[0, 0, 0.2]}><boxGeometry args={[0.3, 0.005, 0.005]} /><meshBasicMaterial color="white" transparent opacity={0.4} /></mesh>
             <mesh position={[0.35, y + 0.05, 0]} rotation={[0, 0, -0.2]}><boxGeometry args={[0.3, 0.005, 0.005]} /><meshBasicMaterial color="white" transparent opacity={0.4} /></mesh>
          </group>
        ))}
      </group>
    </group>
  )
}