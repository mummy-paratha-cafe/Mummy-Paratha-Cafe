import { useMemo } from 'react'
import * as THREE from 'three'

export default function Tawa({ groupRef }) {
  const profile = useMemo(() => [
    new THREE.Vector2(0, 0.13),
    new THREE.Vector2(0.58, 0.13),
    new THREE.Vector2(1.02, 0.15),
    new THREE.Vector2(1.22, 0.18),
    new THREE.Vector2(1.32, 0.23),
    new THREE.Vector2(1.39, 0.2),
    new THREE.Vector2(1.35, 0.1),
    new THREE.Vector2(1.2, 0.01),
    new THREE.Vector2(0.72, -0.04),
    new THREE.Vector2(0, -0.045),
  ], [])

  return (
    <group ref={groupRef} position={[-0.4, -0.04, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 96]} />
        <meshStandardMaterial color="#353431" roughness={0.38} metalness={0.62} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.205, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.34, 0.055, 14, 96]} />
        <meshStandardMaterial color="#a19a8b" roughness={0.3} metalness={0.78} />
      </mesh>
      <mesh position={[0, 0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.012, 8, 72]} />
        <meshStandardMaterial color="#77736c" roughness={0.42} metalness={0.62} />
      </mesh>
      <mesh position={[1.68, 0.08, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, 1.04, 24]} />
        <meshStandardMaterial color="#77736a" roughness={0.34} metalness={0.72} />
      </mesh>
      <mesh position={[2.7, 0.08, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.095, 1.25, 28]} />
        <meshStandardMaterial color="#825031" roughness={0.46} metalness={0.08} />
      </mesh>
      <mesh position={[3.32, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.07, 0.018, 8, 24]} />
        <meshStandardMaterial color="#603c28" roughness={0.5} />
      </mesh>
      <mesh position={[1.08, 0.16, 0.23]} scale={[1, 0.72, 1]}>
        <sphereGeometry args={[0.045, 16, 12]} />
        <meshStandardMaterial color="#c5bdae" roughness={0.24} metalness={0.84} />
      </mesh>
      <mesh position={[1.08, 0.16, -0.23]} scale={[1, 0.72, 1]}>
        <sphereGeometry args={[0.045, 16, 12]} />
        <meshStandardMaterial color="#c5bdae" roughness={0.24} metalness={0.84} />
      </mesh>
      <mesh position={[0, -0.39, 0]} scale={[1, 0.4, 0.72]}>
        <sphereGeometry args={[0.9, 24, 16]} />
        <meshBasicMaterial color="#f47722" transparent opacity={0.18} />
      </mesh>
      <pointLight position={[0, -0.28, 0]} color="#ff7622" intensity={5} distance={3.5} />
    </group>
  )
}
