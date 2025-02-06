import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import RNFS from 'react-native-fs'; // Import react-native-fs for file operations

const DownloadScreen = () => {
  // File details
  const pdfFileName = 'udbhabpdf.pdf'; // Name of the PDF file
  const localPdfPath = 'assets/udbhabpdf.pdf'; // Path to the file in the assets folder

  // Function to handle file download
  const handleDownload = async () => {
    try {
      // Destination path in the app's private directory
      const destinationPath = `${RNFS.DocumentDirectoryPath}/${pdfFileName}`;

      // Check if the file already exists in the app's private directory
      const fileExists = await RNFS.exists(destinationPath);
      if (fileExists) {
        Alert.alert('File Exists', 'The file is already downloaded.');
        return;
      }

      // Copy the file from assets to the app's private directory
      await RNFS.copyFileAssets(localPdfPath, destinationPath);

      Alert.alert('Success', `File saved to app directory: ${destinationPath}`);
    } catch (error) {
      console.error('Download Error:', error);
      Alert.alert('Error', 'Failed to save the file.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download Udbhab Brochure</Text>

      {/* Button with Local Icon */}
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Image
          source={require('../../assets/icons/imagepdf.png')} // Path to your local icon
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DownloadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#095444',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
