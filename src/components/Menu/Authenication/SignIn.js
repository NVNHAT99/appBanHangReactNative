import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import global from '../../global';
import {signIn} from '../../../API/signIn';
import {saveToken} from '../../../API/saveToken';
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      refesh: '',
    };
  }
  signIn() {
    const {email, password} = this.state;
    signIn(email, password)
      .then((res) => {
        global.onLogin(res.user);
        saveToken(res.token);
      })
      .catch();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // ham nay kiem tra props cua component neu no thay doi cap nhap lai state
    // chi su dum ham nay neu state component phu thuoc vao su thay doi cua props
    try {
      if (prevState.refesh !== nextProps.refesh)
        return {
          email: '',
          password: '',
          refesh: nextProps.refesh,
        };
      else return null;
    } catch (e) {
      return null;
    }
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Enter your email"
          style={styles.textInput}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          placeholder="Enter your password"
          style={styles.textInput}
          value={this.state.password}
          secureTextEntry
          onChangeText={(text) => this.setState({password: text})}
        />
        <TouchableOpacity
          style={styles.SignInButton}
          onPress={this.signIn.bind(this)}>
          <Text style={styles.textButtonSubmit}> SIGN IN NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignIn;

const styles = StyleSheet.create({
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
