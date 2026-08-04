import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HeroLighting: FC = () => {
  const keyRef = useRef<THREE.DirectionalLight | null>(null);
  const rimRef = useRef<THREE.DirectionalLight | null>(null);
  const fillRef = useRef<THREE.AmbientLight | null>(null);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const key = new THREE.DirectionalLight(new THREE.Color(0xffffff), 1.0);
    key.position.set(4.0, 3.5, 5.5);
    keyRef.current = key;

    const rim = new THREE.DirectionalLight(new THREE.Color(0x9ad6ff), 0.45);
    rim.position.set(-3.0, 2.0, -4.0);
    rimRef.current = rim;

    const fill = new THREE.AmbientLight(new THREE.Color(0x101216), 0.6);
    fillRef.current = fill;

    scene.add(key, rim, fill);

    return () => {
      scene.remove(key, rim, fill);
      key.dispose?.();
      rim.dispose?.();
    };
    // scene is stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (keyRef.current) {
      // subtle slow color shift and intensity modulation
      keyRef.current.intensity = 0.9 + Math.sin(t * 0.12) * 0.05;
      keyRef.current.color.lerp(new THREE.Color(0xffffff), 0.02);
    }
    if (rimRef.current) {
      rimRef.current.intensity = 0.35 + Math.cos(t * 0.09) * 0.06;
    }
  });

  return null;
};

export default HeroLighting;