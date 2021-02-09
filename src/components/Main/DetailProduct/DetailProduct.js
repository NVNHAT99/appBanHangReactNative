import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

import backList from '../../../media/appIcon/backList.png';

import cart from '../../../media/appIcon/cartfull.png';

import global from '../../global';

const {width, height} = Dimensions.get('window');

export class DetailProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {product: this.props.route.params.product};
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // ham nay kiem tra props cua component neu no thay doi cap nhap lai state
    // chi su dum ham nay neu state component phu thuoc vao su thay doi cua props
    try {
      if (
        nextProps.route.params.product !== null &&
        prevState.product !== nextProps.route.params.product
      )
        return {product: nextProps.route.params.product};
      else return null;
    } catch (e) {
      return null;
    }
  }
  GoBackMain() {
    this.props.navigation.goBack();
  }

  addProductToCart() {
    const product = this.state.product;
    global.addProductToCart(product);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#D6D6D6'}}>
        <View style={styles.Container}>
          <View style={styles.Header}>
            <TouchableOpacity onPress={this.GoBackMain.bind(this)}>
              <Image source={backList} style={styles.IconBack} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.addProductToCart.bind(this)}>
              <Image source={cart} style={styles.IconBack} />
            </TouchableOpacity>
          </View>
          <View style={styles.ProductContainer}>
            <View style={styles.ImgProduct}>
              <Image
                source={{
                  uri: `http://192.168.0.104/app/images/product/${this.state.product.images[0]}`,
                }}
                style={styles.ImgProductStyle}
              />
              <Image
                source={{
                  uri: `http://192.168.0.104/app/images/product/${this.state.product.images[1]}`,
                }}
                style={styles.ImgProductStyle}
              />
            </View>

            <View style={styles.RowProductNameAndPrice}>
              <Text style={styles.textNameAndPrice}>
                {this.state.product.name} / {this.state.product.price}$
              </Text>
            </View>
          </View>
          <View style={styles.ProductDetails}>
            <Text style={styles.firstRowTextDetail}>
              {this.state.product.description}
            </Text>
            <View style={styles.secondRowTextDetail}>
              <Text style={styles.textSecondRowStyle}>
                Material {this.state.product.material}
              </Text>
              <View style={styles.InfoColor}>
                <Text style={[styles.textSecondRowStyle]}>
                  Color {this.state.product.color}
                </Text>
                <View
                  style={[
                    styles.Color,
                    {
                      backgroundColor: this.state.product.color.toLowerCase(),
                    },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DetailProduct;

const widthProductImg = width / 2 - 20;
const heightProductImg = (widthProductImg * 1200) / 960;
const styles = StyleSheet.create({
  Header: {
    height: height / 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  Container: {flex: 1, margin: 10, backgroundColor: '#fff'},
  IconBack: {width: width / 14, height: width / 14},
  TitleHeader: {fontSize: 20, color: '#C5357B'},
  ProductContainer: {
    borderColor: '#F1F1F1',
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  ImgProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 6,
  },
  ImgProductStyle: {
    width: widthProductImg,
    height: heightProductImg,
  },
  RowProductNameAndPrice: {
    alignItems: 'center',
    marginTop: 10,
  },
  textNameAndPrice: {fontSize: 20},
  ProductDetails: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 15,
  },
  firstRowTextDetail: {fontSize: 15},
  secondRowTextDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'scroll',
  },
  textSecondRowStyle: {color: '#D877A8', fontSize: 15},
  InfoColor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Color: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    marginLeft: 5,
    borderRadius: 10,
  },
});
