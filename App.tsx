import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { Image, StyleSheet } from 'react-native';
import { LandingScreen } from './src/screens/LandingScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux';

const switchNavigator = createSwitchNavigator({
  landingStack: {
    screen: createStackNavigator(
      {
        Landing: LandingScreen,
      },
      {
        defaultNavigationOptions: {
          headerShown: false,
        },
      }
    ),
  },
  homeStack: createBottomTabNavigator({
    home: {
      screen: createStackNavigator(
        {
          HomePage: HomeScreen,
        },
        {
          defaultNavigationOptions: {
            headerShown: false,
          },
        }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const icon =
            focused === true
              ? require('./src/images/home_icon.png')
              : require('./src/images/home_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
    offer: {
      screen: createStackNavigator({
        OfferPage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const icon =
            focused === true
              ? require('./src/images/offer_icon.png')
              : require('./src/images/offer_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
    cart: {
      screen: createStackNavigator({
        CarPage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const icon =
            focused === true
              ? require('./src/images/cart_icon.png')
              : require('./src/images/cart_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
    account: {
      screen: createStackNavigator({
        AccountPage: HomeScreen,
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          const icon =
            focused === true
              ? require('./src/images/account_icon.png')
              : require('./src/images/account_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />;
        },
      },
    },
  }),
});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30,
  },
});
