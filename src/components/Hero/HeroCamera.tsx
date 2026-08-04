import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { isMobile, prefersReducedMotion } from './HeroConfig';

const HeroCamera: FC = () => {
  const { camera, gl } = useThree();
  const perspectiveCamera = camera as THREE.PerspectiveCamera;
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const reduced = prefersReducedMotion();

  useEffect(() => {
    perspectiveCamera.position.set(0, 0.15, 8);
    perspectiveCamera.fov = 40;
    perspectiveCamera.updateProjectionMatrix();
  }, [perspectiveCamera]);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const w = gl.domElement.clientWidth || window.innerWidth;
      const h = gl.domElement.clientHeight || window.innerHeight;
      target.current.x = (e.clientX / w) * 2 - 1;
      target.current.y = -((e.clientY / h) * 2 - 1);
    };
    gl.domElement.addEventListener('pointermove', handler, { passive: true });
    return () => gl.domElement.removeEventListener('pointermove', handler);
  }, [gl.domElement]);

  useFrame((state, _delta) => {
    // breathe
    const t = state.clock.elapsedTime;
    const breath = Math.sin(t * 0.25) * 0.03;
    perspectiveCamera.position.y += (breath - perspectiveCamera.position.y) * 0.05;

    // smooth pointer
    pointer.current.x += (target.current.x - pointer.current.x) * 0.06;
    pointer.current.y += (target.current.y - pointer.current.y) * 0.06;

    // parallax & micro-rotation (reduced on mobile or reduced-motion)
    const parallaxScale = isMobile() ? 0.25 : 0.6;
    const rotScale = reduced ? 0.02 : 0.04;
    const x = pointer.current.x * parallaxScale;
    const y = pointer.current.y * parallaxScale * 0.5;

    perspectiveCamera.position.x += (x - perspectiveCamera.position.x) * 0.06;
    perspectiveCamera.position.z += ((8 - Math.abs(pointer.current.x) * 0.5) - perspectiveCamera.position.z) * 0.02;
    perspectiveCamera.rotation.x = THREE.MathUtils.lerp(perspectiveCamera.rotation.x, y * rotScale, 0.06);
    perspectiveCamera.rotation.y = THREE.MathUtils.lerp(perspectiveCamera.rotation.y, -x * rotScale, 0.06);
    perspectiveCamera.updateProjectionMatrix();
  });

  return null;
};

export default HeroCamera;