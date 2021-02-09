import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import backList from '../../../media/appIcon/backList.png';

import {getListProduct} from '../../../API/getListProduct';
const {width, height} = Dimensions.get('window');

const urlImg = 'http://192.168.0.104/app/images/product/';

export class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: null,
      page: 1,
      isRefesh: false,
    };
  }
  GoBackMain() {
    this.props.navigation.goBack();
  }
  GoToDetail(product) {
    this.props.navigation.navigate('DetailProduct', {product: product});
  }

  componentDidMount() {
    getListProduct(
      this.props.route.params.typeId,
      this.state.page,
    ).then((res) => this.setState({listProduct: res}));
  }
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Header}>
          <TouchableOpacity onPress={this.GoBackMain.bind(this)}>
            <Image source={backList} style={styles.IconBack} />
          </TouchableOpacity>
          <Text style={styles.TitleHeader}>{this.props.route.params.name}</Text>
          <View></View>
        </View>
        <FlatList
          data={this.state.listProduct}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={this.state.isRefesh}
              onRefresh={() => {
                this.setState({isRefesh: true});
                const newPage = this.state.page + 1;
                const idType = this.props.route.params.typeId;
                getListProduct(idType, newPage)
                  .then((arrProducts) => {
                    this.setState({
                      listProduct: arrProducts.concat(this.state.listProduct),
                      isRefesh: false,
                      page: newPage,
                    });
                  })
                  .catch((err) => this.setState({isRefesh: false}));
              }}
            />
          }
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

export default ListProduct;

const styles = StyleSheet.create({
  Header: {
    height: height / 16,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  Container: {flex: 1, padding: 10, backgroundColor: '#fff'},
  IconBack: {width: width / 10, height: width / 10},
  TitleHeader: {fontSize: 20, color: '#C5357B'},
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
