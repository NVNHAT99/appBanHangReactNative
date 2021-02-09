import React, {Component} from 'react';
import Shop from './Shop/Shop';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  ChangeInfo_stack,
  Authenication_stack,
  OrderHistory_stack,
} from '../Menu/Menu';

import {} from '../Menu/ChangeInfo/ChangeInfo';

import SideBar from '../../Drawer/customDrawer';
import {Dimensions} from 'react-native';

import global from '../global';
import {checkLogin} from '../../API/checkLogin';
import {getToken} from '../../API/getToken';
import {saveToken} from '../../API/saveToken';
import {refeshToken} from '../../API/refeshToken';

const Drawer = createDrawerNavigator();

const {width, height} = Dimensions.get('window');
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
    global.onLogin = this.onLogin.bind(this);
    global.onSignOut = this.onSignOut.bind(this);
    global.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    getToken()
      .then((token) => checkLogin(token))
      .then((res) => this.setState({user: res.user}))
      .catch(); // neu loi tuc la chua dang nhap hoac ma token da het han
    // cu sau 30s ham refesh token gui request cho server de cung cap mot token moi
    setInterval(() => {
      refeshToken();
    }, 30000);
  }

  onLogin(user) {
    if (user != null) {
      this.setState({user: user});
    }
  }
  getUser() {
    return this.state.user;
  }

  onSignOut() {
    this.setState({user: null}, () => {
      saveToken('');
    });
  }
  render() {
    if (this.state.user) {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => (
              <SideBar {...props} user={this.state.user} />
            )}
            drawerStyle={{
              width: (width / 4) * 3,
              backgroundColor: '#2ABA99',
            }}
            initialRouteName="Home">
            <Drawer.Screen name="Home" component={Shop} />
            <Drawer.Screen name="ChangeInfo">
              {(props) => (
                <ChangeInfo_stack {...props} user={this.state.user} />
              )}
            </Drawer.Screen>
            <Drawer.Screen name="OrderHistory" component={OrderHistory_stack} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => (
              <SideBar {...props} user={this.state.user} />
            )}
            drawerStyle={{
              width: (width / 4) * 3,
              backgroundColor: '#2ABA99',
            }}
            initialRouteName="Home">
            <Drawer.Screen name="Home" component={Shop} />
            <Drawer.Screen
              name="SignIn"
              options={{
                drawerLabel: 'Sign In',
              }}>
              {(props) => <Authenication_stack {...props} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }
}

export default Main;

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};
