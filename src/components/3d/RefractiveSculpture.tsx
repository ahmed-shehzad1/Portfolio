// src/components/3d/RefractiveSculpture.tsx
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export function RefractiveSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const [hovered, setHovered] = useState(false);

  // Generate an optimized, expensive-looking abstract geometry
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 20);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;
    
    if (hovered) {
      document.body.style.cursor = 'pointer';
      gsap.to(meshRef.current.scale, {
        x: 1.15,
        y: 1.15,
        z: 1.15,
        duration: 0.8,
        ease: 'power3.out',
      });
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          chromaticAberration: 0.15,
          distortion: 0.6,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    } else {
      document.body.style.cursor = 'auto';
      gsap.to(meshRef.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.8,
        ease: 'power3.out',
      });
      if (materialRef.current) {
        gsap.to(materialRef.current, {
          chromaticAberration: 0.05,
          distortion: 0.2,
          duration: 0.8,
          ease: 'power3.out',
        });
      }
    }

    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered]);

  useFrame(({ clock, pointer }) => {
    if (!meshRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Idle rotation
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.x = time * 0.08;
    
    // Smooth mouse parallax
    const targetX = pointer.x * 0.8;
    const targetY = pointer.y * 0.8;
    
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x, 
      targetX, 
      0.05
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y, 
      targetY, 
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
        receiveShadow
      >
        <MeshTransmissionMaterial
          ref={materialRef}
          background={new THREE.Color('#03030a')}
          thickness={2.5}
          roughness={0.05}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.05}
          anisotropicBlur={0.2}
          distortion={0.2}
          distortionScale={0.4}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationColor="#a6b8ff"
          attenuationDistance={1.5}
          resolution={512}
        />
      </mesh>
    </Float>
  );
}