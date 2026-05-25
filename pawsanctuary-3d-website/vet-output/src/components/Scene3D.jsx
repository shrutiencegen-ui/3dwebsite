import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function buildProceduralCat(scene) {
  const cat = new THREE.Group()

  const furMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8b5a3c, // Warmer, creamier fur color for Persian
    roughness: 0.55,
    metalness: 0.08,
    clearcoat: 0.45,
    clearcoatRoughness: 0.2,
    sheen: 0.7,
    sheenColor: new THREE.Color(0xf4e5d2),
  })

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf0e6d8,
    roughness: 0.65,
    metalness: 0,
  })

  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08 })
  const irisMaterial = new THREE.MeshStandardMaterial({ color: 0x4a7c59, roughness: 0.12, metalness: 0.03 })
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, roughness: 0.05 })
  const noseMaterial = new THREE.MeshStandardMaterial({ color: 0xd38f79, roughness: 0.25 })

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.82, 42, 42), furMaterial)
  body.scale.set(1.15, 0.78, 1.48)
  body.castShadow = true
  body.receiveShadow = true
  cat.add(body)

  const chestFluff = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), accentMaterial)
  chestFluff.position.set(0, -0.08, 0.55)
  chestFluff.scale.set(1.2, 0.4, 0.9)
  cat.add(chestFluff)

  const neck = new THREE.Mesh(new THREE.SphereGeometry(0.26, 32, 32), furMaterial)
  neck.position.set(0, 0.36, 0.72)
  neck.scale.set(1.05, 0.68, 1.02)
  neck.castShadow = true
  cat.add(neck)

  const headGroup = new THREE.Group()
  headGroup.position.set(0, 0.78, 0.92)

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 38, 38), furMaterial)
  head.castShadow = true
  head.receiveShadow = true
  headGroup.add(head)

  const snout = new THREE.Mesh(new THREE.SphereGeometry(0.14, 32, 32), accentMaterial)
  snout.position.set(0, -0.08, 0.42)
  snout.scale.set(1.1, 0.82, 0.95)
  headGroup.add(snout)

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.055, 0.09, 16), noseMaterial)
  nose.position.set(0, -0.09, 0.48)
  nose.rotation.x = Math.PI / 2
  headGroup.add(nose)

  ;[-1, 1].forEach((side) => {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.28, 8), furMaterial)
    ear.position.set(side * 0.22, 0.36, 0.06)
    ear.rotation.set(-0.15, 0, side * 0.18)
    ear.castShadow = true
    headGroup.add(ear)

    const innerEar = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.24, 8), accentMaterial)
    innerEar.position.set(side * 0.22, 0.32, 0.08)
    innerEar.rotation.set(-0.15, 0, side * 0.18)
    headGroup.add(innerEar)
  })

  const eyeGroup = new THREE.Group()
  ;[-0.18, 0.18].forEach((x) => {
    const eyeWhiteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), eyeWhite)
    eyeWhiteMesh.position.set(x, 0.08, 0.38)
    eyeGroup.add(eyeWhiteMesh)

    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.048, 16, 16), irisMaterial)
    iris.position.set(x, 0.08, 0.44)
    eyeGroup.add(iris)

    const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.06, 16), pupilMaterial)
    pupil.rotation.x = Math.PI / 2
    pupil.position.set(x, 0.08, 0.52)
    eyeGroup.add(pupil)
  })
  headGroup.add(eyeGroup)

  const whiskerMaterial = new THREE.MeshBasicMaterial({ color: 0xf4f1e8, transparent: true, opacity: 0.6 })
  ;[-1, 1].forEach((side) => {
    for (let i = 0; i < 3; i += 1) {
      const whisker = new THREE.Mesh(new THREE.CylinderGeometry(0.0025, 0.0025, 0.6), whiskerMaterial)
      whisker.position.set(side * 0.2, -0.06 + i * 0.025, 0.4)
      whisker.rotation.set(0, side * 0.18, side * Math.PI / 2)
      headGroup.add(whisker)
    }
  })

  cat.add(headGroup)

  const legPositions = [
    [-0.3, -0.58, 0.46],
    [0.3, -0.58, 0.46],
    [-0.3, -0.58, -0.46],
    [0.3, -0.58, -0.46],
  ]

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Group()
    leg.position.set(x, y, z)

    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.48, 18), furMaterial)
    lowerLeg.castShadow = true
    lowerLeg.receiveShadow = true
    leg.add(lowerLeg)

    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 16), accentMaterial)
    paw.position.set(0, -0.24, 0.03)
    paw.scale.set(1, 0.6, 1.1)
    leg.add(paw)

    const padMaterial = new THREE.MeshStandardMaterial({ color: 0xe88a8f, roughness: 0.4 })
    const mainPad = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.015, 0.07), padMaterial)
    mainPad.position.set(0, -0.28, 0.03)
    leg.add(mainPad)

    const legFluff = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 12), furMaterial)
    legFluff.position.set(0, 0.08, 0)
    legFluff.scale.set(1.5, 0.6, 1.5)
    leg.add(legFluff)

    cat.add(leg)
  })

  const tailGroup = new THREE.Group()
  tailGroup.position.set(0, 0.06, -0.88)

  const tailSegments = []
  for (let i = 0; i < 5; i += 1) {
    const segment = new THREE.Mesh(new THREE.CylinderGeometry(0.07 - i * 0.009, 0.065 - i * 0.009, 0.28, 18), furMaterial)
    segment.position.set(0, -0.05, -0.14 - i * 0.22)
    segment.rotation.x = -0.25
    segment.castShadow = true
    tailGroup.add(segment)
    tailSegments.push(segment)
  }
  cat.add(tailGroup)

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 8, 16), new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.8, roughness: 0.2 }))
  collar.position.set(0, 0.25, 0.8)
  collar.rotation.x = Math.PI / 2
  cat.add(collar)

  const tagGroup = new THREE.Group()
  tagGroup.position.set(0, 0.08, 1.05)
  const tagRing = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 6, 12), new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.8, roughness: 0.2 }))
  tagGroup.add(tagRing)
  const tagDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.008, 16), new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.8, roughness: 0.2 }))
  tagDisc.position.y = -0.05
  tagDisc.rotation.x = Math.PI / 2
  tagGroup.add(tagDisc)
  cat.add(tagGroup)

  cat.userData = {
    body,
    headGroup,
    tailSegments,
    earLeft: headGroup.children[3],
    earRight: headGroup.children[5],
    baseScale: 1,
    isGLTF: false
  }

  scene.add(cat)
  return cat
}

