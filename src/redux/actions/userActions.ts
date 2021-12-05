import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Dispatch } from 'react';
import { LocationGeocodedAddress } from 'expo-location';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

export interface UpdateLocationAction {
  readonly type: 'ON_UPDATE_LOCATION';
  payload: LocationGeocodedAddress;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: LocationGeocodedAddress | unknown;
}

export type UserAction = UpdateLocationAction | UserErrorAction;

export const onUpdateLocation = (location: LocationGeocodedAddress) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      const locationString = JSON.stringify(location);
      await AsyncStorageLib.setItem('user_location', locationString);
      dispatch({
        type: 'ON_UPDATE_LOCATION',
        payload: location,
      });
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};
