import React, { useEffect } from 'react';
import { ButtonWithIcon, CategoryCard, SearchBar } from '../components';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RestaurantCard } from '../components/RestaurantCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '../utils';
import {
  ApplicationState,
  FoodModel,
  onAvailability,
  RestaurantModel,
  ShoppingState,
  UserState,
} from '../redux';

interface HomeProps {
  userReducer: UserState;
  shoppingReducer: ShoppingState;
  onAvailability(location: string | null): void;
}

const _HomeScreen: React.FC<HomeProps> = props => {
  const { navigate } = useNavigation();
  const { location } = props.userReducer;
  const { availability } = props.shoppingReducer;
  const { categories, foods, restaurants } = availability;

  useEffect(() => {
    const { onAvailability } = props;
    onAvailability(location.postalCode);
  }, []);

  const onTapRestaurant = (item: RestaurantModel) => {
    navigate('RestaurantPage', { restaurant: item });
  };

  const onTapFood = (item: FoodModel) => {
    navigate('FoodDetailPage', { food: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.location}>
          <Text>{`${location.name}, ${location.street}, ${location.district}`}</Text>
          <Text>Edit</Text>
        </View>
        <View style={styles.searchBar}>
          <SearchBar
            didTouch={() => {
              navigate('SearchPage');
            }}
            onTextChange={() => {
              null;
            }}
          />
          <ButtonWithIcon
            onTap={() => {
              null;
            }}
            icon={require('../images/hambar.png')}
            width={50}
            height={40}
          />
        </View>
      </View>
      <View style={styles.body}>
        <ScrollView>
          <FlatList
            bounces={true}
            alwaysBounceHorizontal={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({ item }) => (
              <CategoryCard
                item={item}
                onTap={() => {
                  alert('Category tapped');
                }}
              />
            )}
            keyExtractor={item => `${item.id}`}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '600',
                color: '#f15b5d',
                marginLeft: 20,
              }}
            >
              {' '}
              Top Restaurants
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={restaurants}
            renderItem={({ item }) => (
              <RestaurantCard item={item} onTap={onTapRestaurant} />
            )}
            keyExtractor={item => `${item._id}`}
          />
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '600',
                color: '#f15b5d',
                marginLeft: 20,
              }}
            >
              {' '}
              30 Minutes Foods
            </Text>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foods}
            renderItem={({ item }) => (
              <RestaurantCard item={item} onTap={onTapFood} />
            )}
            keyExtractor={item => `${item._id}`}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  navigation: {
    flex: 2,
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
    display: 'flex',
    height: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  shoppingReducer: state.shoppingReducer,
});

const HomeScreen = connect(mapToStateProps, { onAvailability })(_HomeScreen);

export { HomeScreen };
