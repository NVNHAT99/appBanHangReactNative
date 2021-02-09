import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View, Image, StyleSheet, Alert} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import global from '../../../global';

import {senOrder} from '../../../../API/senOder';
import {getToken} from '../../../../API/getToken';
const {width, height} = Dimensions.get('window');

const onSenOrder = async (arrayDetailOrder) => {
  try {
    const token = await getToken();
    const rs = await senOrder(token, arrayDetailOrder);
    if (rs === 'THEM_THANH_CONG') {
      // xoa gio hang trong bo nho
      onSuccess();
    } else console.log(rs);
  } catch (error) {
    console.log(error);
  }
};
function onSuccess() {
  Alert.alert('Notice', 'Order successfully', [
    {
      text: 'OK',
      onPress: () => {
        global.deleteOrder();
        if (global.getOrders !== null) {
          global.getOrders();
        }
      },
    },
  ]);
}
function onFail() {
  Alert.alert('Notice', 'Order fail', [
    {
      text: 'OK',
    },
  ]);
}

export default function Cart(props) {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let newTotalPrice = 0;
    props.cartArray.forEach((element) => {
      newTotalPrice =
        newTotalPrice + Number(element.product.price * element.quatity);
    });
    setCarts(props.cartArray);
    setTotalPrice(newTotalPrice);
  }, [carts, props.cartArray]);

  const incrQuantity = (productId) => {
    global.incrQuantity(productId);
  };
  const decrQuantity = (productId) => {
    global.decrQuantity(productId);
  };
  return (
    <View style={styles.Wraper}>
      <View style={{flex: 9}}>
        <FlatList
          data={carts}
          keyExtractor={(item) => item.product.id}
          extraData={carts}
          renderItem={({item, index}) => (
            <View style={styles.ProductContainer} key={item.product.id}>
              <View style={styles.ImgViewProduct}>
                <Image
                  source={{
                    uri: `http://192.168.0.104/app/images/product/${item.product.images[0]}`,
                  }}
                  style={styles.ImageProductStyle}
                />
              </View>
              <View style={styles.ProductInfo}>
                <View style={styles.FirstAndLastRowStyle}>
                  <Text style={styles.ProductName}>{item.product.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      global.remmoveProduct(item.product.id);
                    }}>
                    <Text style={{fontSize: 18}}>X</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.ProductPrice}> {item.product.price} $</Text>
                <View style={styles.FirstAndLastRowStyle}>
                  <View style={styles.LastRowProductInfo}>
                    <TouchableOpacity
                      onPress={() => {
                        incrQuantity(item.product.id);
                      }}>
                      <Text style={styles.TextInitProduct}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.TextInitProduct}>{item.quatity}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        decrQuantity(item.product.id);
                      }}>
                      <Text style={[styles.TextInitProduct]}>-</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.DetailTextStyle}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('DetailProduct', {
                          product: item.product,
                        });
                      }}>
                      <Text>Show Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity
        style={styles.ButtonOrderSize}
        onPress={() => {
          const arrayDetail = carts.map((item) => {
            return {
              id: item.product.id,
              quantity: item.quatity,
            };
          });
          console.log(arrayDetail);
          onSenOrder(arrayDetail);
        }}>
        <View style={styles.ButtonOrder}>
          <Text>TOTAL {totalPrice}$ CHECKOUT NOW</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Wraper: {
    flex: 1,
    backgroundColor: '#DADADA',
  },
  ProductContainer: {
    height: height * 0.215,
    backgroundColor: '#fff',
    margin: 10,
    flexDirection: 'row',
    padding: 10,
  },
  ImgViewProduct: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageProductStyle: {
    width: width * 0.28,
    height: (width * 0.28 * 452) / 361 + 10,
  },
  ProductInfo: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  FirstAndLastRowStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ProductName: {fontSize: 20},
  ProductPrice: {fontSize: 20, color: '#D3659B'},
  LastRowProductInfo: {
    width: width * 0.29,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  TextInitProduct: {fontSize: 22},
  DetailTextStyle: {alignItems: 'flex-end', marginTop: 4},
  ButtonOrder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ABA99',
  },
  ButtonOrderSize: {height: height / 14},
});
