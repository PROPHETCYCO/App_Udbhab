import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';

const ContactUsScreen = () => {
  // State to store form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Validate and submit the form
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    Alert.alert('Success', 'Your message has been sent!');
    // Reset the form after submission
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Information Section */}
      <View style={styles.infoBox}>
        <Text style={styles.heading}>Information</Text>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons/map.png')} // Local location icon
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            Reg Office: Indira Nagar Sodepur, North 24 Parganas. Kol-700110
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons/map.png')} // Local location icon
            style={styles.icon}
          />
          <Text style={styles.infoText}>
            Corporate Office: Shakshi Appartment, Ground floor, Road no: 6, HB Town, Sodepur, Kol-700110
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Image
            source={require('../../assets/icons/telephone.png')} // Local phone icon
            style={styles.icon}
          />
          <Text style={styles.infoText}>+91 7980964516</Text>
        </View>
        <TouchableOpacity
          style={styles.infoRow}
          onPress={() => console.log('Email pressed')}
        >
          <Image
            source={require('../../assets/icons/mail.png')} // Local email icon
            style={styles.icon}
          />
          <Text style={styles.infoText}>support@myudbhab.in</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Form Section */}
      <View style={styles.formBox}>
        <Text style={styles.formHeading}>Contact Us</Text>

        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor="#000"
          value={formData.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <View style={styles.rowInputs}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Your Email"
            placeholderTextColor="#000"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Your Subject"
            placeholderTextColor="#D3D3D3"
            value={formData.subject}
            onChangeText={(text) => handleInputChange('subject', text)}
          />
        </View>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          placeholderTextColor="#D3D3D3"
          value={formData.message}
          onChangeText={(text) => handleInputChange('message', text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#e6efe8', // Light greenish background
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  formBox: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#374151', // Dark gray
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
