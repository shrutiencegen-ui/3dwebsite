import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Dog3D({ scrollProgress = 0 }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const bodyRef = useRef()
  
  // Leg Refs
  const leftFrontLegRef = useRef()
  const rightFrontLegRef = useRef()
  const leftBackLegRef = useRef()
  const rightBackLegRef = useRef()

  // Ear Refs
  const leftEarRef = useRef()
  const rightEarRef = useRef()

  const COLORS = {
    fur: '#C4832A',
    furDark: '#8B5A1A',
    belly: '#F5E6C8',
    nose: '#121212',
  }

  // 👁️ CUTE DISNEY EYES
  const Eye = ({ position }) => (
    <group position={position}>
      <mesh><sphereGeometry args={[0.08, 24, 24]} /><meshStandardMaterial color="white" /></mesh>
      <mesh position={[0, 0, 0.03]}><sphereGeometry args={[0.065, 24, 24]} /><meshStandardMaterial color="#000000" roughness={0.1} /></mesh>
      <mesh position={[0.025, 0.025, 0.07]}><sphereGeometry args={[0.02, 16, 16]} /><meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} /></mesh>
      <mesh position={[-0.015, -0.015, 0.07]}><sphereGeometry args={[0.01, 16, 16]} /><meshStandardMaterial color="white" opacity={0.8} transparent /></mesh>
    </group>
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return

    const sp = scrollProgress
    let targetRotY = 0
    let targetPosY = -1.5

    // 1. WALK CYCLE (Services Section: 0.17 - 0.33)
    if (sp > 0.17 && sp < 0.33) {
      const walkSpeed = 8
      const walkAmp = 0.4
      
      leftFrontLegRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmp
      rightBackLegRef.current.rotation.x = Math.sin(t * walkSpeed) * walkAmp
      rightFrontLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * walkAmp
      leftBackLegRef.current.rotation.x = Math.sin(t * walkSpeed + Math.PI) * walkAmp

      targetPosY = -1.4 + Math.abs(Math.sin(t * walkSpeed)) * 0.1
      targetRotY = -0.4
      
      // Kaan halne chalताना
      leftEarRef.current.rotation.z = -0.1 + Math.sin(t * walkSpeed) * 0.1
      rightEarRef.current.rotation.z = 0.1 - Math.sin(t * walkSpeed) * 0.1

    } else {
      // RESET LEGS
      [leftFrontLegRef, rightFrontLegRef, leftBackLegRef, rightBackLegRef].forEach(ref => {
        if (ref.current) ref.current.rotation.x += (0 - ref.current.rotation.x) * 0.1
      })

      if (sp < 0.17) {
        targetRotY = Math.PI * 0.05 * Math.sin(t * 0.5)
      } else if (sp > 0.83) {
        // CONTACT: Cute Head Tilt
        if (headRef.current) headRef.current.rotation.z = Math.sin(t * 1.5) * 0.2
      }
    }

    // Smooth movement
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05
    
    // Tail Wag
    if (tailRef.current) tailRef.current.rotation.z = Math.sin(t * (sp > 0.67 ? 12 : 6)) * 0.5
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={[1.3, 1.3, 1.3]}>
      
      {/* BODY */}
      <group ref={bodyRef}>
        <mesh position={[0, 0.6, 0]} castShadow>
          <boxGeometry args={[0.9, 0.75, 1.5]} />
          <meshStandardMaterial color={COLORS.fur} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.35, 0.1]}>
          <boxGeometry args={[0.7, 0.4, 1.2]} />
          <meshStandardMaterial color={COLORS.belly} />
        </mesh>
      </group>

      {/* HEAD */}
      <group ref={headRef} position={[0, 1.2, 0.7]}>
        <mesh castShadow><boxGeometry args={[0.7, 0.6, 0.65]} /><meshStandardMaterial color={COLORS.fur} /></mesh>
        
        {/* Disney Eyes */}
        <Eye position={[-0.22, 0.12, 0.3]} />
        <Eye position={[0.22, 0.12, 0.3]} />

        {/* EARS (Kaan - Fixed!) */}
        <group ref={leftEarRef} position={[-0.38, 0.2, 0]}>
            <mesh position={[0, -0.15, 0]} rotation={[0, 0, -0.1]}>
                <boxGeometry args={[0.12, 0.4, 0.08]} />
                <meshStandardMaterial color={COLORS.furDark} />
            </mesh>
        </group>
        <group ref={rightEarRef} position={[0.38, 0.2, 0]}>
            <mesh position={[0, -0.15, 0]} rotation={[0, 0, 0.1]}>
                <boxGeometry args={[0.12, 0.4, 0.08]} />
                <meshStandardMaterial color={COLORS.furDark} />
            </mesh>
        </group>

        {/* Snout */}
        <mesh position={[0, -0.1, 0.4]}><boxGeometry args={[0.38, 0.3, 0.4]} /><meshStandardMaterial color={COLORS.furDark} /></mesh>
        <mesh position={[0, 0, 0.58]}><sphereGeometry args={[0.09, 12, 12]} /><meshStandardMaterial color={COLORS.nose} /></mesh>
      </group>

      {/* TAIL */}
      <group ref={tailRef} position={[0, 0.8, -0.75]}>
        <mesh position={[0, 0.2, -0.2]} rotation={[0.4, 0, 0]}><cylinderGeometry args={[0.05, 0.08, 0.6]} /><meshStandardMaterial color={COLORS.fur} /></mesh>
      </group>

      {/* LEGS */}
      <mesh ref={leftFrontLegRef} position={[-0.3, 0.2, 0.5]}><boxGeometry args={[0.15, 0.6, 0.15]} /><meshStandardMaterial color={COLORS.fur}/></mesh>
      <mesh ref={rightFrontLegRef} position={[0.3, 0.2, 0.5]}><boxGeometry args={[0.15, 0.6, 0.15]} /><meshStandardMaterial color={COLORS.fur}/></mesh>
      <mesh ref={leftBackLegRef} position={[-0.3, 0.2, -0.5]}><boxGeometry args={[0.18, 0.6, 0.18]} /><meshStandardMaterial color={COLORS.fur}/></mesh>
      <mesh ref={rightBackLegRef} position={[0.3, 0.2, -0.5]}><boxGeometry args={[0.18, 0.6, 0.18]} /><meshStandardMaterial color={COLORS.fur}/></mesh>
    </group>
  )
}