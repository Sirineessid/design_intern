// Empty shim for dgram module
export function createSocket() {
  throw new Error('dgram.createSocket is not supported in the browser')
}

export default {
  createSocket
}
