import { StyleSheet } from 'react-native';
import { Button } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import RevenueCatUI, {PAYWALL_RESULT} from 'react-native-purchases-ui';
import { Alert } from 'react-native';
import Purchases, {PurchasesOffering} from 'react-native-purchases';
import { useEffect } from 'react';
import { useState } from 'react';
export default function TabOneScreen() {
  const [onboardingOffering, setOnboardingOffering] = useState<PurchasesOffering>();
  useEffect( () => {
    const fetchOfferings = async () => {
      try {
        const offerings = await Purchases.getOfferings();
        console.log(JSON.stringify(offerings.all.onboarding,null,2));
        if (offerings.current !== null) {
          // Display current offering with offerings.current
        }
      } catch (e) {
        console.log("Not working")
      }
    }
  })

  const  isSubscribed = async () => {
    const paywallResult: PAYWALL_RESULT = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: 'pro'
    });

    switch (paywallResult) {
      case PAYWALL_RESULT.NOT_PRESENTED:
      case PAYWALL_RESULT.ERROR:
      case PAYWALL_RESULT.CANCELLED:
          return false;
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
          return true;
      default:
          return false;
  }

  }

  const proAction = async () => {
    if (await isSubscribed()) {
      Alert.alert('User has access!')
    } else {
      Alert.alert('You are not a PRO user!')
    }
  }
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" /> */}

      <Button title="Perform a PRO action" onPress={proAction}></Button>

      <Button title="Display default paywall" onPress={() => RevenueCatUI.presentPaywall()}></Button>

      <Button title="Display onboarding paywall" onPress={() => RevenueCatUI.presentPaywall({offering: onboardingOffering})}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
