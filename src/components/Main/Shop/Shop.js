import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Cart from './Cart/Cart';
import Contact from './Contact/Contact';
import Home from './Home/Home';
import Search from './Search/Search';
import Header from '../../Header/Header';
// import icon for tabs navigation
import iconHome from '../../../media/appIcon/home.png';
import iconHomeFocus from '../../../media/appIcon/home0.png';

import iconCart from '../../../media/appIcon/cart.png';
import iconCartFocus from '../../../media/appIcon/cart0.png';

import iconSearch from '../../../media/appIcon/search.png';
import iconSearchFocus from '../../../media/appIcon/search0.png';

import iconContact from '../../../media/appIcon/contact.png';
import iconContactFocus from '../../../media/appIcon/contact0.png';

import global from '../../global';

import {saveCart} from '../../../API/saveCart';
import {getCart} from '../../../API/getCart';

// create stack navigation to use header
const Stack = createStackNavigator();
const shopStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const {width, height} = Dimensions.get('window');

const Home_Stack = (props) => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home}></Stack.Screen>
    </Stack.Navigator>
  );
};

function Cart_Stack(props) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Cart">
        {() => (
          <Cart navigation={props.navigation} cartArray={props.cartArray} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

class Shop_Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {cartArray: []};
    global.addProductToCart = this.addProductToCart.bind(this);
    global.incrQuantity = this.incrQuantity.bind(this);
    global.decrQuantity = this.decrQuantity.bind(this);
    global.remmoveProduct = this.remmoveProduct.bind(this);
    global.deleteOrder = this.deleteOrder.bind(this);
  }

  addProductToCart(product) {
    let checkExist = false; // san pham chua co trong gio hang
    this.state.cartArray.forEach((element) => {
      if (element.product.id === product.id) {
        {
          checkExist = true;
        }
      }
    });
    if (!checkExist) {
      this.setState(
        {
          cartArray: this.state.cartArray.concat({
            product: product,
            quatity: 1,
          }),
        },
        () => {
          saveCart(this.state.cartArray);
        },
      );
    }
  }
  deleteOrder() {
    this.setState({cartArray: []}, () => {
      saveCart([]);
    });
  }
  async incrQuantity(productId) {
    const newCart = this.state.cartArray.map((e) => {
      if (e.product.id !== productId) {
        return e;
      } else {
        const newQuantity = e.quatity + 1;
        return {product: e.product, quatity: newQuantity};
      }
    });
    this.setState({cartArray: newCart}, () => {
      saveCart(this.state.cartArray);
    });
  }
  decrQuantity(productId) {
    const newCart = this.state.cartArray.map((e) => {
      if (e.product.id !== productId) {
        return e;
      } else {
        const newQuantity = e.quatity > 1 ? e.quatity - 1 : e.quatity;
        return {product: e.product, quatity: newQuantity};
      }
    });
    this.setState({cartArray: newCart}, () => {
      saveCart(this.state.cartArray);
    });
  }
  remmoveProduct(productId) {
    const newCart = this.state.cartArray.filter(
      (element) => element.product.id !== productId,
    );
    this.setState({cartArray: newCart}, () => {
      saveCart(this.state.cartArray);
    });
  }
  componentDidMount() {
    getCart().then((cartArray) => this.setState({cartArray: cartArray}));
  }

  render() {
    const number = this.state.cartArray.length;
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let icon;
            if (route.name === 'Home') {
              icon = focused ? iconHome : iconHomeFocus;
            } else if (route.name === 'Cart') {
              icon = focused ? iconCart : iconCartFocus;
            } else if (route.name === 'Search') {
              icon = focused ? iconSearch : iconSearchFocus;
            } else if (route.name === 'Contact') {
              icon = focused ? iconContact : iconContactFocus;
            }
            return <Image source={icon} style={styles.iconTabs} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2ABA99',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home_Stack} />
        <Tab.Screen
          name="Cart"
          options={{
            tabBarBadge: number > 0 ? number : null,
            tabBarBadgeStyle: {backgroundColor: '#0079FF'},
          }}>
          {(props) => (
            <Cart_Stack cartArray={this.state.cartArray} {...this.props} />
          )}
        </Tab.Screen>
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Contact" component={Contact} />
      </Tab.Navigator>
    );
  }
}
class Shop extends Component {
  render() {
    return (
      <shopStack.Navigator headerMode="screen">
        <Stack.Screen
          name="mainScreen"
          component={Shop_Tabs}
          options={{
            header: (props) => {
              return <Header {...props} />;
            },
          }}></Stack.Screen>
      </shopStack.Navigator>
    );
  }
}
export default Shop;
const styles = StyleSheet.create({
  iconTabs: {
    width: width / 14,
    height: height / 24,
    marginTop: 5,
  },
});