function buildProceduralDog(scene) {
  const dog = new THREE.Group()

  const furMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xc8943f,
    roughness: 0.5,
    metalness: 0.06,
    clearcoat: 0.3,
    clearcoatRoughness: 0.25,
    sheen: 0.6,
    sheenColor: new THREE.Color(0xffdb99),
  })

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf5e6cc,
    roughness: 0.6,
    metalness: 0,
  })

  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.08 })
  const irisMaterial = new THREE.MeshStandardMaterial({ color: 0x5c3a1e, roughness: 0.15 })
  const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.05 })
  const noseMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.1, metalness: 0.1 })
  const tongueMaterial = new THREE.MeshPhysicalMaterial({ color: 0xff6b81, roughness: 0.1, clearcoat: 0.6 })

  const body = new THREE.Mesh(new THREE.SphereGeometry(1.0, 42, 42), furMaterial)
  body.scale.set(1.22, 0.88, 1.62)
  body.castShadow = true
  body.receiveShadow = true
  dog.add(body)

  const chestFluff = new THREE.Mesh(new THREE.SphereGeometry(0.72, 32, 32), accentMaterial)
  chestFluff.position.set(0, -0.06, 0.72)
  chestFluff.scale.set(1.15, 0.5, 0.88)
  dog.add(chestFluff)

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.58, 24), furMaterial)
  neck.position.set(0, 0.44, 0.9)
  neck.rotation.x = 0.38
  neck.castShadow = true
  dog.add(neck)

  const headGroup = new THREE.Group()
  headGroup.position.set(0, 0.95, 1.15)

  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.52, 36, 36), furMaterial)
  skull.castShadow = true
  skull.receiveShadow = true
  headGroup.add(skull)

  const muzzle = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 0.46, 24), furMaterial)
  muzzle.position.set(0, -0.1, 0.44)
  muzzle.rotation.x = Math.PI / 2
  muzzle.castShadow = true
  headGroup.add(muzzle)

  const muzzleBottom = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), accentMaterial)
  muzzleBottom.position.set(0, -0.22, 0.44)
  muzzleBottom.scale.set(1, 0.4, 1)
  headGroup.add(muzzleBottom)

  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.1, 0.1), noseMaterial)
  nose.position.set(0, -0.03, 0.68)
  headGroup.add(nose)

  const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.18), tongueMaterial)
  tongue.position.set(0, -0.19, 0.5)
  tongue.rotation.x = 0.22
  headGroup.add(tongue)

  const earLeft = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMaterial)
  earLeft.position.set(-0.46, 0.2, 0)
  earLeft.scale.set(0.48, 1.8, 0.92)
  earLeft.rotation.set(0.1, 0, 0.25)
  earLeft.castShadow = true
  headGroup.add(earLeft)

  const earRight = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMaterial)
  earRight.position.set(0.46, 0.2, 0)
  earRight.scale.set(0.48, 1.8, 0.92)
  earRight.rotation.set(0.1, 0, -0.25)
  earRight.castShadow = true
  headGroup.add(earRight)

  ;[-0.22, 0.22].forEach((x) => {
    const eyeWhiteMesh = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), eyeWhite)
    eyeWhiteMesh.position.set(x, 0.12, 0.38)
    headGroup.add(eyeWhiteMesh)

    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), irisMaterial)
    iris.position.set(x, 0.12, 0.43)
    headGroup.add(iris)

    const pupil = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.06, 16), pupilMaterial)
    pupil.rotation.x = Math.PI / 2
    pupil.position.set(x, 0.12, 0.5)
    headGroup.add(pupil)
  })

  dog.add(headGroup)

  const legPositions = [
    [-0.38, -0.58, 0.52],
    [0.38, -0.58, 0.52],
    [-0.38, -0.58, -0.52],
    [0.38, -0.58, -0.52],
  ]

  legPositions.forEach(([x, y, z]) => {
    const legGroup = new THREE.Group()
    legGroup.position.set(x, y, z)

    const thigh = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), furMaterial)
    thigh.position.set(0, 0.18, 0)
    thigh.scale.set(1.1, 1.4, 1.1)
    legGroup.add(thigh)

    const lowerLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.13, 0.52, 16), furMaterial)
    lowerLeg.position.set(0, -0.15, 0)
    lowerLeg.castShadow = true
    legGroup.add(lowerLeg)

    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), accentMaterial)
    paw.position.set(0, -0.36, 0.05)
    paw.scale.set(1.1, 0.72, 1.25)
    legGroup.add(paw)

    const padMaterial = new THREE.MeshStandardMaterial({ color: 0xe88a8f, roughness: 0.4 })
    const mainPad = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.02, 0.1), padMaterial)
    mainPad.position.set(0, -0.42, 0.05)
    legGroup.add(mainPad)

    dog.add(legGroup)
  })

  const tailGroup = new THREE.Group()
  tailGroup.position.set(0, 0.18, -0.98)

  const tailSegments = []
  for (let i = 0; i < 5; i++) {
    const segment = new THREE.Mesh(new THREE.CylinderGeometry(0.08 - i * 0.012, 0.075 - i * 0.012, 0.32, 16), furMaterial)
    segment.position.set(0, 0.08, -0.16 - i * 0.25)
    segment.rotation.x = 0.48
    segment.castShadow = true
    tailGroup.add(segment)
    tailSegments.push(segment)
  }
  dog.add(tailGroup)

  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.05, 8, 24), new THREE.MeshStandardMaterial({ color: 0x1f5c99, metalness: 0.1, roughness: 0.5 }))
  collar.position.set(0, 0.38, 0.98)
  collar.rotation.x = Math.PI / 2
  dog.add(collar)

  const tagGroup = new THREE.Group()
  tagGroup.position.set(0, 0.18, 1.22)
  const tagRing = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.01, 6, 12), new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.8, roughness: 0.2 }))
  tagGroup.add(tagRing)
  const tagDisc = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.01, 16), new THREE.MeshStandardMaterial({ color: 0xc9a84c, metalness: 0.8, roughness: 0.2 }))
  tagDisc.position.y = -0.06
  tagDisc.rotation.x = Math.PI / 2
  tagGroup.add(tagDisc)
  dog.add(tagGroup)

  dog.userData = {
    body,
    headGroup,
    tailSegments,
    earLeft,
    earRight,
    tongue,
    baseScale: 0.85,
    isGLTF: false
  }

  scene.add(dog)
  return dog
}

