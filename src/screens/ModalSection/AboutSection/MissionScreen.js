import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const MissionScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.banner}>
        <Image
          source={require('../../../assets/images/mission.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.paraContainer}>
        <Text style={styles.para}>
          “The leaders of tomorrow will emerge from the Innovation Industry“
        </Text>
        <Text style={styles.para}>-- From Utbhab team</Text>
      </View>
      <View style={styles.photoContainer}>
        <Image
          source={require('../../../assets/images/visi.jpeg')}
          style={styles.photo}
          resizeMode="contain"
        />
        <Text style={styles.paragraph}>
          The wellness industry encompasses a wide range of sectors focused on
          personal finance, investment, and wealth management. This industry
          includes financial advisory services, investment firms, asset
          management, and fintech companies that provide tools and resources for
          individuals looking to grow and manage their wealth. In recent years,
          the industry has evolved significantly due to technological
          advancements and a shift toward digital platforms, making financial
          services more accessible. Robo-advisors, online trading platforms, and
          personal finance apps have democratized investment opportunities,
          allowing people from all backgrounds to participate in wealth-building
          strategies.
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <Image
          source={require('../../../assets/images/mission1.jpg')}
          style={styles.photo}
          resizeMode="contain"
        />
        <Text style={styles.paragraph}>
          Udbhab Marketing Pvt. Ltd. is a dynamic direct selling company that
          empowers individuals through a diverse range of innovative products,
          including health, wellness, and beauty items. Focused on personal and
          financial growth, Udbhab provides distributors with comprehensive
          training and support, enabling them to build their own businesses. We
          have 6 type of category in segment. The company emphasizes ethical
          practices and customer satisfaction, fostering a trustworthy
          community. By leveraging digital marketing strategies, Udbhab enhances
          the direct selling experience, helping members reach wider audiences
          and achieve their financial goals.
        </Text>
      </View>
    </ScrollView>
  );
};

export default MissionScreen;

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
    shadowOffset: {width: 0, height: 20},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden',
  },
  bannerImage: {
    width: width,
  },
  para: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  paraContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#d1ecf1',
  },
  paragraph: {
    fontSize: 18,
    color: '#333',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  photoContainer: {
    alignItems: 'center',
    backgroundColor: '#eaeef4',
    marginTop: 30,
  },
  photo: {
    width: width-169,
    height: 170,
    marginTop: 20,
    borderRadius: 40,
  },
});
