import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';
import { Alert } from 'react-native';

const EXPO_PUBLIC_RC_IOS='appl_zXNpabXZgglKeFDxGDVlFVVzUav';

Purchases.setLogLevel(Purchases.LOG_LEVEL_VERBOSE);
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

// Configure RevenueCat

 useEffect( () => {
 
  if (Platform.OS === 'ios') {
    if (!process.env.EXPO_PUBLIC_RC_IOS) {
      Alert.alert("Error configuring RC","iOS API key not provided")
    }
    else {
      Purchases.configure({apiKey: EXPO_PUBLIC_RC_IOS});
    }
    Purchases.configure({apiKey: EXPO_PUBLIC_RC_IOS});
 } else if (Platform.OS === 'android') {
  Purchases.configure({apiKey: process.env.EXPO_PUBLIC_RC_IOS});
}

// test fetching products
Purchases.getOfferings().then(console.log);
console.log(EXPO_PUBLIC_RC_IOS)

try {
  const offerings = Purchases.getOfferings().then(console.log);
  if (offerings.current !== null) {  
	  // Display current offering with offerings.current
  }
} catch (e) {
  console.log("Not working")
}

 }, [])

 Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
Purchases.configure({
    apiKey: "appl_zXNpabXZgglKeFDxGDVlFVVzUav",
    appUserID: "appea31f7e20c",
});

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
