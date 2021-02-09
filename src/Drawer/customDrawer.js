import React, {Component} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  drawer,
} from '@react-navigation/drawer';
import {Dimensions, Image, StyleSheet, View, Text} from 'react-native';
import avatar from '../media/temp/profile.png';
import global from '../components/global';

const {width, height} = Dimensions.get('screen');

export default function SideBar({...props}) {
  function UserName(user) {
    if (user !== null) {
      return <Text style={styles.UserName}>{user.name}</Text>;
    } else {
      return <Text style={styles.UserName}></Text>;
    }
  }
  // hien thi sign out item neu user da dang nhap
  const SignOut = (user) => {
    if (user !== null) {
      return (
        <DrawerItem
          label="Sign Out"
          style={{backgroundColor: '#fff', borderRadius: 10}}
          onPress={() => {
            global.onSignOut();
          }}
        />
      );
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.Header}>
        <Image
          source={avatar}
          style={{
            width: width / 3,
            height: (height / 5) * 0.85,
            borderRadius: 200,
          }}
        />

        {UserName(props.user)}
      </View>

      <DrawerItemList
        {...props}
        itemStyle={{backgroundColor: '#fff', borderRadius: 10}}
      />
      {SignOut(props.user)}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: (width / 4) * 3,
    height: height / 5,
    alignItems: 'center',
    backgroundColor: '#2ABA99',
    marginTop: 15,
    marginBottom: 50,
  },
  UserName: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});
