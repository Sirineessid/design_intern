import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { initIpfs } from './ipfs/ipfs.client';
import { initContract } from './blockchain/contractApi';  // ← new import

const rootElement = document.getElementById("root");

if (rootElement) {
  // Initialize IPFS and the smart-contract, then render
  (async () => {
    try {
      await initIpfs();
      await initContract();
      createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (err) {
      console.error("Failed to initialize IPFS or contract:", err);
    }
  })();
} else {
  console.error("Root element not found!");
}

