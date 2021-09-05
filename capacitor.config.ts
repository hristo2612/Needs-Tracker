import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.needs.tracker',
  appName: 'Needs Tracker Updated',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    LocalNotifications: {
      iconColor: '#488AFF',
      sound: 'beep.wav'
    }
  }
};

export default config;
