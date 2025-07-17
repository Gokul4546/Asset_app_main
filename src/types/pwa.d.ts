// PWA TypeScript definitions
declare global {
  interface Window {
    workbox: any;
  }
}

// Service Worker registration types
export interface UpdateAvailableEvent {
  type: 'updateavailable';
  payload: {
    isUpdate: boolean;
  };
}

export interface ControllingEvent {
  type: 'controlling';
  payload: {
    isUpdate: boolean;
  };
}

// Install prompt event
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export {};