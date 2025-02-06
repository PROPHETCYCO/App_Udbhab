import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './src/navigations/BottomTabNavigator';
import Toast from 'react-native-toast-message';

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true); // Controls overall app loading state
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null); // Tracks onboarding completion

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if onboarding has been completed
        const seenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(seenOnboarding !== null); // true if onboarding has been seen
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        // Simulate splash screen visibility for 3 seconds
        setTimeout(() => setIsAppLoading(false), 3000);
      }
    };

    initializeApp();
  }, []);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true'); // Save onboarding status
      setHasSeenOnboarding(true); // Update state to navigate to the main app
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  // Render Splash Screen during app initialization
  if (isAppLoading) {
    return <SplashScreen />;
  }

  // Display loading indicator if onboarding state is still null
  if (hasSeenOnboarding === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show Onboarding Screen if the user hasn't seen it yet
  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <BottomTabNavigator />
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