function buildGarden(scene) {
  const garden = []
  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x487550, roughness: 0.7 })
  const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x89ad85, roughness: 0.6 })

  const createPlant = (x, z, scale = 1, rotation = 0) => {
    const plant = new THREE.Group()
    plant.position.set(x, -0.78, z)
    plant.rotation.y = rotation
    plant.scale.setScalar(scale)

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.03, 0.45, 8), stemMaterial)
    stem.position.y = 0.22
    plant.add(stem)

    const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.35, 6), leafMaterial)
    leaf1.position.set(0, 0.45, 0.08)
    leaf1.rotation.set(-0.55, 0, 0.45)
    plant.add(leaf1)

    const leaf2 = leaf1.clone()
    leaf2.position.set(0.05, 0.3, -0.02)
    leaf2.rotation.set(-0.45, 0.35, -0.5)
    plant.add(leaf2)

    const leaf3 = leaf1.clone()
    leaf3.position.set(-0.06, 0.23, 0.07)
    leaf3.rotation.set(-0.5, 0.1, 0.45)
    plant.add(leaf3)

    scene.add(plant)
    garden.push(plant)
  }

  createPlant(1.35, -1.45, 1.05, -0.3)
  createPlant(-1.25, -1.55, 0.95, 0.45)
  createPlant(0.4, -1.7, 1.1, 0.1)
  createPlant(-0.85, -1.2, 0.75, -0.15)

  return garden
}

