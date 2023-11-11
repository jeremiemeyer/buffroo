import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.jeremiemeyer',
  appName: 'Buffroo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
