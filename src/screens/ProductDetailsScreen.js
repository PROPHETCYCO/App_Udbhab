import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: product.imageURL }} style={styles.productImage} />
            <Text style={styles.productTitle}>{product.name}</Text>
            <Text style={styles.productPrice}>Price: ₹{product.mrp_price}</Text>
            <Text style={styles.productStock}>Stock Availability: {product.stock === 0 ? <Text>Not Available</Text> : <Text>Available</Text>}</Text>
            <Text style={styles.sectionHeader}>Description:</Text>
            <Text style={styles.productDescription}>{product.description.replace(/<\/?[^>]+(>|$)/g, '')}</Text>
            <Text style={styles.sectionHeader}>Ingredients:</Text>
            <Text style={styles.productDetails}>{product.ingredients}</Text>
            <Text style={styles.sectionHeader}>Product Benefits:</Text>
            <Text style={styles.productDetails}>{product.product_benefits}</Text>
            <Text style={styles.sectionHeader}>How to Use:</Text>
            <Text style={styles.productDetails}>{product.how_to_use}</Text>
            <Text style={styles.sectionHeader}>Disclaimer:</Text>
            <Text style={styles.productDetails}>{product.disclaimer}</Text>
        </ScrollView>
    );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 18,
        color: '#6200EE',
        marginBottom: 20,
    },
    productStock: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
    },
    productDetails: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
    },
});
