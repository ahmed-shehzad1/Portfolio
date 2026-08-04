// src/components/3d/CanvasContainer.tsx
import { Component, Suspense } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class CanvasErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('WebGL Rendering Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full items-center justify-center bg-[#050510] text-zinc-400">
            <p>Failed to initialize WebGL context.</p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

interface CanvasContainerProps {
  children: ReactNode;
  className?: string;
}

export function CanvasContainer({ children, className = '' }: CanvasContainerProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#050510] ${className}`}>
      <CanvasErrorBoundary>
        <Canvas
          shadows="soft"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 1000 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
            outputColorSpace: THREE.SRGBColorSpace,
            stencil: false,
            depth: true,
          }}
        >
          <Suspense fallback={null}>
            {children}
            <Preload all />
            <AdaptiveDpr pixelated={false} />
            <AdaptiveEvents />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}