import React from 'react';
import { ButtonWithIcon } from '../components';
import { useNavigation } from '../utils';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';

import {
  RestaurantModel,
  FoodModel,
  ApplicationState,
  UserState,
} from '../redux';

interface RestaurantProps {
  userReducer: UserState;
  navigation: { getParam(restaurant: string): void; goBack(): void };
  onUpdateCart: void;
}

const _RestaurantScreen: React.FC<RestaurantProps> = props => {
  const { getParam, goBack } = props.navigation;
  const restaurant = getParam('restaurant') as RestaurantModel;
  const { navigate } = useNavigation();

  const onTapFood = (item: FoodModel) => {
    navigate('FoodDetailPage', { food: item });
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <ButtonWithIcon
          icon={require('../images/back_arrow.png')}
          onTap={() => goBack()}
          width={42}
          height={42}
        />
        <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80 }}>
          {' '}
          {restaurant.name}
        </Text>
      </View>
      <View style={styles.body}>
        <ImageBackground
          source={{ uri: `${restaurant.images[0]}` }}
          style={{
            width: Dimensions.get('screen').width,
            height: 300,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              height: 120,
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: 10,
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }}>
              {' '}
              {restaurant.name}
            </Text>
            <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }}>
              {' '}
              {restaurant.address} {restaurant.phone}
            </Text>
          </View>
        </ImageBackground>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={restaurant.foods}
          renderItem={({ item }) =>
            // <FoodCard
            //   item={checkExistence(item, Cart)}
            //   onTap={onTapFood}
            //   onUpdateCart={props.onUpdateCart}
            // />
            null
          }
          keyExtractor={item => `${item._id}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F2F2' },
  navigation: {
    flex: 1,
    marginTop: 43,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 11,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  footer: { flex: 1, backgroundColor: 'cyan' },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const RestaurantScreen = connect(mapToStateProps, {})(_RestaurantScreen);

export { RestaurantScreen };
