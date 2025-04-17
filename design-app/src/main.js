import { createRoot } from 'react-dom/client';
import App from './App.js'; // Make sure the App file is .js now
import './index.css';

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found!");
}
