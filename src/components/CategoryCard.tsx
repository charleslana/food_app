import React from 'react';
import { CategoryModel } from '../redux';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CategoryProps {
  item: CategoryModel;
  onTap(item: CategoryModel): void;
}
const CategoryCard: React.FC<CategoryProps> = ({ item, onTap }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
      <Image source={{ uri: `${item.icon}` }} style={styles.icon} />
      <Text style={styles.cardText}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 140,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 5,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 20,
    backgroundColor: '#EAEAEA',
  },
  cardText: {
    fontSize: 14,
    marginTop: 10,
    color: '#858585',
  },
});

export { CategoryCard };
