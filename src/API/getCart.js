import AsyncStorage from '@react-native-async-storage/async-storage';

const getCart = async () => {
  try {
    const cartArray = await AsyncStorage.getItem('@cart');
    return cartArray !== null ? JSON.parse(cartArray) : [];
  } catch (e) {
    return [];
  }
};
export {getCart};
