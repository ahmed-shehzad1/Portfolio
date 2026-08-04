// src/components/3d/VolumetricEnvironment.tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function VolumetricEnvironment() {
  const blueLightRef = useRef<THREE.PointLight>(null);
  const purpleLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (blueLightRef.current) {
      blueLightRef.current.position.x = Math.sin(time * 0.3) * 5;
      blueLightRef.current.position.z = Math.cos(time * 0.2) * 5;
      blueLightRef.current.position.y = Math.sin(time * 0.4) * 2;
    }

    if (purpleLightRef.current) {
      purpleLightRef.current.position.x = Math.cos(time * 0.25) * -6;
      purpleLightRef.current.position.z = Math.sin(time * 0.35) * -6;
      purpleLightRef.current.position.y = Math.cos(time * 0.15) * 3;
    }
  });

  return (
    <>
      <color attach="background" args={['#03030a']} />
      <fogExp2 attach="fog" args={['#03030a', 0.08]} />
      
      <ambientLight intensity={0.15} color="#e0e5ff" />
      
      <directionalLight 
        position={[10, 15, 10]} 
        intensity={1.5} 
        color="#7090ff" 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-near={0.1}
        shadow-bias={-0.0001}
      />

      <pointLight 
        ref={blueLightRef} 
        intensity={3} 
        color="#3a60ff" 
        distance={15} 
        decay={2} 
      />
      <pointLight 
        ref={purpleLightRef} 
        intensity={4} 
        color="#9d4edd" 
        distance={20} 
        decay={2} 
      />

      <Sparkles 
        count={250} 
        scale={12} 
        size={1.5} 
        speed={0.3} 
        opacity={0.4} 
        color="#a5bfff" 
        noise={1}
      />
      
      <Environment preset="night" environmentIntensity={0.6} />
    </>
  );
}