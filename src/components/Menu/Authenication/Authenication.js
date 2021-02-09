import React, {Component} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import icBack from '../../../media/appIcon/back_white.png';
import icLogo from '../../../media/appIcon/ic_logo.png';

import SignIn from '../Authenication/SignIn';
import SignUp from '../Authenication/SignUp';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();

class Authenication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignIn: true,
      refesh: '',
    };
  }
  GoBackHome = () => {
    this.setState({isSignIn: true}, () => {
      this.props.navigation.navigate('Home');
    });
  };
  SignIn_Click() {
    this.setState({isSignIn: true});
  }

  SignUp_Click() {
    this.setState({isSignIn: false});
  }
  setIsSignIn(valueIsSignIn) {
    this.setState({isSignIn: valueIsSignIn});
  }
  render() {
    const mainJSX = this.state.isSignIn ? (
      <SignIn
        navigation={this.props.navigation}
        setIsSignIn={this.setIsSignIn.bind(this)}
        refesh={new Date().getTime()}
      />
    ) : (
      <SignUp
        navigation={this.props.navigation}
        setIsSignIn={this.setIsSignIn.bind(this)}
        refesh={new Date().getTime()}
      />
    );
    return (
      <View style={styles.Wraper}>
        <StatusBar hidden />
        <View style={styles.Header}>
          <TouchableOpacity onPress={this.GoBackHome}>
            <Image source={icBack} style={styles.Icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Wearing a Dress</Text>
          <Image source={icLogo} style={styles.Icon} />
        </View>
        {mainJSX}
        <View style={styles.Bottom}>
          <TouchableOpacity
            style={styles.SignIn}
            onPress={this.SignIn_Click.bind(this)}>
            <Text
              style={
                this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle
              }>
              SIGN IN
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SignUp}
            onPress={this.SignUp_Click.bind(this)}>
            <Text
              style={
                !this.state.isSignIn ? styles.activeStyle : styles.inactiveStyle
              }>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// su dung funtion component nay cho drawer navigation
const Authenication_Stack = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={Authenication} />
    </Stack.Navigator>
  );
};
export default Authenication_Stack;

const widthButton = width / 2 - 20;
const heighButton = height / 15;

const styles = StyleSheet.create({
  Wraper: {
    backgroundColor: '#37C18A',
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
  },
  Header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  Bottom: {
    height: height / 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    height: height / 23,
    width: width / 12,
  },
  title: {
    color: '#fff',
    fontSize: 25,
  },
  SignIn: {
    backgroundColor: '#fff',
    width: widthButton,
    height: heighButton,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 1.5,
  },
  SignUp: {
    backgroundColor: '#fff',
    width: widthButton,
    height: heighButton,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1.5,
  },
  inactiveStyle: {
    color: '#D7D7D7',
  },
  activeStyle: {
    color: '#3EBA77',
  },
  textInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 25,
    marginBottom: 10,
  },
  SignInButton: {
    borderRadius: 25,
    borderColor: '#fff',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonSubmit: {
    color: '#fff',
  },
});
