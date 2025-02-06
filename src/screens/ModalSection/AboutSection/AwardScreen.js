import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const AwardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.banner}>
        <Image
          source={require('../../../assets/images/award.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>No Awards and Rewards Currently Available</Text>
    </ScrollView>
  )
}

export default AwardScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20, // Ensure spacing at the bottom for comfortable scrolling
  },
  banner: {
    width: width,
    height: 160,
    backgroundColor: '#095444',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#095444',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  bannerImage: {
    width: width,
  },
  text: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  }
})