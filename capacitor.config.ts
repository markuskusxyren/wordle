import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'hackhive_wordle',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
