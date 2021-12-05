import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View } from 'react-native';
import {
  ApplicationState,
  onAvailability,
  ShoppingState,
  UserState,
} from '../redux';

interface HomeProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onAvailability(location: string | null): void;
}

const _HomeScreen: React.FC<HomeProps> = props => {
  const { location } = props.userReducer;
  const { availability } = props.shoppingReducer;
  const { categories, foods, restaurants } = availability;

  useEffect(() => {
    const { onAvailability } = props;
    onAvailability(location.postalCode);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.location}>
          <Text>{`${location.name}, ${location.street}, ${location.district}`}</Text>
          <Text>Edit</Text>
        </View>
        <View style={styles.searchBar}>
          <Text>Search Bar</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    flex: 1,
  },
  navigation: {
    flex: 2,
    backgroundColor: 'red',
  },
  location: {
    marginTop: 20,
    flex: 4,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBar: {
    flex: 8,
    backgroundColor: 'purple',
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
    backgroundColor: 'cyan',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  shoppingReducer: state.shoppingReducer,
});

const HomeScreen = connect(mapToStateProps, { onAvailability })(_HomeScreen);

export { HomeScreen };
