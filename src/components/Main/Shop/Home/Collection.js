import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

// need get from sever but now use img
import imgCollection from '../../../../media/temp/banner.jpg';
const {width, height} = Dimensions.get('window');

export default class Collection extends Component {
  gotoListProduct() {
    const {navigation} = this.props;
    navigation.navigate('ListProduct', {
      typeId: 'COLLECTION',
      name: 'SPRING COLLECTION',
    });
  }
  render() {
    return (
      <View style={styles.Wraper}>
        <View style={styles.title}>
          <Text style={styles.texTitleStyle}>SPRING COLLECTION </Text>
        </View>
        <View style={styles.banner}>
          <TouchableOpacity onPress={() => this.gotoListProduct()}>
            <Image source={imgCollection} style={styles.imgStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// sise of banner 933-465
const imgWidth = width - 40;
const imgHeight = height * 0.3 * (8 / 10) - 10;
const styles = StyleSheet.create({
  Wraper: {
    height: height * 0.3,
    backgroundColor: 'white',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
  title: {
    flex: 2,
    justifyContent: 'center',
  },
  banner: {
    flex: 8,
  },
  imgStyle: {
    width: imgWidth,
    height: imgHeight,
  },
  texTitleStyle: {
    fontSize: 20,
  },
});
