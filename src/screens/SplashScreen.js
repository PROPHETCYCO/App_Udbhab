import { Animated, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'

const SplashScreen = () => {

    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to opacity 1
            duration: 2000, // 2 seconds
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    useEffect(() => {
        // Pop-up animation
        Animated.spring(scaleAnim, {
            toValue: 1, // Scale to normal size
            friction: 5, // Controls the bounce effect
            tension: 10, // Controls the speed
            useNativeDriver: true,
        }).start();
    }, [scaleAnim]);

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={require('../assets/images/udbhab_bg1.jpg')} // Replace with your background image path
                style={styles.background}
                resizeMode="cover"
            />
            {/* Animated Logo */}
            <View style={styles.circle}>
                <Animated.View style={[styles.logoContainer, { transform: [{ scale: scaleAnim }] }]}>
                    <Image
                        source={require('../assets/images/udbhab_icon.png')} // Replace with your logo image path
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'white',
    },
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 170, 
        height: 170,
    },
    circle: {
        width: 175,
        height: 175,
        borderRadius: 100,
        borderWidth: 10, 
        borderColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 30,
    }

})