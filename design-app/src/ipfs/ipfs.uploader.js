
import { fs } from './ipfs.client.js';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { initIpfs } from './ipfs.client.js';
/**
 * Uploads a file (as Uint8Array or Blob) to IPFS
 * @param {File | Blob} file 
 * @returns {Promise<string>} CID of uploaded file
 */
await initIpfs(); 
export async function uploadToIpfs(file) {
  const buffer = new Uint8Array(await file.arrayBuffer())
  const cid = await fs.addFile({ content: buffer })
  return cid.toString()
}

/**
 * Downloads a file from IPFS using its CID
 * @param {string} cidStr 
 * @returns {Promise<string>} File content as string
 */
export async function downloadFromIpfs(cidStr) {
  const decoder = new TextDecoder()
  const chunks = []

  for await (const chunk of fs.cat(cidStr)) {
    chunks.push(chunk)
  }

  return decoder.decode(Uint8Array.from(chunks.flat()))
}
