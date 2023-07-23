import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DrawerActions} from '@react-navigation/native';

const CustDrawerPage = props => {
  return (
    <View
      style={{
        height: 110,
        flexDirection: 'row',
        margin: 0,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'green',
      }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../asset/logo/appIcon.png')}
          style={{width: 50, height: 50}}
        />
        <Text style={{marginLeft: 20, fontSize: 18, color: 'white'}}>
          GrouriBrand
        </Text>
      </View>
    </View>
  );
};

export default CustDrawer = props => {
  console.log('drawer item', props);
  return (
    <View style={{flexGrow: 1}}>
      <CustDrawerPage {...props} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="लॉगिन करे"
        onPress={() => props.navigation.navigate('login')}
        style={{backgroundColor: 'green', padding: 5}}
        labelStyle={{color: 'white'}}
      />
    </View>
  );
};
