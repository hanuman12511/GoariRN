import React, {useEffect, useContext, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppContext} from 'context_api/context';
//* AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS, getData, clearData} from 'api/UserPreference';

const CustDrawerPage = props => {
  return (
    <View
      style={{
        height: 100,
        flexDirection: 'row',
        margin: 0,
        padding: 20,
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
  const [userInfo, setInfo] = useState('');

  useEffect(() => {
    async function fetchData() {
      const userInfo = await getData(KEYS.USER_INFO);
    }
    fetchData();
  }, [userInfo]);

  const {signOut} = useContext(AppContext);

  const handleLogout = async () => {
    await clearData();
    await signOut();
    await AsyncStorage.clear();
  };
  return (
    <View style={{flexGrow: 1}}>
      <CustDrawerPage {...props} />
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <DrawerItem
        label="लॉगआउट करे"
        onPress={() => {
          handleLogout();
        }}
        style={{backgroundColor: 'green', padding: 5, color: 'white'}}
        labelStyle={{color: 'white'}}
      />
    </View>
  );
};
