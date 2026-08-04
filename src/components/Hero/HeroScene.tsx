import React from 'react';
import type { FC } from 'react';
import HeroCamera from './HeroCamera';
import HeroLighting from './HeroLighting';
import HeroEnvironment from './HeroEnvironment';
import HeroSculpture from './HeroSculpture';
import HeroBackground from './HeroBackground';
import HeroPostProcessing from './HeroPostProcessing';

const HeroScene: FC = () => {
  return (
    <>
      <HeroCamera />
      <HeroLighting />
      <HeroEnvironment />
      <HeroBackground />
      <HeroSculpture />
      <HeroPostProcessing />
    </>
  );
};

export default HeroScene;