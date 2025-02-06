import { Dimensions, Image, StyleSheet, Text, View, Animated } from 'react-native';
import React, { useRef, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const EducationScreen = () => {

  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      id: 1,
      icon: require('../../assets/images/TrainerPhoto/avijit.jpg'),
      title: 'Avijit Chakraborty',
      description: 'Trainer',
    },
    {
      id: 2,
      icon: require('../../assets/images/TrainerPhoto/nil.jpg'),
      title: 'M Nilachandra Singh',
      description: 'Trainer',
    },
    {
      id: 3,
      icon: require('../../assets/images/TrainerPhoto/zaha.jpg'),
      title: 'Zahangir Sardar',
      description: 'Trainer',
    },
    {
      id: 4,
      icon: require('../../assets/images/TrainerPhoto/srijani.jpg'),
      title: 'Srijani Banerjee',
      description: 'Beauty care product trainer',
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
          source={require('../../assets/images/educationimage.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.paraContainer}>
        <Text style={styles.para}>
          Online Zoom education for a marketing company offers flexible,
          interactive training sessions that enhance team collaboration. With
          features like breakout rooms and recording capabilities, it
          accommodates diverse learning styles and allows for real-time
          engagement. This approach ensures teams stay updated on industry
          trends while maximizing cost-effectiveness and accessibility.
        </Text>
      </View>
      <Text style={styles.newTopicText}>Business Trainers</Text>
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

export default EducationScreen;

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
  paraContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#d1ecf1',
  },
  para: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  newTopicText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#1860ac',
    marginTop: 20,
    textAlign: 'center',
    height: 50,
    paddingTop: 5,
  },
  cardContainer: {
    paddingHorizontal: 0,
    paddingBottom: 30,
    marginTop: 25,
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
  cardIcon: { 
    width: 100, 
    height: 100, 
    marginBottom: 8,
    borderRadius: 50,
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4,
    width: 200, 
    textAlign: 'center',
  },
  cardDescription: { 
    fontSize: 14, 
    color: '#666', 
    textAlign: 'center' 
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'black',
    marginHorizontal: 4,
  },
});
