import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default HeaderComponent = props => {
  console.log('props Header=>>>', props);
  return (
    <View
      style={{
        backgroundColor: 'white',
        marginTop: 0,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 20,
        shadowColor: '#52006A',
        borderColor: 'white',
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => props.nav.goBack()}
          style={{padding: 10}}>
          <Icon
            name={props.navlogo}
            color="green"
            size={20}
            style={{textAlign: 'left', marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name={props.location}
            color="green"
            size={20}
            style={{textAlign: 'left', marginLeft: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 4}}>
        <Text style={{color: 'green', fontSize: 14, marginLeft: 0}}>
          {props.brandname}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
        <Icon name={props.alert} color="green" size={20} />

        <Icon
          name={props.bookmark}
          color="green"
          size={20}
          style={{textAlign: 'right', marginLeft: 20}}
        />
      </View>
    </View>
  );
};
