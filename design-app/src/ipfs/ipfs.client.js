
import { createHelia } from 'helia';
import { unixfs }     from '@helia/unixfs';
import { createVerifiedFetch } from '@helia/verified-fetch';
import { createLibp2p }       from 'libp2p';
import { webSockets }          from '@libp2p/websockets';
import { webRTC }              from '@libp2p/webrtc';
import { noise }               from '@chainsafe/libp2p-noise';
import { mplex }               from '@libp2p/mplex';

let helia;
let fs;
let verifiedFetch;

/**
 * Initialize Helia (IPFS) node in the browser.
 * Disables default WebSocket transports to suppress bootstrap WS warnings.
 */
export async function initIpfs() {
  if (helia) return;  // already initialized

  // create a custom libp2p stack
  const libp2p = await createLibp2p({
    transports: [
      // Only WebRTC transport in browser; omit WebSockets to avoid WS errors
      webRTC() ,
      webSockets()
    ],
    connectionEncryption: [noise()],
    streamMuxers: [mplex()]
  });

  helia = await createHelia({
    libp2p,
    // You can still add HTTP or WebRTC-star peers here if needed
    // addresses: { swarm: ['/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star'] }
  });

  fs = unixfs(helia);
  verifiedFetch = createVerifiedFetch(helia);
}

/**
 * Shorthand to add a file to IPFS.
 * @param {File|Blob|Uint8Array} file
 * @returns {Promise<string>} CID string
 */
export async function uploadToIpfs(file) {
  if (!helia) {
    throw new Error('IPFS not initialized – call initIpfs() first');
  }
  const buffer = file instanceof Uint8Array
    ? file
    : new Uint8Array(await file.arrayBuffer());
  const { cid } = await fs.add(buffer);
  return cid.toString();
}

/**
 * Shorthand to read file content from IPFS.
 * @param {string} cidStr
 * @returns {Promise<Uint8Array>} raw data
 */
export async function downloadFromIpfs(cidStr) {
  if (!helia) {
    throw new Error('IPFS not initialized – call initIpfs() first');
  }
  const chunks = [];
  for await (const chunk of fs.cat(cidStr)) {
    chunks.push(chunk);
  }
  return Uint8Array.from(chunks.flat());
}

// Export the core Helia APIs if you need lower-level access
export { helia, fs, verifiedFetch };
