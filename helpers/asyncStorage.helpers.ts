import AsyncStorage from '@react-native-async-storage/async-storage';
import {Category} from '../store/reducers/categories';

export const CATEGORIES_KEY = 'categories';

export const storeData = async (
  key: string,
  value: Record<string, Category>,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log('Error storing data:', e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return {};
  } catch (e) {
    console.log('Error retrieving data:', e);
  }
};
