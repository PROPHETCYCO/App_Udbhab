import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MyOrderScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const sponsorId = await AsyncStorage.getItem("userSponsorId");
        if (!sponsorId) {
          console.error("Sponsor ID not found in AsyncStorage");
          return;
        }

        const response = await axios.post(
          "https://www.api.myudbhab.in/api/user/myOrders",
          { sponsorId }, // Sending in the request body
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setOrders(response.data.myOrders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        orders.map((order, index) => (
          <View key={index} style={styles.card}>
            {/* Order Details */}
            <View style={styles.row}>
              <Text style={styles.label}>Order No:</Text>
              <Text style={styles.value}>{order.orderDetails.orderNumber}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={[styles.value, styles.amountText]}>₹{order.orderDetails.totalAmount}/-</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>BV Points:</Text>
              <Text style={styles.value}>{order.orderDetails.totalBVPoints}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Order Date:</Text>
              <Text style={styles.value}>{new Date(order.orderDetails.orderDate).toLocaleDateString()}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Pickup Mode:</Text>
              <Text style={styles.value}>{order.deliveryMode}</Text>
            </View>

            {/* Product List */}
            <View style={styles.productsContainer}>
              <Text style={styles.productsTitle}>Products Ordered:</Text>
              {order.products.map((product, pIndex) => (
                <View key={pIndex} style={styles.productItem}>
                  <Text style={styles.productName}>{product.name} (x{product.quantity})</Text>
                  <Text style={styles.productPrice}>₹{product.totalAmount}</Text>
                </View>
              ))}
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f8f9fa',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#777',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 4, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#222',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  productsContainer: {
    marginTop: 12,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  productsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  productName: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28A745',
  },
});

export default MyOrderScreen;