import React, { useEffect, useRef } from 'react';
import { loadRecording } from '../ipfs/ipfs.retriever';
import { hasAccess } from '../blockchain/contractApi';

export default function Playback({ cid, decryptionKey, userAddress }) {
  const videoRef = useRef(null);

  useEffect(() => {
    async function fetchAndPlay() {
      if (await hasAccess(cid, userAddress)) {
        const blob = await loadRecording(cid, decryptionKey);
        if (videoRef.current) {
          videoRef.current.src = URL.createObjectURL(blob);
        }
      } else {
        alert('Access denied');
      }
    }
    fetchAndPlay();
  }, [cid, decryptionKey, userAddress]);

  return (
    <video ref={videoRef} controls className="w-full h-auto bg-black" />
  );
}