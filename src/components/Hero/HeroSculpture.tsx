import { useEffect, useMemo, useRef } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { SCULPTURE_SCALE, prefersReducedMotion } from './HeroConfig';

const HeroSculpture: FC = () => {
  const groupRef = useRef<THREE.Group | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const reduced = prefersReducedMotion();

  const outerMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#d8dff7'),
        roughness: 0.22,
        metalness: 0.05,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        transparent: true,
        opacity: 0.9,
      }),
    [],
  );

  const innerMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#f6f8ff',
        emissive: '#d8e0ff',
        emissiveIntensity: 0.25,
        roughness: 0.2,
        metalness: 0.1,
      }),
    [],
  );

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b8c4e3',
        roughness: 0.35,
        metalness: 0.15,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      outerMaterial.dispose();
      innerMaterial.dispose();
      ringMaterial.dispose();
    };
  }, [innerMaterial, outerMaterial, ringMaterial]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y += reduced ? 0.0006 : 0.0022;
      groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.015;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += reduced ? 0.0008 : 0.0035;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.18, 0]} scale={[SCULPTURE_SCALE, SCULPTURE_SCALE, SCULPTURE_SCALE]}>
      <mesh>
        <sphereGeometry args={[0.7, 64, 64]} />
        <primitive object={outerMaterial} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.05, 30, 120]} />
        <primitive object={ringMaterial} />
      </mesh>

      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.24, 32, 32]} />
        <primitive object={innerMaterial} />
      </mesh>
    </group>
  );
};

export default HeroSculpture;
