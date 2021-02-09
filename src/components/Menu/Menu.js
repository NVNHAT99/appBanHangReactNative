import React from 'react';
import Authenication from './Authenication/Authenication';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import OrderHistory from './OrderHistory/OrderHistory';
import {createStackNavigator} from '@react-navigation/stack';

// create stack authenication.... and then export them to use in main.js to create drawer navigation

const Stack = createStackNavigator();

const Authenication_stack = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Authenication">
        {(props) => <Authenication {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const ChangeInfo_stack = ({...props}) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="ChangeInfo">
        {() => <ChangeInfo {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const OrderHistory_stack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
};

export {ChangeInfo_stack, Authenication_stack, OrderHistory_stack};
