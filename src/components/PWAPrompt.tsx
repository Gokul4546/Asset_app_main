import React from 'react';
import { Download, RefreshCw, Wifi, WifiOff, X } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

export const PWAPrompt: React.FC = () => {
  const { isInstallable, isUpdateAvailable, isOffline, installApp, updateApp } = usePWA();
  const [showInstallPrompt, setShowInstallPrompt] = React.useState(false);
  const [showUpdatePrompt, setShowUpdatePrompt] = React.useState(false);

  React.useEffect(() => {
    if (isInstallable) {
      // Show install prompt after a delay
      const timer = setTimeout(() => {
        setShowInstallPrompt(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable]);

  React.useEffect(() => {
    if (isUpdateAvailable) {
      setShowUpdatePrompt(true);
    }
  }, [isUpdateAvailable]);

  const handleInstall = async () => {
    await installApp();
    setShowInstallPrompt(false);
  };

  const handleUpdate = () => {
    updateApp();
    setShowUpdatePrompt(false);
  };

  return (
    <>
      {/* Offline Indicator */}
      {isOffline && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">You're offline</span>
        </div>
      )}

      {/* Online Indicator (brief) */}
      {!isOffline && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-pulse">
          <Wifi className="h-4 w-4" />
          <span className="text-sm font-medium">Back online</span>
        </div>
      )}

      {/* Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NP</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Install App</h3>
                <p className="text-sm text-gray-600">Get the full experience</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Install this app on your device for quick access and offline functionality.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleInstall}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Update Prompt */}
      {showUpdatePrompt && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 bg-blue-600 text-white rounded-xl shadow-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <RefreshCw className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">Update Available</h3>
                <p className="text-sm text-blue-100">A new version is ready</p>
              </div>
            </div>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="text-blue-200 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-sm text-blue-100 mb-4">
            Update now to get the latest features and improvements.
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="flex-1 flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Update Now
            </button>
            <button
              onClick={() => setShowUpdatePrompt(false)}
              className="px-4 py-2 text-blue-200 hover:text-white transition-colors"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  );
};