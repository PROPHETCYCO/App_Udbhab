import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const NewsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.banner}>
        <Image
          source={require('../../assets/images/newsimage.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.text}>Latest News</Text>
    </ScrollView>
  )
}

export default NewsScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#095444',
    textAlign: 'center',
    marginTop: 10,
  }
})