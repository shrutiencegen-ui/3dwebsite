import { Suspense, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei'
import { Dog3D } from './Dog3D'
import { Cat3D } from './Cat3D'
import { SceneEnvironment } from './SceneEnvironment'

function CameraController({ scrollProgress }) {
  const { camera } = useThree()

  useFrame(() => {
    const sp = scrollProgress

    // Camera path based on scroll
    let targetX = 0
    let targetY = 1.5
    let targetZ = 5
    let lookAtY = 0

    if (sp < 0.17) {
      // Hero: front view, slightly above
      targetX = 0
      targetY = 1.5
      targetZ = 5.5
      lookAtY = 0
    } else if (sp < 0.33) {
      // Services: side angle
      targetX = -2
      targetY = 1.8
      targetZ = 4.5
      lookAtY = 0.5
    } else if (sp < 0.5) {
      // About: low angle (see the bow)
      targetX = 1
      targetY = 0.5
      targetZ = 4
      lookAtY = 0
    } else if (sp < 0.67) {
      // Team: close-up portrait
      targetX = 0
      targetY = 2.5
      targetZ = 3.5
      lookAtY = 1.2
    } else if (sp < 0.83) {
      // Testimonials: orbit around
      const angle = sp * Math.PI * 4
      targetX = Math.sin(angle) * 4
      targetY = 2
      targetZ = Math.cos(angle) * 4
      lookAtY = 0
    } else {
      // Contact: front portrait
      targetX = 0.5
      targetY = 1.8
      targetZ = 4.5
      lookAtY = 0.5
    }

    camera.position.x += (targetX - camera.position.x) * 0.03
    camera.position.y += (targetY - camera.position.y) * 0.03
    camera.position.z += (targetZ - camera.position.z) * 0.03
    camera.lookAt(0, lookAtY, 0)
  })

  return null
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#22c55e" wireframe />
    </mesh>
  )
}

export function MainScene({ scrollProgress = 0, section = 0 }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#0a1a0e' }}
    >
      <PerspectiveCamera makeDefault position={[0, 1.5, 5.5]} fov={60} />
      <CameraController scrollProgress={scrollProgress} />

      <Suspense fallback={<LoadingFallback />}>
        <SceneEnvironment scrollProgress={scrollProgress} />
        <Dog3D scrollProgress={scrollProgress} section={section} />
        {/* Background cat - only visible in some sections */}
        {section >= 2 && section <= 4 && (
          <Cat3D position={[3.5, -1.5, -2]} />
        )}
      </Suspense>
    </Canvas>
  )
}