import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Procedural 3D Dog built from basic geometries
export function Dog3D({ scrollProgress = 0, section = 0 }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const leftEarRef = useRef()
  const rightEarRef = useRef()
  const leftFrontLegRef = useRef()
  const rightFrontLegRef = useRef()
  const leftBackLegRef = useRef()
  const rightBackLegRef = useRef()

  // Dog color palette
  const dogColor = '#C4832A'
  const darkBrown = '#8B5A1A'
  const lightCream = '#F5E6C8'
  const noseColor = '#1a0a00'
  const eyeColor = '#1a0a00'
  const tongueColor = '#E86B6B'

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!groupRef.current) return

    // === Scroll-based position and rotation ===
    const sp = scrollProgress

    // Section 0: Hero — dog sits and looks at camera, wagging tail
    // Section 1: Services — dog stands proudly
    // Section 2: About — dog does a playful bow
    // Section 3: Team — dog sits attentively
    // Section 4: Testimonials — dog does a happy spin
    // Section 5: Contact — dog waves paw

    let targetRotY = 0
    let targetPosY = -1.5
    let targetPosX = 0
    let bodyTiltX = 0
    let bodyTiltZ = 0

    if (sp < 0.17) {
      // Hero: sitting position, gentle idle bob
      targetRotY = Math.PI * 0.05 * Math.sin(t * 0.5)
      targetPosY = -1.5 + Math.sin(t * 0.8) * 0.05
    } else if (sp < 0.33) {
      // Services: walk/trot animation
      targetRotY = -0.3
      targetPosY = -1.2 + Math.abs(Math.sin(t * 3)) * 0.1
      targetPosX = Math.sin(sp * 10) * 0.5
      bodyTiltZ = Math.sin(t * 6) * 0.05
    } else if (sp < 0.5) {
      // About: playful bow (head down, butt up)
      targetRotY = 0.2
      bodyTiltX = 0.3
      targetPosY = -1.5
    } else if (sp < 0.67) {
      // Team: sitting attentive
      targetRotY = -0.1
      targetPosY = -1.5
    } else if (sp < 0.83) {
      // Testimonials: spinning/happy
      targetRotY = t * 1.5
      targetPosY = -1.3 + Math.abs(Math.sin(t * 2)) * 0.2
    } else {
      // Contact: sitting and "waving"
      targetRotY = 0.1
      targetPosY = -1.5
    }

    // Smooth interpolation
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
    groupRef.current.position.y += (targetPosY - groupRef.current.position.y) * 0.05
    groupRef.current.position.x += (targetPosX - groupRef.current.position.x) * 0.05
    groupRef.current.rotation.x += (bodyTiltX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.z += (bodyTiltZ - groupRef.current.rotation.z) * 0.05

    // Tail wag — always wagging
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 5) * 0.6
    }

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.15
      headRef.current.rotation.x = Math.sin(t * 0.5) * 0.05
    }

    // Ear flap
    if (leftEarRef.current) {
      leftEarRef.current.rotation.z = -0.3 + Math.sin(t * 1.2) * 0.1
    }
    if (rightEarRef.current) {
      rightEarRef.current.rotation.z = 0.3 - Math.sin(t * 1.2) * 0.1
    }

    // Leg animation (walk cycle for section 1)
    if (sp > 0.17 && sp < 0.33) {
      if (leftFrontLegRef.current) leftFrontLegRef.current.rotation.x = Math.sin(t * 6) * 0.5
      if (rightFrontLegRef.current) rightFrontLegRef.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.5
      if (leftBackLegRef.current) leftBackLegRef.current.rotation.x = Math.sin(t * 6 + Math.PI) * 0.5
      if (rightBackLegRef.current) rightBackLegRef.current.rotation.x = Math.sin(t * 6) * 0.5
    } else {
      // Reset legs
      if (leftFrontLegRef.current) leftFrontLegRef.current.rotation.x += (0 - leftFrontLegRef.current.rotation.x) * 0.1
      if (rightFrontLegRef.current) rightFrontLegRef.current.rotation.x += (0 - rightFrontLegRef.current.rotation.x) * 0.1
      if (leftBackLegRef.current) leftBackLegRef.current.rotation.x += (0 - leftBackLegRef.current.rotation.x) * 0.1
      if (rightBackLegRef.current) rightBackLegRef.current.rotation.x += (0 - rightBackLegRef.current.rotation.x) * 0.1
    }

    // Wave right front leg in contact section
    if (sp > 0.83 && leftFrontLegRef.current) {
      leftFrontLegRef.current.rotation.x = Math.sin(t * 3) * 0.8 - 0.5
      leftFrontLegRef.current.rotation.z = 0.5
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={[1.2, 1.2, 1.2]}>
      {/* BODY */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[1.0, 0.7, 1.6]} />
        <meshStandardMaterial color={dogColor} roughness={0.8} />
      </mesh>

      {/* BELLY (lighter underside) */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.85, 0.3, 1.3]} />
        <meshStandardMaterial color={lightCream} roughness={0.9} />
      </mesh>

      {/* NECK */}
      <mesh position={[0, 1.0, 0.6]}>
        <cylinderGeometry args={[0.25, 0.3, 0.4, 8]} />
        <meshStandardMaterial color={dogColor} roughness={0.8} />
      </mesh>

      {/* HEAD */}
      <group ref={headRef} position={[0, 1.25, 0.75]}>
        {/* Main head */}
        <mesh castShadow>
          <boxGeometry args={[0.75, 0.65, 0.7]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>

        {/* Snout */}
        <mesh position={[0, -0.08, 0.38]}>
          <boxGeometry args={[0.4, 0.3, 0.35]} />
          <meshStandardMaterial color={darkBrown} roughness={0.9} />
        </mesh>

        {/* Nose */}
        <mesh position={[0, -0.02, 0.56]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color={noseColor} roughness={0.3} />
        </mesh>

        {/* Left Eye */}
        <mesh position={[-0.2, 0.1, 0.37]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Eye shine left */}
        <mesh position={[-0.18, 0.13, 0.43]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Right Eye */}
        <mesh position={[0.2, 0.1, 0.37]}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial color={eyeColor} roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Eye shine right */}
        <mesh position={[0.22, 0.13, 0.43]}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshStandardMaterial color="white" />
        </mesh>

        {/* Tongue */}
        <mesh position={[0, -0.18, 0.55]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.22]} />
          <meshStandardMaterial color={tongueColor} roughness={0.9} />
        </mesh>

        {/* Left Ear */}
        <group ref={leftEarRef} position={[-0.35, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.35, 0.08]} />
            <meshStandardMaterial color={darkBrown} roughness={0.8} />
          </mesh>
        </group>

        {/* Right Ear */}
        <group ref={rightEarRef} position={[0.35, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.18, 0.35, 0.08]} />
            <meshStandardMaterial color={darkBrown} roughness={0.8} />
          </mesh>
        </group>

        {/* Eyebrow dots (personality) */}
        <mesh position={[-0.2, 0.22, 0.38]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color={lightCream} />
        </mesh>
        <mesh position={[0.2, 0.22, 0.38]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial color={lightCream} />
        </mesh>
      </group>

      {/* TAIL */}
      <group ref={tailRef} position={[0, 0.8, -0.8]}>
        <mesh position={[0, 0.2, -0.2]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.1, 0.7, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        {/* Tail tip */}
        <mesh position={[0, 0.55, -0.45]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshStandardMaterial color={lightCream} roughness={0.9} />
        </mesh>
      </group>

      {/* FRONT LEFT LEG */}
      <group ref={leftFrontLegRef} position={[-0.3, 0.25, 0.55]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.6, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        {/* Paw */}
        <mesh position={[0, -0.65, 0.05]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={darkBrown} roughness={0.9} />
        </mesh>
      </group>

      {/* FRONT RIGHT LEG */}
      <group ref={rightFrontLegRef} position={[0.3, 0.25, 0.55]}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.09, 0.6, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.65, 0.05]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={darkBrown} roughness={0.9} />
        </mesh>
      </group>

      {/* BACK LEFT LEG */}
      <group ref={leftBackLegRef} position={[-0.32, 0.25, -0.55]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.11, 0.1, 0.5, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        {/* Lower leg */}
        <mesh position={[0, -0.55, 0.1]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.4, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.78, 0.18]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={darkBrown} roughness={0.9} />
        </mesh>
      </group>

      {/* BACK RIGHT LEG */}
      <group ref={rightBackLegRef} position={[0.32, 0.25, -0.55]}>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.11, 0.1, 0.5, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.55, 0.1]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.4, 8]} />
          <meshStandardMaterial color={dogColor} roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.78, 0.18]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshStandardMaterial color={darkBrown} roughness={0.9} />
        </mesh>
      </group>

      {/* COLLAR */}
      <mesh position={[0, 0.98, 0.58]}>
        <torusGeometry args={[0.28, 0.04, 8, 24, Math.PI * 2]} />
        <meshStandardMaterial color="#e63946" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Collar tag */}
      <mesh position={[0, 0.88, 0.75]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 8]} />
        <meshStandardMaterial color="#F5A623" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}