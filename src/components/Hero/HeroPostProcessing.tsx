import React, { useMemo } from 'react';
import type { FC } from 'react';
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise, DepthOfField } from '@react-three/postprocessing';
import { isMobile, prefersReducedMotion } from './HeroConfig';

const HeroPostProcessing: FC = () => {
  const mobile = isMobile();
  const reduced = prefersReducedMotion();

  const bloomConfig = useMemo(
    () => ({
      luminanceThreshold: 0.65,
      luminanceSmoothing: 0.2,
      height: 300,
      opacity: mobile ? 0.6 : 1.0,
      kernelSize: 3,
    }),
    [mobile]
  );

  if (mobile || reduced) {
    // Minimal processing on mobile or when reduced-motion is requested
    return (
      <EffectComposer>
        <Noise opacity={0.02} />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={4}>
      <Bloom {...bloomConfig} />
      <DepthOfField focusDistance={0.02} focalLength={0.7} bokehScale={4} height={480} />
      <ChromaticAberration offset={[0.0015, 0.002]} />
      <Vignette eskil={false} offset={0.05} darkness={0.35} />
      <Noise opacity={0.02} />
    </EffectComposer>
  );
};

export default HeroPostProcessing;