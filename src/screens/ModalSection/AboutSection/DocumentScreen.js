import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const DocumentScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.banner}>
        <Image
          source={require('../../../assets/images/legal.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <Image
        source={require('../../../assets/images/Legaldocu/docu2.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/Legaldocu/docu3.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/Legaldocu/pic4.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/Legaldocu/pan.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/Legaldocu/udbhab.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Image
        source={require('../../../assets/images/Legaldocu/udbhab_reg.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
    </ScrollView>
  )
}

export default DocumentScreen

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
  image: {
    width: width,
    height: 400,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
  }
})