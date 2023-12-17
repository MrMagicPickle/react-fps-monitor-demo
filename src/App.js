import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useFpsMonitor } from 'react-fps-monitor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls });

function Controls() {
  const controls = useRef()
  const { camera, gl } = useThree()
  useFrame(() => controls.current.update())
  return <orbitControls ref={controls} args={[camera, gl.domElement]} enableDamping dampingFactor={0.1} rotateSpeed={0.5} />
}

function Spheres() {
  const { levelOfDetail } = useFpsMonitor();
  const renderHighQuality = () => {
    return (
      Array.from({ length: 10000 }).map((_, index) => (
        <mesh key={index} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, ]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))
    )
  }

  const renderLowQuality = () => {
    return(
      Array.from({ length: 1000 }).map((_, index) => (
        <mesh key={index} position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, ]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh>
      ))
    )
  }

  return (
    levelOfDetail === 'high' ? renderHighQuality() : renderLowQuality()
  )
}

function App() {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <Canvas>
        <ambientLight />
        <Spheres/>
        <Controls/>
      </Canvas>
    </div>

  );
}

export default App;
