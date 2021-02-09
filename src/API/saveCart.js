import AsyncStorage from '@react-native-async-storage/async-storage';

const saveCart = async (cartArray) => {
  await AsyncStorage.setItem('@cart', JSON.stringify(cartArray));
};
export {saveCart};
