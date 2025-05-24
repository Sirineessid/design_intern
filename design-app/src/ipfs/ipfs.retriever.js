import { car } from 'ipfs-car';
import { verifiedFetch } from './ipfs.client';

// AES-GCM decryption using Web Crypto API
async function decryptAESGCM(key, encrypted) {
  // Assuming the first 12 bytes are the IV
  const iv = encrypted.slice(0, 12);
  const ciphertext = encrypted.slice(12);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    key,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
  return await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    ciphertext
  );
}

export async function loadRecording(cid, decryptionKey) {
  // 1. Fetch CAR by CID
  const resp = await verifiedFetch(cid);
  const carBytes = await resp.arrayBuffer();

  // 2. Unpack CAR (ipfs-car can read)
  const { root, blocks } = await car.readAll(new Uint8Array(carBytes));
  const encrypted = blocks.get(root).bytes;

  // 3. Decrypt using Web Crypto API
  const decrypted = await decryptAESGCM(decryptionKey, encrypted);
  return new Blob([decrypted], { type: 'video/webm' }); // ready for playback
}