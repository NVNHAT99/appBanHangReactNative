import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Alert} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {register} from '../../../API/register';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPass: '',
    };
  }
  gotoSignIn = (valueIsSignIn) => {
    this.props.setIsSignIn(valueIsSignIn);
  };
  registerUser() {
    const {name, email, password} = this.state;
    register(email, name, password).then((res) => {
      if (res === 'THANH_CONG') {
        this.onSuccess();
      } else {
        this.onFail();
      }
    });
  }
  onSuccess() {
    Alert.alert('Notice', 'Sign up successfully', [
      {
        text: 'OK',
        onPress: this.gotoSignIn(true),
      },
    ]);
  }
  onFail() {
    Alert.alert('Notice', 'Sign up fail', [
      {
        text: 'OK',
        onPress: this.gotoSignIn(false),
      },
    ]);
  }
  render() {
    return (
      <View>
        <TextInput
          placeholder="Enter your name"
          style={styles.textInput}
          value={this.state.name}
          onChangeText={(text) => this.setState({name: text})}
        />
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
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm your password"
          style={styles.textInput}
          value={this.state.confirmPass}
          onChangeText={(text) => this.setState({confirmPass: text})}
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.SignInButton}
          onPress={this.registerUser.bind(this)}>
          <Text style={styles.textButtonSubmit}> SIGN UP NOW</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
export default SignUp;
