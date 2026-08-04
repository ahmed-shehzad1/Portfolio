import React, { useMemo } from 'react';
import type { FC } from 'react';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const HeroEnvironment: FC = () => {
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
    tex.encoding = THREE.sRGBEncoding;
    return tex;
  }, []);

  return (
    <>
      <Environment background={false} files={undefined} preset={undefined}>
        {/* fallback environment using small data texture to feed reflections */}
        <mesh>
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial map={tex} />
        </mesh>
      </Environment>
      {/* subtle fog for depth */}
      <fog attach="fog" args={['#000007', 8, 28]} />
    </>
  );
};

export default HeroEnvironment;