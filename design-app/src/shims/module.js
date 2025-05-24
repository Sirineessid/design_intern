// Empty shim for module
export function createRequire() {
  throw new Error('module.createRequire is not supported in the browser')
}

export default {
  createRequire
}
