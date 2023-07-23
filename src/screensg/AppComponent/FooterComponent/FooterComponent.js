import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default FooterComponent = props => {
  return (
    <View
      style={{
        backgroundColor: 'green',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.nav.navigate('home')}>
          <Icon name="home" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.nav.navigate('wallet')}>
          <Icon name="wallet" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <TouchableOpacity onPress={() => props.nav.navigate('Cart')}>
          <Icon name="cart-plus" color="white" size={20} badge="10" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
