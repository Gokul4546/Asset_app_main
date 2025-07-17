import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker with vite-plugin-pwa
if ('serviceWorker' in navigator) {
  // The service worker is automatically registered by vite-plugin-pwa
  // We just need to handle the update flow
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
      // Dispatch custom event for update notification
      window.dispatchEvent(new CustomEvent('pwa-update-available'));
    }
  });
}
