import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const OnboardingScreen = ({ onComplete = () => { } }) => {

  const [currentScreen, setCurrentScreen] = useState(0); // Tracks the current screen

  // Data for onboarding screens
  const screens = [
    {
      image: require('../assets/images/onboarding1.png'), // Replace with your first screen's image
      title: 'High-Quality & Trusted Brands',
      subtitle: 'Explore a curated selection of premium products designed to enhance your lifestyle.',
    },
    {
      image: require('../assets/images/onboarding2.png'), // Replace with your second screen's image
      title: 'SExclusive Member Benefits',
      subtitle: 'Get access to special discounts, rewards, and early product launches.',
    },
  ];

  // Handle "Next" button press
  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      console.log('Onboarding Complete!'); // Replace with navigation logic
      onComplete();
    }
  };

  return (
    <View style={styles.container}>
      {/* Image */}
      <Image
        source={screens[currentScreen].image}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>{screens[currentScreen].title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{screens[currentScreen].subtitle}</Text>

      {/* Next Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {currentScreen === screens.length - 1 ? 'Finish' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Customize the background color
  },
  image: {
    width: '100%',
    height: '60%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    width: '85%',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
    width: '80%',
  },
  button: {
    backgroundColor: 'green', // Customize button color
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 60,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})