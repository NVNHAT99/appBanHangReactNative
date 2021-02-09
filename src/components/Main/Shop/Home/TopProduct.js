import React, {Component} from 'react';
import {Text, StyleSheet, View, Dimensions, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

export default class TopProduct extends Component {
  goToDetail(product) {
    this.props.navigation.navigate('DetailProduct', {product: product});
  }
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.title}>
          <Text style={styles.textTile}>TOP PRODUCT</Text>
        </View>
        <View style={styles.body}>
          <FlatList
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={2}
            data={this.props.TopProducts}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={this.goToDetail.bind(this, item)}
                key={item.id}>
                <View style={styles.Product}>
                  <Image
                    source={{
                      uri: `http://192.168.0.104/app/images/product/${item.images[0]}`,
                    }}
                    style={styles.imageProduct}
                  />
                  <View style={styles.infoProduct}>
                    <Text>{item.name}</Text>
                    <Text>{item.price} $</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    );
  }
}

const productWidth = (width - 60) / 2;
const productHeight = (productWidth / 361) * 452;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    margin: 10,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  title: {
    height: height * 0.3 * 0.2,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  textTile: {
    fontSize: 20,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 5,
  },
  Product: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.1,

    elevation: 0.5,
    borderRadius: 0.5,
    marginBottom: 10,
  },
  imageProduct: {
    width: productWidth,
    height: productHeight,
  },
  infoProduct: {
    padding: 10,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});
