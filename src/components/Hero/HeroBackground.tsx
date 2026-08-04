import React, { useMemo, useRef, useEffect } from 'react';
import type { FC } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';

// Lightweight aurora shader inlined (layered bands + fbm-like noise)
const auroraVert = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const auroraFrag = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform float u_time;
uniform vec2 u_resolution;

float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = rand(i);
  float b = rand(i + vec2(1.0,0.0));
  float c = rand(i + vec2(0.0,1.0));
  float d = rand(i + vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}

void main(){
  vec2 uv = vUv * vec2(u_resolution.x/u_resolution.y, 1.0);
  float t = u_time * 0.06;
  float n = 0.0;
  float freq = 1.0;
  float amp = 0.6;
  for(int i=0;i<3;i++){
    n += noise((uv * freq) + vec2(0.0,t*0.3)) * amp;
    freq *= 1.9;
    amp *= 0.5;
  }
  float bands = smoothstep(0.35, 0.7, n + uv.y*1.2);
  vec3 base = mix(vec3(0.01,0.01,0.03), vec3(0.03,0.08,0.12), uv.y+0.2);
  vec3 aur = vec3(0.12,0.9,0.8) * bands;
  float vign = smoothstep(1.2, 0.2, length((vUv-0.5)*vec2(1.0,1.6)));
  vec3 col = mix(base, aur + base*0.2, bands) * vign;
  gl_FragColor = vec4(pow(col, vec3(1.0/2.2)), clamp(bands*0.9 + 0.2, 0.0, 1.0));
}
`;

const HeroBackground: FC = () => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();

  useEffect(() => {
    materialRef.current = new THREE.ShaderMaterial({
      vertexShader: auroraVert,
      fragmentShader: auroraFrag,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      side: THREE.BackSide,
      depthWrite: false,
      transparent: true,
    });

    return () => {
      materialRef.current?.dispose();
      materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.u_resolution.value.set(size.width, size.height);
    }
  });

  // huge sphere surrounding the scene
  return (
    <mesh ref={meshRef} scale={[1, 1, 1]}>
      <sphereGeometry args={[40, 48, 32]} />
      {/* @ts-expect-error shader material */}
      <primitive object={materialRef.current ?? new THREE.MeshBasicMaterial({ color: '#000' })} />
    </mesh>
  );
};

export default HeroBackground;