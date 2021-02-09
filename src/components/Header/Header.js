import React, {Component} from 'react';
import {Dimensions, Text, View, Image, StyleSheet} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import icMenu from '../../media/appIcon/ic_menu.png';
import icLogo from '../../media/appIcon/ic_logo.png';

import {onSearchAPI} from '../../API/search';

import global from '../global';

const {width, height} = Dimensions.get('window');
export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: '',
    };
  }
  openMenu = () => {
    this.props.navigation.toggleDrawer();
  };
  gotoSearch() {
    this.props.navigation.navigate('Search');
  }
  onSearch() {
    onSearchAPI(this.state.txtSearch).then((res) => global.setSearchArray(res));
  }
  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Header1}>
          <TouchableOpacity onPress={this.openMenu}>
            <Image source={icMenu} style={styles.IconHeader} />
          </TouchableOpacity>
          <Text style={styles.TitleHeader}>Wearing a Dress</Text>
          <Image source={icLogo} style={styles.IconHeader} />
        </View>
        <View style={styles.Header2}>
          <TextInput
            style={styles.Search}
            placeholder="What do you want to buy ?"
            value={this.state.txtSearch}
            onChangeText={(text) => this.setState({txtSearch: text})}
            onFocus={this.gotoSearch.bind(this)}
            onSubmitEditing={this.onSearch.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    height: height / 8,
    backgroundColor: '#2ABA99',
    justifyContent: 'space-around',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  Header1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Header2: {
    flex: 1,
  },
  IconHeader: {
    height: height / 24,
    width: width / 12,
  },
  Search: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    height: height / 20,
  },
  TitleHeader: {padding: 5, color: '#fff', fontSize: 17},
});

export default Header;
