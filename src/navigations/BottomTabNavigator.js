import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import IntroductionScreen from '../screens/ModalSection/AboutSection/IntroductionScreen';
import MissionScreen from '../screens/ModalSection/AboutSection/MissionScreen';
import ManagementScreen from '../screens/ModalSection/AboutSection/ManagementScreen';
import DocumentScreen from '../screens/ModalSection/AboutSection/DocumentScreen';
import AwardScreen from '../screens/ModalSection/AboutSection/AwardScreen';
import EducationScreen from '../screens/ModalSection/EducationScreen';
import IndustryScreen from '../screens/ModalSection/IndustryScreen';
import NewsScreen from '../screens/ModalSection/NewsScreen';
import DownloadScreen from '../screens/ModalSection/DownloadScreen';
import ContactUsScreen from '../screens/ModalSection/ContactUsScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import BinaryTree from '../screens/BinaryTree';
import MyOrderScreen from '../screens/MyOrderScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/**
 * CustomTabBar: Custom tab bar component for rendering the bottom navigation.
 */
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'MiddleButton') {
            navigation.navigate('ModalScreen');
          } else {
            navigation.navigate(route.name);
          }
        };

        const iconSource = getIconSource(route.name);
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={
              route.name === 'MiddleButton'
                ? styles.middleButtonContainer
                : styles.tabItem
            }>
            {route.name === 'MiddleButton' ? (
              <View style={styles.middleButton}>
                <Text style={styles.middleButtonText}>+</Text>
              </View>
            ) : (
              <Image
                source={iconSource}
                style={[
                  styles.icon,
                  isFocused ? styles.iconFocused : styles.iconDefault,
                ]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

/**
 * getIconSource: Helper function to fetch the correct icon based on the route name.
 */
const getIconSource = routeName => {
  switch (routeName) {
    case 'HomeTab':
      return require('../assets/icons/home.png');
    case 'ProfileTab':
      return require('../assets/icons/profile.png');
    default:
      return null;
  }
};

/**
 * TabNavigator: Configures the bottom tab navigation with three tabs.
 */
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{headerShown: false}}
    tabBar={props => <CustomTabBar {...props} />}>
    <Tab.Screen name="HomeTab" component={HomeScreen} />
    <Tab.Screen name="MiddleButton">{() => null}</Tab.Screen>
    <Tab.Screen name="ProfileTab" component={ProfileScreen} />
  </Tab.Navigator>
);

/**
 * BottomTabNavigator: Main stack navigator integrating TabNavigator, ModalScreen, and other screens.
 */
const BottomTabNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModalScreen"
        component={ModalScreen}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      {/* Add the screens for navigation from ModalScreen */}
      <Stack.Screen
        name="Education"
        component={EducationScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Industry"
        component={IndustryScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Download"
        component={DownloadScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactUsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Introduction"
        component={IntroductionScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Mission"
        component={MissionScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Management"
        component={ManagementScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Document"
        component={DocumentScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Award"
        component={AwardScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Forgot"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Binary"
        component={BinaryTree}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MyOrder"
        component={MyOrderScreen}
        options={{
          headerTitle: () => (
            <Image
              source={require('../assets/images/udbhab.png')}
              style={{width: 120, height: 60}}
              resizeMode="contain"
            />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#d1ecf1',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconDefault: {
    tintColor: '#AAA',
  },
  iconFocused: {
    tintColor: '#179711',
  },
  middleButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#095444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    //elevation: 10,
  },
  middleButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});
