import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const { width } = Dimensions.get('window');

const ForgotPasswordScreen = () => {

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    if (!email.trim()) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Enter your email',
            position: 'top',
            visibilityTime: 3000,
        });
        return;
    }

    setLoading(true);
    try {
        const response = await axios.post(`https://www.api.myudbhab.in/api/auth/forgotpassword`, { email });
        Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Password reset link is send successfully',
            position: 'top',
            visibilityTime: 3000,
        });
        

        // Navigate back to Profile (Reset stack)
        // navigation.reset({
        //     index: 0,
        //     routes: [{ name: 'ProfileTab' }],
        // });
        navigation.goBack();

    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Something went wrong',
            position: 'top',
            visibilityTime: 3000,
        });
        
    } finally {
        setLoading(false);
    }
};

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                {/* Top Image */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../assets/images/forgotpass.png')}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Forgot Password Form */}
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Enter your account details below</Text>

                    <Text style={styles.label}>Email address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        color="#000"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleForgotPassword} disabled={loading}>
                        <Text style={styles.submitButtonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
  scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    imageContainer: {
        backgroundColor: '#10a686',
        height: 300,
        borderRadius: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: width - 40,
        height: 300,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'left',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#000',
    },
    submitButton: {
        backgroundColor: '#1e4d3d',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
})