function buildFlowers(scene) {
  const flowers = []
  const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x3d6645, roughness: 0.8 })
  const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xb58c28, roughness: 0.6 }) // Elegant gold flowers

  const createFlower = (x, z, scale = 1) => {
    const flower = new THREE.Group()
    flower.position.set(x, -0.78, z)
    flower.scale.setScalar(scale)

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.02, 0.3, 6), stemMaterial)
    stem.position.y = 0.15
    flower.add(stem)

    for (let i = 0; i < 5; i++) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), petalMaterial)
      petal.position.set(Math.cos(i * Math.PI * 2 / 5) * 0.1, 0.28, Math.sin(i * Math.PI * 2 / 5) * 0.1)
      petal.scale.set(1, 0.3, 1)
      flower.add(petal)
    }

    const center = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), new THREE.MeshStandardMaterial({ color: 0xffffff }))
    center.position.y = 0.3
    flower.add(center)

    scene.add(flower)
    flowers.push(flower)
  }

  createFlower(1.8, -1.2, 0.9)
  createFlower(-1.6, -1.3, 1.1)
  createFlower(0.6, -1.8, 0.8)

  return flowers
}

function buildButterflies(scene) {
  const butterflies = []
  const wingMaterial = new THREE.MeshStandardMaterial({ color: 0xb58c28, transparent: true, opacity: 0.8, side: THREE.DoubleSide })

  const createButterfly = (x, y, z) => {
    const butterfly = new THREE.Group()
    butterfly.position.set(x, y, z)

    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.09, 6), new THREE.MeshStandardMaterial({ color: 0x333333 }))
    butterfly.add(body)

    const wingGroupLeft = new THREE.Group()
    wingGroupLeft.position.set(-0.01, 0, 0)
    const wingL = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.08), wingMaterial)
    wingL.position.set(-0.05, 0, 0)
    wingGroupLeft.add(wingL)
    butterfly.add(wingGroupLeft)

    const wingGroupRight = new THREE.Group()
    wingGroupRight.position.set(0.01, 0, 0)
    const wingR = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.08), wingMaterial)
    wingR.position.set(0.05, 0, 0)
    wingGroupRight.add(wingR)
    butterfly.add(wingGroupRight)

    scene.add(butterfly)

    butterfly.userData = {
      wingLeft: wingGroupLeft,
      wingRight: wingGroupRight,
      basePos: new THREE.Vector3(x, y, z),
      seed: Math.random() * 100,
    }

    butterflies.push(butterfly)
  }

  createButterfly(1.2, 0.5, -1.5)
  createButterfly(-1.0, 0.7, -1.2)
  createButterfly(0.3, 0.6, -1.8)

  return butterflies
}

