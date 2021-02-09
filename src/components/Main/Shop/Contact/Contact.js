import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import mapImg from '../../../../media/appIcon/map.png';

import location from '../../../../media/appIcon/location.png';
import phoneIcon from '../../../../media/appIcon/phone.png';
import mailIcon from '../../../../media/appIcon/mail.png';
import messageIcon from '../../../../media/appIcon/message.png';

const {width, height} = Dimensions.get('screen');

export class Contact extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.map}>
          <Image source={mapImg} style={styles.mapImg} />
        </View>
        <View style={styles.contactContainer}>
          <View style={styles.rowContac}>
            <Image source={location} style={styles.iconContact} />
            <Text style={styles.textRowContact}>
              90 Le thi rieng / Ben Thanh Dist
            </Text>
          </View>
          <View style={styles.rowContac}>
            <Image source={phoneIcon} style={styles.iconContact} />
            <Text style={styles.textRowContact}>036960105</Text>
          </View>
          <View style={styles.rowContac}>
            <Image source={messageIcon} style={styles.iconContact} />
            <Text style={styles.textRowContact}>nvnhat996@gmail.com</Text>
          </View>
          <View style={styles.rowContac}>
            <Image source={mailIcon} style={styles.iconContact} />
            <Text style={styles.textRowContact}>nvnhat996@gmail.com</Text>
          </View>
        </View>
      </View>
    );
  }
}
// 1260
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
  },
  map: {
    height: height / 3 - 10,
    marginBottom: 10,
  },
  contactContainer: {
    height: (height / 3) * 2 - 10,
    backgroundColor: '#fff',
  },
  mapImg: {
    width: width - 20,
    height: height / 3 - 20,
  },
  rowContac: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    height: ((height / 3) * 2 - 10) / 6,
  },
  iconContact: {width: 30, height: 30},
  textRowContact: {
    color: '#B93976',
    fontSize: 18,
  },
});
export default Contact;
