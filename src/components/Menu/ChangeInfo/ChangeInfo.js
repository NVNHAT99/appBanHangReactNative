import React, {Component} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {ChangeInfoUser} from '../../../API/changeInfoUser';
import {getToken} from '../../../API/getToken';
import global from '../../global';

import back from '../../../media/appIcon/backs.png';
import refesh from '../../../media/appIcon/refesh.png';

const {width, height} = Dimensions.get('window');

export class ChangeInfo extends Component {
  constructor(props) {
    super(props);
    const {name, address, phone} = props.user;
    this.state = {
      txtName: name,
      txtAddress: address,
      txtPhone: phone,
    };
  }
  goBackHome() {
    this.props.navigation.navigate('Home');
  }
  change_Info() {
    const {txtName, txtAddress, txtPhone} = this.state;
    getToken()
      .then((token) => ChangeInfoUser(token, txtName, txtPhone, txtAddress))
      .then(async (user) => {
        global.onLogin(user);
        this.onSuccess();
      })
      .catch();
  }
  onSuccess() {
    Alert.alert('Notice', 'Change Infomation successfully', [
      {
        text: 'OK',
        onPress: () => this.props.navigation.navigate('Home'),
      },
    ]);
  }
  async reloadUser() {
    const user = await global.getUser();
    this.setState({
      txtName: user.name,
      txtAddress: user.address,
      txtPhone: user.phone,
    });
  }
  render() {
    return (
      <View style={styles.wraper}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={this.reloadUser.bind(this)}>
            <Image source={refesh} style={{width: 28, height: 28}} />
          </TouchableOpacity>
          <Text style={styles.tileHeader}>User Infomation</Text>
          <TouchableOpacity onPress={this.goBackHome.bind(this)}>
            <Image source={back} style={{width: 28, height: 28}} />
          </TouchableOpacity>
        </View>
        <View style={styles.userContaier}>
          <TextInput
            style={styles.textInput}
            value={this.state.txtName}
            onChangeText={(text) => this.setState({txtName: text})}
          />
          <TextInput
            style={styles.textInput}
            value={this.state.txtAddress}
            onChangeText={(text) => this.setState({txtAddress: text})}
          />
          <TextInput
            style={styles.textInput}
            value={this.state.txtPhone}
            onChangeText={(text) => this.setState({txtPhone: text})}
          />
          <TouchableOpacity onPress={this.change_Info.bind(this)}>
            <View style={styles.buttonSubmit}>
              <Text style={styles.textButtonSubmit}>
                CHANGE YOUR INFOMATION
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wraper: {
    flex: 1,
    backgroundColor: '#F3F3F3',
  },
  Header: {
    flex: 1,
    backgroundColor: '#2ABA99',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tileHeader: {
    color: 'white',
    fontSize: 18,
  },
  userContaier: {
    flex: 11,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1.2,
    borderColor: '#2ABA99',
    borderRadius: 50,
    marginBottom: 20,
    paddingLeft: 15,
  },
  buttonSubmit: {
    height: 50,
    backgroundColor: '#2ABA99',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textButtonSubmit: {
    color: 'white',
  },
});

export default ChangeInfo;
