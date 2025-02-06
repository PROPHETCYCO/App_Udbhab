import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Reusable Card Component
const Card = ({ title, description }) => (
  <TouchableOpacity style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDescription}>{description}</Text>
  </TouchableOpacity>
);

const DashboardScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderData, setSliderData] = useState([[], [], []]); // Holds data for 3 sliders
  const [loading, setLoading] = useState(true);

  const handleHorizontalScroll = (event) => {
    const horizontalOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(horizontalOffset / SCREEN_WIDTH);
    setActiveIndex(index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sponsorId = await AsyncStorage.getItem('userSponsorId');
        if (!sponsorId) {
          Alert.alert('Error', 'Sponsor ID not found.');
          return;
        }

        const response = await axios.post(`https://www.api.myudbhab.in/api/user/getDashboardData`, { sponsorId });
        const data = response.data;

        const fetchedCards = [
          [
            { title: 'Active Status', description: data.activeDate },
            { title: 'KYC Status', description: data.kycStatus },
            { title: 'Rank', description: data.rank },
            { title: 'Car Achivement Bonus', description: '₹0' },
            { title: 'House Achivement Bonus', description: '₹0' },
            { title: 'Lifetime Royalty Bonus', description: '₹0' },
          ],
          [
            { title: 'Direct BV', description: `Left: ${data.totalDirectBV.leftDirectBV}, Right: ${data.totalDirectBV.rightDirectBV}` },
            { title: 'Weekly Team Business', description: `Left: ${data.totalBVPointsEarned.leftBV}, Right: ${data.totalBVPointsEarned.rightBV}` },
            { title: 'Direct Sales Bonus', description: `₹${data.directSalesBonus}` },
            { title: 'Team Sales Bonus', description: `₹${data.teamSalesBonus}` },
            { title: 'My Team BV (LBV + RBV)', description: data.totalBVPointsEarned.leftBV + data.totalBVPointsEarned.rightBV },
            { title: 'Total Personal BV Points', description: `${data.totalPersonalBVPoints}` },
          ],
          [
            { title: 'Total Team', description: `Left: ${data.leftTreeUsersCount}, Right: ${data.rightTreeUsersCount}` },
            { title: 'Accumulated BV', description: `${data.totalBVPointsEarned.leftBV}, ${data.totalBVPointsEarned.rightBV}` },
            { title: 'My Total Direct Team BV', description: `₹${data.totalDirectBV.total}` },
            { title: 'Weekly Earnings', description: `₹${data.weeklyEarning}` },
            { title: 'Monthly Earnings', description: `₹${data.monthlyEarning}` },
            { title: 'Total Earnings', description: `₹${data.lifetimeEarning}` },
          ],
        ];

        setSliderData(fetchedCards);
      } catch (error) {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  const sliderTitles = [
    'My Business Center',
    'Weekly Business',
    'Total Business',
  ];

  return (
    <View style={styles.container}>
      {/* Horizontal ScrollView */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleHorizontalScroll}
        scrollEventThrottle={16}
        style={styles.horizontalScrollView}
      >
        {sliderData.map((sliderCards, sliderIndex) => (
          <View key={sliderIndex} style={styles.sliderContainer}>
            <Text style={styles.sliderTitle}>{sliderTitles[sliderIndex]}</Text>
            <ScrollView style={styles.verticalSlider} showsVerticalScrollIndicator={false}>
              {sliderCards.map((card, index) => (
                <Card key={index} title={card.title} description={card.description} />
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>

      {/* Slider Indicator */}
      <View style={styles.indicatorContainer}>
        {sliderData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              activeIndex === index ? styles.activeIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  horizontalScrollView: {
    flex: 1,
  },
  sliderContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
  },
  sliderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  verticalSlider: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginBottom: 35,
    paddingTop: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#6200EE',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
