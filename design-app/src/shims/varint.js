import * as varintNS from 'varint';

// Re-export everything
export const encode = varintNS.encode;
export const decode = varintNS.decode;
export const encodingLength = varintNS.encodingLength;

// Also provide a default export for legacy imports
export default {
  encode: varintNS.encode,
  decode: varintNS.decode,
  encodingLength: varintNS.encodingLength
};
