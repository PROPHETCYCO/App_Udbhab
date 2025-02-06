import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window'); // Get the screen width

const CategoryScreen = ({ route, navigation }) => {
  const { variable } = route.params; // Receive the category name
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = variable === 'All Product'
          ? `https://www.api.myudbhab.in/api/user/viewProducts`
          : `https://www.api.myudbhab.in/api/auth/product/categoryproduct/${variable}`;

        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [variable]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200EE" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Category: {variable}</Text>

      {products.length === 0 ? (
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>Coming Soon...</Text>
        </View>
      ) : (
        products.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={{ uri: item.imageURL }} style={styles.image} />
            <View style={styles.detailsContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>₹{item.mrp_price}</Text>
            </View>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    width: width * 0.95, // 95% of screen width
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 0,
    marginBottom: 12,
    flexDirection: 'row', // Image & text side by side
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  detailsContainer: {
    marginLeft: 20,
    flex: 1, // Ensures text takes remaining space
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#6200EE',

    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#777',
  },
});
