import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

export default class Category extends Component {
  goToListProduct(typeId, name) {
    const {navigation} = this.props;
    navigation.navigate('ListProduct', {typeId: typeId, name: name});
  }
  render() {
    return (
      <View style={styles.Wraper}>
        <View style={styles.title}>
          <Text style={styles.texTitleStyle}>LIST OF CATEGORY</Text>
        </View>
        <View style={styles.banner}>
          <Swiper autoplay={true} autoplayTimeout={10}>
            {this.props.types.map((item) => (
              <TouchableOpacity
                onPress={this.goToListProduct.bind(this, item.id, item.name)}
                key={item.id}>
                <ImageBackground
                  source={{
                    uri: `http://192.168.0.104/app/images/type/${item.image}`,
                  }}
                  style={styles.imgStyle}>
                  <Text>{item.name}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </Swiper>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  texTitleStyle: {
    fontSize: 20,
  },
  cateTitle: {},
});
