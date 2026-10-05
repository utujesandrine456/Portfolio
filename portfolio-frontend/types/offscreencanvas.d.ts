interface OffscreenCanvas extends EventTarget {
  width: number
  height: number
  getContext(contextId: string, options?: any): any
  convertToBlob(options?: any): Promise<Blob>
  transferToImageBitmap(): ImageBitmap
}

declare var OffscreenCanvas: {
  prototype: OffscreenCanvas
  new (width: number, height: number): OffscreenCanvas
}

