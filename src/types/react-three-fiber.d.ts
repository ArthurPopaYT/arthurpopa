declare module '@react-three/fiber' {
  import * as THREE from 'three';
  import * as React from 'react';

  export type Canvas = React.FC<{
    children: React.ReactNode;
    camera?: any;
    style?: React.CSSProperties;
    gl?: any;
    shadows?: boolean;
    orthographic?: boolean;
    frameloop?: 'always' | 'demand' | 'never';
    performance?: {
      current?: number;
      min?: number;
      max?: number;
      debounce?: number;
    };
    // Add other Canvas props as needed
    [key: string]: any;
  }>;

  export const Canvas: Canvas;

  export type useFrame = (callback: (state: any, delta: number) => void, renderPriority?: number) => void;
  export const useFrame: useFrame;

  export type useThree = () => {
    gl: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.Camera;
    size: { width: number; height: number };
    viewport: {
      width: number;
      height: number;
      factor: number;
    };
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
    clock: THREE.Clock;
    invalidate: () => void;
    advance: (timestamp: number, runGlobalEffects?: boolean) => void;
    performance: {
      current: number;
      min: number;
      max: number;
      debounce: number;
    };
    setEvents: (events: any) => void;
  };
  export const useThree: useThree;
}

declare module '@react-three/drei' {
  import * as React from 'react';
  import * as THREE from 'three';

  export const Environment: React.FC<any>;
  export const OrbitControls: React.FC<any>;
  export const Text: React.FC<any>;
  export const useGLTF: (url: string) => any;
  // Add other exports as needed
}

declare module '@react-three/postprocessing' {
  import * as React from 'react';

  export const EffectComposer: React.FC<any>;
  export const Bloom: React.FC<any>;
  // Add other exports as needed
}

declare module 'framer-motion-3d' {
  import * as React from 'react';
  
  export const motion: {
    [key: string]: any;
    // Add specific motion properties as needed
  };
  
  // Add other exports as needed
} 