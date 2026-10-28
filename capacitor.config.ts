import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tools.calculations.app',
  appName: 'Calculations Tools',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    AdMob: {
      testingDevices: [],
    },
    CapacitorUpdater: {
      autoUpdate: false,
    },
  },
};

export default config;
