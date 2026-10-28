// ─── AdMob configuration ────────────────────────────────────────────────────
// Set ADMOB_ENABLED to true and fill in the real unit IDs when ready to show
// ads in the iOS / Android apps. The web version is unaffected (AdSense via GTM
// continues to handle web ads regardless of this setting).

const ADMOB_ENABLED = false;

// Ad unit IDs — replace TEST values with real IDs from your AdMob account.
// Create the AdMob account at: https://admob.google.com
const AD_UNITS = {
  ios: {
    banner: 'ca-app-pub-3940256099942544/2934735716',      // Google test ID
    interstitial: 'ca-app-pub-3940256099942544/4411468910', // Google test ID
  },
  android: {
    banner: 'ca-app-pub-3940256099942544/6300978111',      // Google test ID
    interstitial: 'ca-app-pub-3940256099942544/1033173712', // Google test ID
  },
};

// App-level publisher IDs — add your real AdMob app IDs here when going live.
// These go in Info.plist (iOS) and AndroidManifest.xml (Android) as well.
export const ADMOB_APP_IDS = {
  ios: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
  android: 'ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX',
};

export async function initAdMob(): Promise<void> {
  if (!ADMOB_ENABLED) return;

  const { AdMob } = await import('@capacitor-community/admob');
  const { Capacitor } = await import('@capacitor/core');

  if (!Capacitor.isNativePlatform()) return;

  await AdMob.initialize({
    requestTrackingAuthorization: true,
    testingDevices: [],
    initializeForTesting: false,
  });

  const platform = Capacitor.getPlatform() as 'ios' | 'android';
  const units = AD_UNITS[platform];

  await AdMob.showBanner({
    adId: units.banner,
    adSize: 'ADAPTIVE_BANNER' as any,
    position: 'BOTTOM_CENTER' as any,
    margin: 0,
    isTesting: false,
  });
}
