import { useEffect } from 'react';
import type { FC } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const HeroLighting: FC = () => {
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const key = new THREE.DirectionalLight(new THREE.Color(0xffffff), 0.85);
    key.position.set(2.5, 3.5, 4.3);

    const fill = new THREE.AmbientLight(new THREE.Color(0xffffff), 0.25);

    scene.add(key, fill);

    return () => {
      scene.remove(key, fill);
      key.dispose?.();
    };
  }, [scene]);

  return null;
};

export default HeroLighting;