function buildBallpit(scene) {
  const ballpit = []
  const ballGeo = new THREE.SphereGeometry(0.12, 32, 32)
  const colors = [0x5f9ea0, 0xffb6c1, 0x98fb98, 0xffd700, 0xe6e6fa]

  for (let i = 0; i < 35; i++) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: colors[i % colors.length],
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.8,
      thickness: 0.5,
      clearcoat: 1.0,
    })
    const ball = new THREE.Mesh(ballGeo, mat)
    
    ball.position.set(
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
      -1 - Math.random() * 4
    )
    
    ball.userData = {
      baseY: ball.position.y,
      baseX: ball.position.x,
      speed: 0.5 + Math.random() * 1.5,
      offset: Math.random() * Math.PI * 2,
    }
    
    scene.add(ball)
    ballpit.push(ball)
  }
  return ballpit
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a4f3d)
    scene.fog = new THREE.FogExp2(0x1a4f3d, 0.015)

    // Soft green botanical sky sphere shader
    const skyGeometry = new THREE.SphereGeometry(50, 32, 32)
    const skyMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 top = vec3(0.80, 0.92, 0.82);
          vec3 bottom = vec3(0.12, 0.34, 0.28);
          float t = max(pow(max(h, 0.0), 0.8), 0.0);
          gl_FragColor = vec4(mix(bottom, top, t), 1.0);
        }
      `,
      side: THREE.BackSide,
    })
    const sky = new THREE.Mesh(skyGeometry, skyMaterial)
    scene.add(sky)

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0.85, 4.5)

    // Soft greenish biophilic lighting
    const ambientLight = new THREE.HemisphereLight(0xd8f1e0, 0x264a3b, 0.78)
    scene.add(ambientLight)

    const mainLight = new THREE.DirectionalLight(0xf7f0df, 1.35)
    mainLight.position.set(4, 5, 3)
    mainLight.castShadow = true
    mainLight.shadow.mapSize.set(2048, 2048)
    mainLight.shadow.camera.near = 0.5
    mainLight.shadow.camera.far = 20
    mainLight.shadow.camera.left = -3
    mainLight.shadow.camera.right = 3
    mainLight.shadow.camera.top = 3
    mainLight.shadow.camera.bottom = -3
    scene.add(mainLight)

    const fillLight = new THREE.DirectionalLight(0xa5c2ad, 0.45)
    fillLight.position.set(-3, 2.4, -2)
    scene.add(fillLight)

    // Elegant warm green rim light
    const rimLight = new THREE.DirectionalLight(0xd4cfb2, 0.42)
    rimLight.position.set(-2, 3, -3)
    scene.add(rimLight)

    // Light green floor platform
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(3.8, 64),
      new THREE.MeshPhysicalMaterial({ color: 0xdfe9e1, roughness: 0.48, metalness: 0.02, clearcoat: 0.35 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.78
    ground.receiveShadow = true
    scene.add(ground)

    const plants = buildGarden(scene)
    const flowers = buildFlowers(scene)
    const butterflies = buildButterflies(scene)
    const ballpit = buildBallpit(scene)

    // Create procedural fallbacks first
    const catProcedural = buildProceduralCat(scene)
    const dogProcedural = buildProceduralDog(scene)

    // Interactive targets referencing whatever model is active (procedural or loaded)
    let catActive = catProcedural
    let dogActive = dogProcedural

    const sections = [
      { id: 'hero',        catX: -0.5, catY: -0.78, catScale: 1.05, catRot:  0.2,  dogX:  0.5, dogY: -0.78, dogScale: 0.9,  dogRot: -0.2 },
      { id: 'story-1',    catX:  1.2, catY: -0.78, catScale: 0.95, catRot: -0.4,  dogX:  2.0, dogY: -0.78, dogScale: 0.8,  dogRot: -0.3 },
      { id: 'story-2',    catX: -2.0, catY: -0.78, catScale: 0.8,  catRot:  0.4,  dogX: -1.2, dogY: -0.78, dogScale: 0.95, dogRot:  0.2 },
      { id: 'services',   catX: -0.5, catY: -0.78, catScale: 0.9,  catRot:  0.15, dogX:  0.5, dogY: -0.78, dogScale: 0.85, dogRot: -0.15 },
      { id: 'team',       catX: -2.0, catY: -0.78, catScale: 0.9,  catRot:  0.4,  dogX: -1.2, dogY: -0.78, dogScale: 0.75, dogRot:  0.3  },
      { id: 'testimonials', catX: -0.5, catY: -0.78, catScale: 0.85, catRot:  0.1,  dogX:  0.6, dogY: -0.78, dogScale: 0.8,  dogRot: -0.15 },
      { id: 'contact',    catX: -2.0, catY: -0.78, catScale: 1.05, catRot:  0.4,  dogX: -1.2, dogY: -0.78, dogScale: 1.05, dogRot:  0.3  },
    ]

    let activeSectionIndex = 0

    // Set initial offsets
    catActive.position.set(sections[0].catX, sections[0].catY, 0)
    catActive.scale.setScalar(sections[0].catScale * (catActive.userData.baseScale || 1.0))
    catActive.rotation.y = sections[0].catRot

    dogActive.position.set(sections[0].dogX, sections[0].dogY, 0)
    dogActive.scale.setScalar(sections[0].dogScale * (dogActive.userData.baseScale || 1.0))
    dogActive.rotation.y = sections[0].dogRot

    const updateActivePositions = (secIndex, duration = 1.6) => {
      const section = sections[secIndex]
      if (!section) return

      const catScaleTarget = section.catScale * (catActive.userData.baseScale || 1)
      gsap.to(catActive.position, { x: section.catX, y: section.catY, duration, ease: 'power2.out' })
      gsap.to(catActive.scale, { x: catScaleTarget, y: catScaleTarget, z: catScaleTarget, duration, ease: 'power2.out' })
      gsap.to(catActive.rotation, { y: section.catRot, duration, ease: 'power2.out' })

      const dogScaleTarget = section.dogScale * (dogActive.userData.baseScale || 1)
      gsap.to(dogActive.position, { x: section.dogX, y: section.dogY, duration, ease: 'power2.out' })
      gsap.to(dogActive.scale, { x: dogScaleTarget, y: dogScaleTarget, z: dogScaleTarget, duration, ease: 'power2.out' })
      gsap.to(dogActive.rotation, { y: section.dogRot, duration, ease: 'power2.out' })
    }

    const triggers = sections.map((section, idx) => {
      const el = document.getElementById(section.id)
      if (!el) return null
      return ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          activeSectionIndex = idx
          updateActivePositions(idx)
        },
        onEnterBack: () => {
          activeSectionIndex = idx
          updateActivePositions(idx)
        },
      })
    }).filter(Boolean)

    // Dynamic GLTF Loading
    const gltfLoader = new GLTFLoader()
    const mixers = []

    // Load downloaded Cat model
    gltfLoader.load(
      '/cartoon_3d_cat.glb',
      (gltf) => {
        console.log("Successfully loaded Sketchfab cat model!")
        const catModel = gltf.scene
        catModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              child.material.roughness = 0.5
              child.material.sheen = 0.4
            }
          }
        })

        // Adjust loaded Sketchfab model scale
        catModel.scale.setScalar(0.9)

        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(catModel)
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play())
          mixers.push(mixer)
        }

        scene.add(catModel)
        scene.remove(catProcedural)

        catModel.userData = {
          body: catModel,
          headGroup: catModel,
          tailSegments: [],
          earLeft: new THREE.Group(),
          earRight: new THREE.Group(),
          baseScale: 1.0,
          isGLTF: true,
        }

        catActive = catModel
        updateActivePositions(activeSectionIndex, 0.1)
      },
      undefined,
      (err) => {
        console.log("cat.glb not present in public/models/ yet, using procedural Persian fallback. Perfect fail-safe state achieved.")
      }
    )

    // Load downloaded Dog model
    gltfLoader.load(
      '/dog_puppy.glb',
      (gltf) => {
        console.log("Successfully loaded Sketchfab dog model!")
        const dogModel = gltf.scene
        dogModel.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
            if (child.material) {
              child.material.roughness = 0.45
              child.material.sheen = 0.35
            }
          }
        })

        dogModel.scale.setScalar(0.7)

        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(dogModel)
          gltf.animations.forEach((clip) => mixer.clipAction(clip).play())
          mixers.push(mixer)
        }

        scene.add(dogModel)
        scene.remove(dogProcedural)

        dogModel.userData = {
          body: dogModel,
          headGroup: dogModel,
          tailSegments: [],
          earLeft: new THREE.Group(),
          earRight: new THREE.Group(),
          tongue: new THREE.Group(),
          baseScale: 0.72,
          isGLTF: true,
        }

        dogActive = dogModel
        updateActivePositions(activeSectionIndex, 0.1)
      },
      undefined,
      (err) => {
        console.log("dog.glb not present in public/models/ yet, using procedural Golden Retriever fallback. Perfect fail-safe state achieved.")
      }
    )

    const mouse = { x: 0, y: 0 }
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // Luminous botanical glowing orbs
    const orbMaterial = new THREE.MeshBasicMaterial({ color: 0xb58c28, transparent: true, opacity: 0.18 })
    const glowOrbs = []
    ;[[1.2, 0.9, -1.6], [-1.2, 0.75, -1.4], [0.4, 0.95, -1.9]].forEach((pos) => {
      const orb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), orbMaterial)
      orb.position.set(...pos)
      scene.add(orb)
      glowOrbs.push(orb)
    })

    const clock = new THREE.Clock()

    const animate = () => {
      requestAnimationFrame(animate)
      const elapsed = performance.now() * 0.001
      const delta = clock.getDelta()
      mixers.forEach(mixer => mixer.update(delta))

      camera.position.x = Math.sin(elapsed * 0.12) * 0.02
      camera.position.y = 0.85 + Math.sin(elapsed * 0.4) * 0.015
      camera.lookAt(0, 0, 0)

      ambientLight.intensity = 0.78 + Math.sin(elapsed * 0.45) * 0.03

      // Active Cat Head Mouse Follow
      if (catActive.userData.headGroup) {
        catActive.userData.headGroup.rotation.y = THREE.MathUtils.lerp(catActive.userData.headGroup.rotation.y, mouse.x * 0.34, 0.08)
        catActive.userData.headGroup.rotation.x = THREE.MathUtils.lerp(catActive.userData.headGroup.rotation.x, mouse.y * 0.18, 0.08)
      }

      // Active Dog Head Mouse Follow
      if (dogActive.userData.headGroup) {
        dogActive.userData.headGroup.rotation.y = THREE.MathUtils.lerp(dogActive.userData.headGroup.rotation.y, mouse.x * 0.20, 0.05)
        dogActive.userData.headGroup.rotation.x = THREE.MathUtils.lerp(dogActive.userData.headGroup.rotation.x, mouse.y * 0.12, 0.05)
      }

      // Procedural Cat tail swaying
      if (catActive.userData.tailSegments && catActive.userData.tailSegments.length > 0) {
        catActive.userData.tailSegments.forEach((segment, index) => {
          segment.rotation.x = -0.28 + Math.sin(elapsed * 2 + index * 0.5) * 0.12
          segment.rotation.y = Math.sin(elapsed * 1.9 + index * 0.75) * 0.06
        })
      }

      // Procedural Dog tail energetic wagging
      if (dogActive.userData.tailSegments && dogActive.userData.tailSegments.length > 0) {
        dogActive.userData.tailSegments.forEach((segment, index) => {
          segment.rotation.y = Math.sin(elapsed * 6 + index * 0.4) * 0.22
          segment.rotation.z = Math.sin(elapsed * 5.8 + index * 0.35) * 0.08
        })
      }

      // Ballpit floating animation
      const isHero = activeSectionIndex === 0
      const targetOpacity = isHero ? 1.0 : 0.0
      
      ballpit.forEach(ball => {
        // Gently float up and down
        ball.position.y = ball.userData.baseY + Math.sin(elapsed * ball.userData.speed + ball.userData.offset) * 0.4
        ball.position.x = ball.userData.baseX + Math.cos(elapsed * ball.userData.speed * 0.8 + ball.userData.offset) * 0.2
        
        // Rotate slightly
        ball.rotation.x += delta * 0.5
        ball.rotation.y += delta * 0.5

        // Fade in/out based on section
        if (ball.material) {
          ball.material.opacity = THREE.MathUtils.lerp(ball.material.opacity || 0, targetOpacity, 0.05)
          ball.material.transparent = true
          // If completely faded, push far away or scale to 0 to hide completely
          const targetScale = isHero ? 1 : 0.001;
          ball.scale.setScalar(THREE.MathUtils.lerp(ball.scale.x, targetScale, 0.05))
        }
      })

      // Procedural Cat ears swing
      if (catActive.userData.earLeft && catActive.userData.earRight && !catActive.userData.isGLTF) {
        const earSwing = Math.sin(elapsed * 2.4) * 0.05
        catActive.userData.earLeft.rotation.z = 0.22 + earSwing
        catActive.userData.earRight.rotation.z = -0.22 - earSwing
      }

      // Procedural Dog ears floppy swing
      if (dogActive.userData.earLeft && dogActive.userData.earRight && !dogActive.userData.isGLTF) {
        const dogEarSwing = Math.sin(elapsed * 3) * 0.04
        dogActive.userData.earLeft.rotation.z = 0.25 + dogEarSwing
        dogActive.userData.earRight.rotation.z = -0.25 - dogEarSwing
      }

      // Procedural Dog tongue panting
      if (dogActive.userData.tongue && !dogActive.userData.isGLTF) {
        dogActive.userData.tongue.position.z = 0.48 + Math.sin(elapsed * 4.5) * 0.02
      }

      // Active Cat Breathing
      if (catActive.userData.body) {
        const breath = 1 + Math.sin(elapsed * 2.5) * 0.012
        if (catActive.userData.isGLTF) {
          catActive.userData.body.scale.setScalar(0.9 * breath)
        } else {
          catActive.userData.body.scale.set(1.15 * (1 - (breath - 1) * 0.03), 0.78 * breath, 1.48 * (1 - (breath - 1) * 0.03))
        }
      }

      // Active Dog Breathing
      if (dogActive.userData.body) {
        const dogBreath = 1 + Math.sin(elapsed * 2.2) * 0.015
        if (dogActive.userData.isGLTF) {
          dogActive.userData.body.scale.setScalar(0.7 * dogBreath)
        } else {
          dogActive.userData.body.scale.set(1.22 * (1 - (dogBreath - 1) * 0.03), 0.88 * dogBreath, 1.62 * (1 - (dogBreath - 1) * 0.03))
        }
      }

      // Plants organic sway
      plants.forEach((plant, index) => {
        plant.rotation.y = Math.sin(elapsed * 1.2 + index * 0.5) * 0.05
        plant.rotation.x = Math.sin(elapsed * 0.8 + index * 0.3) * 0.03
      })

      // Flowers organic sway
      flowers.forEach((flower, index) => {
        flower.rotation.z = Math.sin(elapsed * 1.5 + index * 0.4) * 0.04
        flower.rotation.x = Math.sin(elapsed * 1.1 + index * 0.25) * 0.03
      })

      // Butterflies flapping + organic hovering paths
      butterflies.forEach((bf) => {
        const flap = Math.sin(elapsed * 18 + bf.userData.seed) * 0.95
        bf.userData.wingLeft.rotation.z = -flap
        bf.userData.wingRight.rotation.z = flap

        bf.position.x = bf.userData.basePos.x + Math.sin(elapsed * 0.8 + bf.userData.seed) * 0.28
        bf.position.y = bf.userData.basePos.y + Math.sin(elapsed * 1.5 + bf.userData.seed) * 0.18
        bf.position.z = bf.userData.basePos.z + Math.cos(elapsed * 0.6 + bf.userData.seed) * 0.2
      })

      // Glowing botanical orbs sways
      glowOrbs.forEach((orb, index) => {
        orb.position.y = 0.9 + Math.sin(elapsed * 1.4 + index * 1.3) * 0.08
        orb.material.opacity = 0.14 + Math.sin(elapsed * 2 + index * 0.7) * 0.06
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      triggers.forEach((trigger) => trigger.kill())
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
}
