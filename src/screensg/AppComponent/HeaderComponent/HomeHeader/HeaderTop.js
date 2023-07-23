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

export default HeaderTop = props => {
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
        <TouchableOpacity onPress={() => props.nav.openDrawer()}>
          <Icon
            name={props.navlogo}
            color="green"
            size={20}
            style={{textAlign: 'left', marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => {}}>
          <Icon
            name={props.location}
            color="green"
            size={20}
            style={{textAlign: 'left'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 4}}>
        <Text style={{color: 'green', fontSize: 14, marginLeft: 0}}>
          {props.brandname}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            props.nav.navigate('Notification');
          }}>
          <Icon
            name={props.bookmark}
            color="green"
            size={20}
            style={{textAlign: 'right', marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.nav.navigate('Cart');
          }}>
          {props.count === 0 ? (
            <></>
          ) : (
            <Text
              style={{
                width: 20,
                height: 20,
                position: 'absolute',
                backgroundColor: props.count !== 0 ? 'red' : '',
                borderRadius: 20,
                elevation: 4,
                textAlign: 'center',
                top: -15,
                color: 'white',
              }}>
              {props.count}
            </Text>
          )}
          <Icon
            name={props.alert}
            color="green"
            size={20}
            style={{marginRight: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
