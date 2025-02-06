import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';

const { width } = Dimensions.get('window');

const IntroductionScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      id: 1,
      icon: require('../../../assets/icons/icon.png'),
      title: 'Exclusive Products',
      description:
        'Unique, high-quality offerings with constant innovation and demand',
    },
    {
      id: 2,
      icon: require('../../../assets/icons/icon.png'),
      title: 'Super Power Training System',
      description:
        'Extensive product knowledge and sales strategy training provided',
    },
    {
      id: 3,
      icon: require('../../../assets/icons/icon.png'),
      title: 'Experience Leadership',
      description: 'Experienced mentors guide and support your business growth',
    },
    {
      id: 4,
      icon: require('../../../assets/icons/icon.png'),
      title: 'Super Community',
      description:
        'Thriving network with recognition, rewards, and personal development',
    },
  ];

  const handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
      useNativeDriver: false,
    })(event);

    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setActiveIndex(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.banner}>
        <Image
          source={require('../../../assets/images/about.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.paraContainer}>
        <Text style={styles.para}>
          Established in 2024, with a powerful vision of providing genuine
          health and wealth solutions to common people, Utbhab Marketing Pvt Ltd
          today has emerged as one of the most successful and fastest-growing
          direct selling companies of India.
        </Text>
      </View>
      <View style={styles.photoContainer}>
        <Image
          source={require('../../../assets/images/about_photo.jpg')}
          style={styles.photo}
          resizeMode="contain"
        />
        <Text style={styles.para}>
          Udbhab Marketing Private Limited is a dynamic direct selling company
          committed to empowering individuals through innovative products and
          opportunities. With a focus on quality and customer satisfaction, we
          provide a diverse range of items that enhance daily living. Our unique
          business model allows entrepreneurs to thrive, offering flexible
          earning potential and personal growth. Join us in transforming lives
          and building a successful future together, one sale at a time.
          Experience the Udbhab difference today!
        </Text>
      </View>

      <Text style={styles.newTopicText}>Why Choose Us?</Text>
      <View style={styles.cardContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ alignItems: 'center' }} // Centering contents within ScrollView
        >
          {cards.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.icon} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.indicatorContainer}>
          {cards.map((_, index) => {
            const scale = scrollX.interpolate({
              inputRange: [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ],
              outputRange: [0.8, 1.4, 0.8],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={[styles.indicatorDot, { transform: [{ scale }] }]}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default IntroductionScreen;

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
  },
  bannerImage: {
    width: width,
  },
  para: {
    fontSize: 18,
    color: '#333',
    textAlign: 'justify',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  paraContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#d1ecf1',
  },
  photoContainer: {
    alignItems: 'center',
    backgroundColor: '#eaeef4',
    marginTop: 30,
  },
  photo: {
    width: width - 30,
    height: 170,
  },
  newTopicText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 16,
    textAlign: 'center',
  },
  cardContainer: {
    paddingHorizontal: 0,
    paddingBottom: 30
  }, // Remove padding on the sides
  card: {
    width: width, // Full screen width for each card
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16, // Adjust padding as needed
    alignItems: 'center',
    justifyContent: 'center', // Center contents vertically
    marginHorizontal: 0, // Ensure no horizontal margins
  },
  cardIcon: { width: 50, height: 50, marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  cardDescription: { fontSize: 14, color: '#666', textAlign: 'center' },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
});
