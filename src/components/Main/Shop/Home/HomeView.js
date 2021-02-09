import React, {Component} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Collection from './Collection';
import Category from './Category';
import TopProduct from './TopProduct';

export class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {types: [], TopProducts: []};
  }

  componentDidMount() {
    fetch('http://192.168.0.104/app')
      .then((res) => res.json()) // asyn funtion
      .then((resJSON) => {
        const {type, product} = resJSON;
        this.setState({types: type, TopProducts: product});
      });
  }
  render() {
    return (
      <View style={{backgroundColor: '#D3D2D0', flex: 1}}>
        <StatusBar hidden />
        <ScrollView>
          <Collection {...this.props} />
          <Category {...this.props} types={this.state.types} />
          <TopProduct {...this.props} TopProducts={this.state.TopProducts} />
        </ScrollView>
      </View>
    );
  }
}
export default HomeView;
