import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import type { FC } from 'react';
import * as THREE from 'three';
import HeroScene from './HeroScene';
import { DPR } from './HeroConfig';

const HeroCanvas: FC = () => {
  const dpr = DPR();

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
        }}
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 40 }}
        style={{ width: '100vw', height: '100vh', display: 'block' }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroCanvas;