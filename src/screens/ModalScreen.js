import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, Image } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ModalScreen = ({ navigation }) => {
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(buttonAnimation, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);

        Animated.timing(dropdownHeight, {
            toValue: isDropdownOpen ? 0 : 250,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleNavigate = (screenName) => {
        navigation.goBack();
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/udbhab.png')} // Replace with your logo path
                style={styles.logo}
                resizeMode="contain"
            />
            <ScrollView contentContainerStyle={styles.buttonContainer}>
                {/* Dropdown Button */}
                <TouchableOpacity style={styles.dropdownMainButton} onPress={toggleDropdown}>
                    <Text style={styles.dropdownMainButtonText}>{isDropdownOpen ? 'About Us' : 'About Us'}</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
                    {[
                        { label: 'Introduction of Udbhab Marketing', screen: 'Introduction' },
                        { label: 'Our Vision & Mission', screen: 'Mission' },
                        { label: 'Management & Team', screen: 'Management' },
                        { label: 'Legal Documents', screen: 'Document' },
                        { label: 'Awards & Rewards', screen: 'Award' },
                    ].map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.dropdownButton}
                            onPress={() => handleNavigate(item.screen)}
                        >
                            <Text style={styles.dropdownButtonText}>{item.label}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
                {[
                    { screen: 'Education', label: 'Education', icon: require('../assets/icons/education.png') },
                    { screen: 'Industry', label: 'Industry & Success Story', icon: require('../assets/icons/success.png') },
                    { screen: 'News', label: 'News', icon: require('../assets/icons/news.png') },
                    { screen: 'Download', label: 'Download', icon: require('../assets/icons/download.png') },
                    { screen: 'Contact', label: 'Contact Us', icon: require('../assets/icons/contact.png') },
                ].map((item, index) => (
                    <Animated.View
                        key={item.screen}
                        style={{
                            transform: [
                                {
                                    translateY: buttonAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50 + index * 10, 0],
                                    }),
                                },
                            ],
                            opacity: buttonAnimation,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.navButton}
                            onPress={() => handleNavigate(item.screen)}
                        >
                            <Image source={item.icon} style={styles.icon} />
                            <Text style={styles.navButtonText}>{item.label}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </ScrollView>
            <TouchableOpacity
                style={styles.closeButton}
                onPress={() => navigation.goBack()}
            >
            <Image
                source={require('../assets/icons/close.png')} // Replace with your close icon path
                style={styles.closeIcon}
                resizeMode="contain"
            />
                {/* <Text style={styles.closeButtonText}>Close</Text> */}
            </TouchableOpacity>
        </View>
    );
};

export default ModalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    logo: {
        height: 50,
        width: SCREEN_WIDTH-20,
        alignItems: 'center',
    },
    buttonContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navButton: {
        width: SCREEN_WIDTH * 0.9,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#529f8a',
        borderRadius: 30,
        marginVertical: 10,
        //elevation: 3,
        position: 'relative',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
        position: 'absolute',
        left: 40, 
    },
    dropdownMainButton: {
        width: SCREEN_WIDTH * 0.9,
        padding: 15,
        backgroundColor: '#7fb2a8',
        borderRadius: 30,
        alignItems: 'center',
        marginVertical: 10,
    },
    dropdownMainButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    dropdown: {
        width: SCREEN_WIDTH * 0.9,
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
        //elevation: 3,
        marginTop: 0,
    },
    dropdownButton: {
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginBottom: -3,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#333',
    },
    closeButton: {
        padding: 15,
        backgroundColor: '#095444',
        borderRadius: 30,
        marginTop: 20,
        alignSelf: 'center',
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIcon: {
        width: 13,
        height: 13,
    },
});
