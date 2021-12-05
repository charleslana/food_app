import React from 'react';
import { FoodModel, RestaurantModel } from '../redux';
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps {
  item: RestaurantModel | FoodModel;
  onTap(item: RestaurantModel | FoodModel): void;
}

const RestaurantCard: React.FC<RestaurantProps> = ({ item, onTap }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
      <Image style={styles.image} source={{ uri: `${item.images[0]}` }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 20,
    height: 230,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    borderRadius: 20,
  },
  image: {
    width: screenWidth - 20,
    height: 220,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
  },
});

export { RestaurantCard };
