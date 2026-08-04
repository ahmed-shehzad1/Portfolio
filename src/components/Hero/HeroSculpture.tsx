import { useMemo, useRef, useEffect } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { SCULPTURE_SCALE, isMobile, prefersReducedMotion } from './HeroConfig';

// Procedural layered shell sculpture: multiple lathe shells with small offsets
const makeProfile = (segments = 48) => {
  const points: [number, number][] = [];
  for (let i = 0; i < segments; i++) {
    const t = i / (segments - 1);
    // profile that creates a tall, organic silhouette
    const r = 0.15 + Math.pow(t, 1.2) * 0.9 + Math.sin(t * Math.PI * 3.0) * 0.02;
    const y = (t - 0.5) * 2.2; // -1.1 .. 1.1
    points.push([r, y]);
  }
  return points;
};

const buildLathe = (profile: [number, number][], segments = 80) => {
  const pts = profile.map(([r, y]) => new THREE.Vector2(r, y));
  return new THREE.LatheGeometry(pts, segments, 0, Math.PI * 2);
};

const HeroSculpture: FC = () => {
  const groupRef = useRef<THREE.Group | null>(null);
  const innerRef = useRef<THREE.Mesh | null>(null);
  const reduced = prefersReducedMotion();
  const mobile = isMobile();

  const profile = useMemo(() => makeProfile(64), []);
  const baseGeo = useMemo(() => buildLathe(profile, 120), [profile]);

  // create three shells with slight scale and noise
  const shells = useMemo(() => {
    const shellGeos = [];
    for (let i = 0; i < 3; i++) {
      const geo = baseGeo.clone();
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      for (let v = 0; v < arr.length; v += 3) {
        const nx = arr[v] + (Math.random() - 0.5) * 0.01 * (i + 1);
        const ny = arr[v + 1] + (Math.random() - 0.5) * 0.01 * (i + 1);
        const nz = arr[v + 2] + (Math.random() - 0.5) * 0.01 * (i + 1);
        arr[v] = nx;
        arr[v + 1] = ny;
        arr[v + 2] = nz;
      }
      geo.scale((1 + i * 0.03) * SCULPTURE_SCALE, (1 + i * 0.03) * SCULPTURE_SCALE, (1 + i * 0.03) * SCULPTURE_SCALE);
      geo.computeVertexNormals();
      shellGeos.push(geo);
    }
    return shellGeos;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseGeo]);

  // materials
  const transmissionMaterial = useMemo(() => {
    // if MeshTransmissionMaterial is available, prefer it; otherwise fallback
    try {
      const MeshTransmissionMaterialCtor = MeshTransmissionMaterial as unknown as new (props: any) => any;
      const mat = new MeshTransmissionMaterialCtor({
        samples: 8,
        toneMapped: true,
        transmission: 0.95,
        chromaticAberration: 0.06,
        anisotropy: 0.1,
        distortion: 0.04,
        thickness: 0.8,
        roughness: 0.02,
        metalness: 0.0,
        clearcoat: 0.2,
        clearcoatRoughness: 0.05,
        ior: 1.2,
      } as any);
      return mat as any;
    } catch {
      // fallback
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0xffffff),
        transmission: 0.9,
        thickness: 0.8,
        roughness: 0.04,
        metalness: 0.0,
        transparent: true,
        envMapIntensity: 1.0,
      });
      return mat;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // cleanup on unmount
    return () => {
      shells.forEach((g) => g.dispose());
      (transmissionMaterial as any)?.dispose?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      // slow, elegant rotation
      groupRef.current.rotation.y += reduced ? 0.0005 : 0.003;
      groupRef.current.rotation.x = Math.sin(t * 0.07) * 0.03;
      // subtle bob
      groupRef.current.position.y += (Math.sin(t * 0.4) * 0.02 - groupRef.current.position.y) * 0.06;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y += reduced ? 0.001 : 0.006;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* outer shells */}
      {shells.map((geo, idx) => (
        <mesh
          key={idx}
          geometry={geo}
          castShadow={false}
          receiveShadow={false}
          position={[0, 0, 0]}
          rotation={[0, idx === 1 ? 0.1 : 0, 0]}
          onPointerDown={() => {
            // gentle interactive response (no global side effects)
            if (groupRef.current) groupRef.current.rotation.y += 0.08;
          }}
        >
          <primitive object={transmissionMaterial} />
        </mesh>
      ))}

      {/* inner emissive core */}
      <mesh ref={innerRef} position={[0, 0.02, 0]} scale={mobile ? 0.45 : 0.6}>
        <icosahedronGeometry args={[0.45, 4]} />
        <meshStandardMaterial color="#a7f0ff" emissive="#48d8ff" emissiveIntensity={0.9} roughness={0.25} metalness={0.05} />
      </mesh>
    </group>
  );
};

export default HeroSculpture;