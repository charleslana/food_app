import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '../utils';

const screenWidth = Dimensions.get('screen').width;

export const LandingScreen = () => {
  const { navigate } = useNavigation();
  const [errorMsg, setErrorMsg] = useState('');
  const [address, setAddress] = useState<Location.LocationGeocodedAddress>();
  const [displayAddress, setDisplayAddress] = useState(
    'Waiting for Current Location'
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      setErrorMsg('Permission to access location is not granted.');
    }
    const location: Location.LocationObject =
      await Location.getCurrentPositionAsync();
    const { coords } = location;
    if (coords) {
      const { latitude, longitude } = coords;
      const addressReponse: Location.LocationGeocodedAddress[] =
        await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
      for (const item of addressReponse) {
        setAddress(item);
        const currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;
        setDisplayAddress(currentAddress);
        if (currentAddress.length > 0) {
          setTimeout(() => {
            navigate('homeStack');
          }, 2000);
        }
        return;
      }
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation} />
      <View style={styles.body}>
        <Image
          source={require('../images/delivery_icon.png')}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>
        <Text style={styles.addresText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  addressTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7D7D7D',
  },
  addresText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F',
  },
  footer: {
    flex: 1,
  },
});
