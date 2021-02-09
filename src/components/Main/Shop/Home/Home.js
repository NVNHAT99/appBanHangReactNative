import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from './HomeView';
import DetailProduct from '../../DetailProduct/DetailProduct';
import ListProduct from '../../ListProduct/ListProduct';
// create stack navigation to go to detail and home view
const Stack = createStackNavigator();

export class Home extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeView} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="ListProduct" component={ListProduct} />
      </Stack.Navigator>
    );
  }
}
export default Home;
