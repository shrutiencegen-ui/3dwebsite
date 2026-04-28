import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export function Cat3D({ position = [3, -2, -2], scrollProgress = 0 }) {
  const groupRef = useRef()
  const tailRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const bodyRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress

    if (!groupRef.current) return

    // 🫁 breathing (alive feel)
    if (bodyRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.02
      bodyRef.current.scale.set(s, s, s)
    }

    // 👀 blinking
    const blink = Math.sin(t * 3) > 0.96 ? 0.01 : 1
    if (leftEyeRef.current) leftEyeRef.current.scale.y = blink
    if (rightEyeRef.current) rightEyeRef.current.scale.y = blink

    // 🐱 BASE FLOAT
    groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.05

    // 🎬 SCENE BEHAVIOUR
    let targetRotY = -0.5
    let targetX = position[0]

    // 🐱 Hero → shy + curious
    if (sp < 0.2) {
      targetRotY = -0.5 + Math.sin(t * 0.6) * 0.2
    }

    // 🐾 Services → walking
    else if (sp < 0.4) {
      targetRotY = -0.2
      targetX = position[0] + Math.sin(t * 2) * 0.5
    }

    // 🧘 About → sitting calm
    else if (sp < 0.6) {
      targetRotY = -0.3
    }

    // 🎉 Testimonials → playful jump
    else if (sp < 0.8) {
      groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 4)) * 0.4
      targetRotY = t * 0.5
    }

    // 👀 Contact → look at user
    else {
      targetRotY = 0
    }

    // Smooth transitions
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05

    // 🐱 head movement (cute curiosity)
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.7) * 0.25
      headRef.current.rotation.x = Math.sin(t * 0.5) * 0.08
    }

    // 🐈 tail emotion
    if (tailRef.current) {
      tailRef.current.rotation.z = Math.sin(t * 2) * 0.5
    }
  })

  return (
    <group ref={groupRef} position={position} scale={0.7}>

      {/* BODY */}
      <group ref={bodyRef}>
        <mesh>
          <sphereGeometry args={[0.6, 16, 16]} />
          <meshStandardMaterial color="#9CA3AF" />
        </mesh>
      </group>

      {/* HEAD */}
      <group ref={headRef} position={[0, 0.75, 0.3]}>
        <mesh>
          <sphereGeometry args={[0.42, 16, 16]} />
          <meshStandardMaterial color="#9CA3AF" />
        </mesh>

        {/* EARS */}
        <mesh position={[-0.22, 0.35, 0]} rotation={[0, 0, -0.3]}>
          <coneGeometry args={[0.12, 0.3, 4]} />
          <meshStandardMaterial color="#6B7280" />
        </mesh>

        <mesh position={[0.22, 0.35, 0]} rotation={[0, 0, 0.3]}>
          <coneGeometry args={[0.12, 0.3, 4]} />
          <meshStandardMaterial color="#6B7280" />
        </mesh>

        {/* EYES */}
        <mesh ref={leftEyeRef} position={[-0.16, 0.05, 0.38]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={0.4} />
        </mesh>

        <mesh ref={rightEyeRef} position={[0.16, 0.05, 0.38]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#34D399" emissive="#34D399" emissiveIntensity={0.4} />
        </mesh>

        {/* NOSE */}
        <mesh position={[0, -0.06, 0.42]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#FCA5A5" />
        </mesh>
      </group>

      {/* TAIL */}
      <group ref={tailRef} position={[0, 0.1, -0.7]}>
        <mesh rotation={[0.8, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.07, 1, 8]} />
          <meshStandardMaterial color="#6B7280" />
        </mesh>
      </group>

      {/* PAWS */}
      <mesh position={[-0.25, -0.6, 0.3]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>

      <mesh position={[0.25, -0.6, 0.3]}>
        <sphereGeometry args={[0.14, 8, 8]} />
        <meshStandardMaterial color="#9CA3AF" />
      </mesh>
    </group>
  )
}