import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');

const LoginScreen = () => {

  const [sponsorId, setSponsorId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state

  const navigation = useNavigation();
  console.log(require('../assets/images/login.png'));
  console.log(require('../assets/icons/eye.png'));
  console.log(require('../assets/icons/hidden.png'));
  


  const handleLoginPress = async () => {
    if (!sponsorId || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in both fields.',
        position: 'top',
        visibilityTime: 3000,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`https://www.api.myudbhab.in/api/auth/login`, { sponsorId, password });

      if (response.status === 200) {
        const data = response.data;
        await AsyncStorage.setItem('userToken', data.token);
        await AsyncStorage.setItem('userId', data.userId);
        await AsyncStorage.setItem('userName', data.name);
        await AsyncStorage.setItem('userSponsorId', data.mySponsorId);

        Toast.show({
          type: 'success',
          text1: 'Login Success',
          text2: 'Login Successfully',
          position: 'top',
          visibilityTime: 3000,
        });

        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Invalid Login Credentials',
          position: 'top',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong, please try again later',
        position: 'top',
        visibilityTime: 3000,
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image source={require('../assets/images/login.png')} style={styles.image} resizeMode="contain" />
        </View>

        {/* User ID Input */}
        <Text style={styles.label}>User ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your User ID"
          placeholderTextColor="#888"
          value={sponsorId}
          onChangeText={setSponsorId}
        />

        {/* Password Input with Eye Icon */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword} // Toggle secureTextEntry
            value={password}
            color="#000"
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
            <Image
              source={
                showPassword
                  ? require('../assets/icons/eye.png') // Show eye-open icon
                  : require('../assets/icons/hidden.png') // Show eye-closed icon
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginButton, loading && { backgroundColor: '#7FB1A6' }]}
          onPress={handleLoginPress}
          disabled={loading}
        >
          <Text style={styles.loginButtonText}>{loading ? 'Logging in...' : 'Login'}</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  imageContainer: {
    backgroundColor: '#10a686',
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
  },
  image: {
    width: width - 40,
    height: 300,
  },
  label: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#888', // Adjust color if needed
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#095444',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#095444',
    fontSize: 16,
    fontWeight: '500',
  },
})