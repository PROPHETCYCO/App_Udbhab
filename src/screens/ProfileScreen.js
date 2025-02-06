import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProfileScreen = () => {

  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userSponsorId, setUserSponsorId] = useState('');


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('userToken');
      const name = await AsyncStorage.getItem('userName');
      const sponsorId = await AsyncStorage.getItem('userSponsorId');

      if (token) {
        setIsLoggedIn(true);
        setUserName(name || 'User');
        setUserSponsorId(sponsorId || '');
      } else {
        setIsLoggedIn(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', checkLoginStatus);
    return unsubscribe;
  }, [navigation]);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleLogoutPress = async () => {
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
      Toast.show({
        type: 'success',
        text1: 'Logout',
        text2: 'You have been successfully logout', // Smaller text displayed below
        position: 'top', // Optional: 'top', 'bottom'
        visibilityTime: 3000, // Optional: duration in ms
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // const handleGoToDashboardPress = () => {
  //   navigation.navigate('Dashboard'); // Replace 'Dashboard' with your actual dashboard screen name
  // };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    Animated.timing(dropdownHeight, {
      toValue: isDropdownOpen ? 0 : 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleNavigate = (screenName) => {
    // navigation.goBack();
    navigation.navigate(screenName);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../assets/images/udbhab.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with profile image URL
          style={styles.profileImage}
        />
        {isLoggedIn ? (
          <>
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.sponsorId}>Sponsor ID: {userSponsorId}</Text>
          </>
        ) : (
          <Text style={styles.profileName}>Guest</Text>
        )}
      </View>

      {/* Buttons */}
      {!isLoggedIn ? (
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.loggedInButtons}>
          {/* Dropdown Button */}
          <TouchableOpacity
            style={styles.dropdownMainButton}
            onPress={toggleDropdown}>
            <Text style={styles.dropdownMainButtonText}>
              {isDropdownOpen ? 'All Menu' : 'All Menu'}
            </Text>
          </TouchableOpacity>
          <Animated.View style={[styles.dropdown, { height: dropdownHeight }]}>
            {[
              { label: 'Go to Dashboard', screen: 'Dashboard' },
              { label: 'My Orders', screen: 'MyOrder' },
              {/* { label: 'Genealogy Tree', screen: 'Binary' }, */}

            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownButton}
                onPress={() => handleNavigate(item.screen)}>
                <Text style={styles.dropdownButtonText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#d9534f' }]}
            onPress={handleLogoutPress}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 120,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100, // Makes the image circular
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  sponsorId: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  loginButton: {
    marginTop: 30,
    alignSelf: 'center',
    backgroundColor: '#095444',
    paddingVertical: 15,
    paddingHorizontal: 130,
    borderRadius: 30,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loggedInButtons: {
    marginTop: 30,
    alignSelf: 'center',
  },
  actionButton: {
    marginVertical: 10,
    alignSelf: 'center',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
    elevation: 3,
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
})