import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const fetchTreeData = async () => {
    try {
        const response = await fetch('https://www.api.myudbhab.in/api/user/getSponsorChildrens/676e7a642b5bc486f0c65721');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

const TreeNode = ({ node }) => {
    if (!node) return null;

    return (
        <View style={styles.nodeWrapper}>
            {/* Parent Node */}
            <View style={styles.node}>
                <Image source={require('../assets/icons/profile.png')} style={styles.image} />
                <Text style={styles.name}>{node.value}</Text>
                <Text style={styles.sponsorId}>{node.mySponsorId}</Text>
            </View>

            {/* Lines and Child Nodes */}
            {(node.leftChild || node.rightChild) && (
                <>
                    {/* Vertical Line from Parent to Middle */}
                    <View style={styles.verticalLine} />

                    {/* Horizontal Line connecting children */}
                    <View style={styles.childrenRow}>
                        {node.leftChild && <View style={styles.horizontalLine} />}
                        {node.rightChild && <View style={styles.horizontalLine} />}
                    </View>

                    {/* Render Children Nodes */}
                    <View style={styles.childrenContainer}>
                        {node.leftChild && <TreeNode node={node.leftChild} />}
                        {node.rightChild && <TreeNode node={node.rightChild} />}
                    </View>
                </>
            )}
        </View>
    );
};

const BinaryTree = () => {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTreeData();
            setTreeData(data);
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
    }

    return (
        <ScrollView horizontal style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {treeData && <TreeNode node={treeData} />}
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
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 50,
    },
    nodeWrapper: {
        alignItems: 'center',
        marginVertical: 20,
    },
    node: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: 125,
        margin: 10,
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
    verticalLine: {
        width: 2,
        height: 30,
        backgroundColor: '#000',
        marginBottom: -5,
    },
    childrenRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalLine: {
        width: 90,
        height: 2,
        backgroundColor: '#000',
    },
    childrenContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BinaryTree;