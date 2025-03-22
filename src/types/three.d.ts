declare module 'three' {
  export class Vector2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
  }

  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
  }

  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string);
    x: number;
    y: number;
    z: number;
    order: string;
  }

  export class Quaternion {
    constructor(x?: number, y?: number, z?: number, w?: number);
    x: number;
    y: number;
    z: number;
    w: number;
  }

  export class Matrix4 {
    constructor();
    elements: number[];
  }

  export class BufferAttribute {
    constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean);
    count: number;
    array: ArrayLike<number>;
    itemSize: number;
  }

  export class BufferGeometry {
    constructor();
    setAttribute(name: string, attribute: BufferAttribute): BufferGeometry;
    attributes: {
      [key: string]: BufferAttribute;
    };
  }

  export class Material {
    constructor();
    opacity: number;
    transparent: boolean;
    color: any;
    emissive: any;
    emissiveIntensity: number;
  }

  export class MeshStandardMaterial extends Material {
    constructor(parameters?: any);
  }

  export class LineBasicMaterial extends Material {
    constructor(parameters?: any);
    linewidth: number;
  }

  export class Mesh {
    constructor(geometry?: BufferGeometry, material?: Material);
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
  }

  export class Group {
    constructor();
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    add(...objects: any[]): Group;
  }

  export class Scene {
    constructor();
    add(...objects: any[]): Scene;
  }

  export class Camera {
    constructor();
    position: Vector3;
  }

  export class WebGLRenderer {
    constructor(parameters?: any);
    render(scene: Scene, camera: Camera): void;
    setSize(width: number, height: number): void;
  }

  export class Raycaster {
    constructor();
    setFromCamera(coords: Vector2, camera: Camera): void;
    intersectObjects(objects: any[], recursive?: boolean): any[];
  }

  export class Clock {
    constructor(autoStart?: boolean);
    getDelta(): number;
    getElapsedTime(): number;
  }

  // Add other classes and interfaces as needed
} 