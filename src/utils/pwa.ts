// PWA utilities for service worker registration and app installation

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;

// Register service worker
export const registerSW = async (): Promise<void> => {
  // Check if we're in a supported environment
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.log('Service Worker not supported in this environment');
    return;
  }

  // Skip service worker registration in StackBlitz environment
  if (window.location.hostname.includes('stackblitz') || 
      window.location.hostname.includes('webcontainer')) {
    console.log('Service Worker registration skipped in StackBlitz environment');
    return;
  }

  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, prompt user to refresh
              showUpdateNotification();
            }
          });
        }
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'CACHE_UPDATED') {
          console.log('Cache updated:', event.data.payload);
        }
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

// Handle app installation prompt
export const setupInstallPrompt = (): void => {
  window.addEventListener('beforeinstallprompt', (e: Event) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    showInstallButton();
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallButton();
    deferredPrompt = null;
  });
};

// Show install button
const showInstallButton = (): void => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'block';
  }
};

// Hide install button
const hideInstallButton = (): void => {
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.style.display = 'none';
  }
};

// Trigger app installation
export const installApp = async (): Promise<void> => {
  if (deferredPrompt) {
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      deferredPrompt = null;
    } catch (error) {
      console.error('Error during app installation:', error);
    }
  }
};

// Show update notification
const showUpdateNotification = (): void => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('App Update Available', {
      body: 'A new version of the app is available. Refresh to update.',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png'
    });
  } else {
    // Fallback to in-app notification
    console.log('App update available - refresh to get the latest version');
  }
};

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission;
  }
  return 'denied';
};

// Check if app is running in standalone mode (installed as PWA)
export const isStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone === true;
};

// Check if device is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Listen for online/offline events
export const setupNetworkListeners = (
  onOnline: () => void,
  onOffline: () => void
): void => {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
};

// Cache management utilities
export const clearCache = async (): Promise<void> => {
  if ('caches' in window) {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('All caches cleared');
  }
};

// Get cache size
export const getCacheSize = async (): Promise<number> => {
  if ('caches' in window && 'storage' in navigator && 'estimate' in navigator.storage) {
    const estimate = await navigator.storage.estimate();
    return estimate.usage || 0;
  }
  return 0;
};

// Background sync for offline actions
export const scheduleBackgroundSync = (tag: string): void => {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register(tag);
    }).catch((error) => {
      console.error('Background sync registration failed:', error);
    });
  }
};

// Initialize PWA features
export const initializePWA = (): void => {
  setupInstallPrompt();
  
  // Setup network status listeners
  setupNetworkListeners(
    () => {
      console.log('App is online');
      // Sync any pending offline actions
      scheduleBackgroundSync('asset-sync');
    },
    () => {
      console.log('App is offline');
      // Show offline indicator
    }
  );

  // Request notification permission if not already granted
  if ('Notification' in window && Notification.permission === 'default') {
    requestNotificationPermission();
  }
};