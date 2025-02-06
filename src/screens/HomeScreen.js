import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Button data with labels and variables
  const buttonData = [
    { label: 'Personal Care', variable: 'Personal Care', icon: require('../assets/product_icons/cream.png'), disabled: false },
    { label: 'Health Care', variable: 'Health Care', icon: require('../assets/product_icons/healthcare.png'), disabled: false },
    { label: 'Beauty Care', variable: 'Beauty Care', icon: require('../assets/product_icons/skin-care.png'), disabled: true },
    { label: 'Home Care', variable: 'Home Care', icon: require('../assets/product_icons/home.png'), disabled: true },
    { label: 'Grocery', variable: 'Grocery', icon: require('../assets/product_icons/grocery-cart.png'), disabled: true },
    { label: 'All Exclusive Products', variable: 'All Product', icon: require('../assets/product_icons/brand-identity.png'), disabled: false },
  ];

  // Function to fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://www.api.myudbhab.in/api/user/viewProducts`); // Replace with your API endpoint
        setProducts(response.data.products); // Extract products from response data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Function to handle button press
  const handleButtonPress = (variable) => {
    navigation.navigate('Category', { variable }); // Navigate to Category screen with a variable
  };

  // Render product card
  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.imageURL }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image
          source={require('../assets/images/udbhab.png')} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Image
          source={require('../assets/images/01.jpg')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>

      {/* Categories Section */}
      <Text style={styles.categoriesText}>Categories</Text>
      <View style={styles.buttonsContainer}>
        {buttonData.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryItem, button.disabled && styles.disabledButton]}
            onPress={() => !button.disabled && handleButtonPress(button.variable)}
            disabled={button.disabled} // Prevents clicking if disabled
          >
            <Image source={button.icon} style={[styles.categoryIcon, button.disabled && styles.disabledIcon]} />
            <Text style={[styles.categoryText, button.disabled && styles.disabledText]}>{button.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Product List Section */}
      <Text style={styles.featuredProductsText}>Featured Products</Text>
      <View style={styles.productList}>
        {products.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={{ uri: item.imageURL }} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₹{item.mrp_price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>


    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  topBar: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 60,
    width: 120,
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
  categoriesText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.5, 
  },
  disabledIcon: {
    tintColor: 'gray', 
  },
  disabledText: {
    color: 'gray',
  },
  featuredProductsText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 10,
  },
  productList: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  productCard: {
    flexDirection: 'row', // Align items horizontally
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    alignItems: 'center',
    elevation: 5,
  },
  productImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
    marginRight: 25,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1, // Allow details to take remaining space
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#6200EE',
  },
});
