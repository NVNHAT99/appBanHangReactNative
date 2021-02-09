import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    return value !== null ? value : '';
  } catch (e) {
    return '';
  }
};
export {getToken};
