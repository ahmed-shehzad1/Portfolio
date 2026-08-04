import { useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const HeroEnvironment: FC = () => {
  const { scene } = useThree();

  // Create a tiny HDR-like env map procedurally (spherical gradient captured in cube)
  const tex = useMemo(() => {
    // gradient texture canvas
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, '#0f1720');
    grad.addColorStop(0.5, '#081118');
    grad.addColorStop(1, '#021018');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  useEffect(() => {
    scene.environment = tex;
    scene.background = new THREE.Color('#020203');

    return () => {
      scene.environment = null;
      scene.background = null;
    };
  }, [scene, tex]);

  return (
    <>
      {/* subtle fog for depth */}
      <fog attach="fog" args={['#000007', 8, 28]} />
    </>
  );
};

export default HeroEnvironment;