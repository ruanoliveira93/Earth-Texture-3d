import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Stars, useTexture } from '@react-three/drei';
import { useRef } from 'react'
import './App.css'

function AnimateRotate() {
  const earthRef = useRef();
  const [earthMap, cloudMap] = useTexture([
    '/textures/earth_texture.jpg',
    '/textures/cloud_texture.jpg'
  ])

  useFrame(() => {
    earthRef.current.rotation.y -= 0.003
  })

  return (
    <mesh ref={earthRef}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial map={earthMap} />
      </Sphere>

      <Sphere args={[1.01, 64, 64]}>
        <meshStandardMaterial map={cloudMap} transparent opacity={0.4} />
      </Sphere>
    </mesh>
  )
}

export default function App() {

  return (
    <>
      <div id="canvas-container">
        <Canvas camera={{ position: [4, 0, -4], fov: 50 }}>
          <ambientLight intensity={0.05}/>
          <pointLight position={[5, 5, 5]} intensity={1} />
          <Stars factor={2} fade radius={30} depth={60} speed={0.5} />
          <AnimateRotate />
          <directionalLight position={[5, 0, 0]} intensity={5} shadow={5} />
          <OrbitControls enableZoom={true} zoomToCursor={true} />
        </Canvas>
      </div>
    </>
  )
}
