import React, { useEffect, useState, memo } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Line } from 'react-native-svg';

const { width } = Dimensions.get('window'); // Get screen width

const fetchTreeData = async (userId) => {
    try {
        const response = await fetch(`https://www.api.myudbhab.in/api/user/getSponsorChildrens/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

// Memoized Tree Node Component
const TreeNode = memo(({ node, x, y, parentX, parentY, depth }) => {
    if (!node) return null;
    
    // **LIMIT TREE DEPTH** to avoid too much data rendering at once
    if (depth > 4) return null;

    const nodeWidth = 120;
    const nodeHeight = 100;
    const horizontalSpacing = 140; // Adjusted spacing
    const verticalSpacing = 120; // Adjusted vertical spacing

    const leftChild = node.leftChild || { value: 'No User', isBlank: true };
    const rightChild = node.rightChild || { value: 'No User', isBlank: true };

    return (
        <View>
            {/* Connection Line to Parent */}
            {parentX !== null && parentY !== null && (
                <Svg style={styles.svg}>
                    <Line x1={parentX + nodeWidth / 2} y1={parentY + nodeHeight}
                          x2={x + nodeWidth / 2} y2={y} 
                          stroke="gray" strokeWidth="2" />
                </Svg>
            )}

            {/* Node */}
            <View style={[styles.node, { backgroundColor: node.isBlank ? '#ddd' : '#fff', left: x, top: y }]}>
                <Image source={require('../assets/icons/profile.png')} style={styles.image} />
                <Text style={[styles.name, node.isBlank && { color: 'gray' }]}>{node.value}</Text>
                {!node.isBlank && <Text style={styles.sponsorId}>{node.mySponsorId}</Text>}
            </View>

            {/* Render Left and Right Children */}
            <TreeNode node={leftChild} x={x - horizontalSpacing} y={y + verticalSpacing} parentX={x} parentY={y} depth={depth + 1} />
            <TreeNode node={rightChild} x={x + horizontalSpacing} y={y + verticalSpacing} parentX={x} parentY={y} depth={depth + 1} />
        </View>
    );
});

const BinaryTree = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) {
                    console.error('No user ID found in AsyncStorage');
                    setLoading(false);
                    return;
                }

                const data = await fetchTreeData(userId);
                setTreeData(data);
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <ScrollView horizontal style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {treeData && <TreeNode node={treeData} x={width / 2 - 60} y={50} parentX={null} parentY={null} depth={1} />}
            </ScrollView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        minWidth: 1500, // Allow scrolling for large trees
        minHeight: 800,
        alignItems: 'center',
        paddingVertical: 50,
    },
    node: {
        position: 'absolute',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: 120,
        height: 100,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    name: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    sponsorId: {
        fontSize: 12,
        color: 'blue',
        marginTop: 5,
    },
    svg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1, // Keeps lines behind nodes
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BinaryTree;
