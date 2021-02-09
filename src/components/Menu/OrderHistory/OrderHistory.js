import React, {Component} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

import back from '../../../media/appIcon/backs.png';
import {getListOrder} from '../../../API/getListOrder';
import {getToken} from '../../../API/getToken';
import global from '../../global';

const {width, height} = Dimensions.get('window');

export class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrder: [],
    };
    global.getOrders = this.onGetOrders.bind(this);
  }
  onGetOrders() {
    getToken()
      .then((token) => getListOrder(token))
      .then((res) => {
        this.setState({arrOrder: res});
      })
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    this.onGetOrders();
  }
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.header}>
          <View></View>
          <Text style={styles.titleHeader}>Order History</Text>
          <Image source={back} style={{width: 30, height: 30}} />
        </View>
        <View style={styles.container}>
          <FlatList
            data={this.state.arrOrder}
            keyExtractor={(item) => item.id}
            renderItem={({item, index}) => (
              <View style={styles.orderContainer}>
                <View style={styles.orderRow}>
                  <Text>Order id:</Text>
                  <Text style={styles.textId_Status}>ORD{item.id}</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text>Order Time:</Text>
                  <Text style={styles.textDate}>{item.date_order}</Text>
                </View>
                <View style={styles.orderRow}>
                  <Text>Status:</Text>
                  <Text style={styles.textId_Status}>
                    {item.status > 0 ? 'Completed' : 'Pending'}
                  </Text>
                </View>
                <View style={styles.orderRow}>
                  <Text>Total:</Text>
                  <Text style={styles.textTotal}>{item.total}$</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#2ABA99',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  container: {
    flex: 11,
    paddingHorizontal: 10,
    backgroundColor: '#F3F3F3',
  },
  orderContainer: {
    height: height * 0.18,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    flexDirection: 'column',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
  orderRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  titleHeader: {
    color: 'white',
    fontSize: 20,
  },
  textDate: {
    color: '#C63D81',
  },
  textTotal: {
    color: '#C02470',
    fontSize: 17,
  },
  textId_Status: {
    color: '#2ABA99',
  },
});

export default OrderHistory;
