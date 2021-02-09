import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const urlImg = 'http://192.168.0.104/app/images/product/';
import global from '../../../global';
const {width, height} = Dimensions.get('window');
export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {listProduct: []};
    global.setSearchArray = this.setSearchArray.bind(this);
  }
  setSearchArray(arrayProduct) {
    this.setState({listProduct: arrayProduct});
  }
  GoToDetail(product) {
    this.props.navigation.navigate('DetailProduct', {product: product});
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.listProduct}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => (
            <View style={styles.ProductContainer}>
              <Image
                source={{uri: `${urlImg}${item.images[0]}`}}
                style={styles.imageProduct}
              />
              <View style={styles.infoProductContaier}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={{color: '#D05993'}}>{item.price}$</Text>
                <Text>{item.material}</Text>
                <View style={styles.lastRowProductInfo}>
                  <Text>Color {item.color} </Text>
                  <View
                    style={[
                      styles.productColor,
                      {backgroundColor: item.color.toLowerCase()},
                    ]}
                  />
                  <TouchableOpacity onPress={this.GoToDetail.bind(this, item)}>
                    <Text> Show Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  ProductContainer: {
    height: height / 4.5,
    padding: 15,
    flexDirection: 'row',
    borderColor: '#F1F1F1',
    borderTopWidth: 1,
  },
  imageProduct: {
    width: width * 0.3,
    height: (width * 0.3 * 452) / 361,
  },
  infoProductContaier: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  productName: {fontSize: 18},
  lastRowProductInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  productColor: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    marginHorizontal: 2,
  },
});

export default Search;
