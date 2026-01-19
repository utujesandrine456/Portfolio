declare global {
  interface OffscreenCanvas extends EventTarget {
    width: number
    height: number
    getContext(contextId: string, options?: any): any
    convertToBlob(options?: any): Promise<Blob>
    transferToImageBitmap(): ImageBitmap
  }
  
  var OffscreenCanvas: {
    prototype: OffscreenCanvas
    new (width: number, height: number): OffscreenCanvas
  }

  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      group: any
      // Geometries
      octahedronGeometry: any
      boxGeometry: any
      sphereGeometry: any
      planeGeometry: any
      // Lights
      ambientLight: any
      pointLight: any
      directionalLight: any
      spotLight: any

      meshStandardMaterial: any
      meshBasicMaterial: any
      meshPhongMaterial: any

      [elemName: string]: any
    }
  }
}

export {}

