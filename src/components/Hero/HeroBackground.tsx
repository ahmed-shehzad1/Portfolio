import { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';

const HeroBackground: FC = () => {
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#05070f',
        side: THREE.BackSide,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[45, 48, 32]} />
      <primitive object={material} />
    </mesh>
  );
};

export default HeroBackground;
