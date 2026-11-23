import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import Tawa from './Tawa'

function SceneContent() {
  const tawa = useRef()

  useFrame((state, delta) => {
    if (!tawa.current) return
    const ease = Math.min(1, delta * 3)
    tawa.current.rotation.y += delta * 0.08
    tawa.current.rotation.x += (state.pointer.y * 0.14 - tawa.current.rotation.x) * ease
    tawa.current.rotation.z += (-state.pointer.x * 0.12 - tawa.current.rotation.z) * ease
  })

  return (
    <>
      <ambientLight intensity={1.4} />
      <spotLight position={[3, 5, 4]} intensity={42} angle={0.55} penumbra={0.8} color="#ffb35f" />
      <pointLight position={[-3, 1, 2]} intensity={10} color="#ffb05c" />
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.14}>
        <Tawa groupRef={tawa} />
      </Float>
      <mesh position={[-0.4, -0.52, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 48]} />
        <meshBasicMaterial color="#b9855a" transparent opacity={0.1} />
      </mesh>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 2.4, 6.8], fov: 42 }}
      dpr={[1, 1.35]}
      gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
    >
      <SceneContent />
    </Canvas>
  )
}
