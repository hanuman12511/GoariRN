import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import CustDrawer from '../../components/CustDrawer';

import HomeScreen from '../../screensg/HomeScreen';

import CancelRefund from '../../screensg/CancelRefund';
import OfferScreen from '../../screensg/OfferScreen';
import ContactUsScreen from '../../screensg/ContactUsScreen';
import PrivacyPolicies from '../../screensg/PrivacyPolicies';
import ReferScreen from '../../screensg/ReferScreen';
import TermsCondition from '../../screensg/TermsCondition';
const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustDrawer {...props} />}
      screenOptions={{drawerStyle: {width: '100%'}, headerShown: false}}>
      <Drawer.Screen
        name="home"
        component={HomeScreen}
        options={{
          title: 'मुख्य पृष्ठ',
        }}
      />
      <Drawer.Screen
        name="Offer"
        component={OfferScreen}
        options={{
          title: 'ऑफर्स',
        }}
      />
      <Drawer.Screen
        name="Refer your Friends"
        component={ReferScreen}
        options={{
          title: 'दोस्तों को भेजे',
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          title: 'सम्पर्क करे',
        }}
      />
      <Drawer.Screen
        name="PrivacyPolicies"
        component={PrivacyPolicies}
        options={{
          title: 'गोपनीयता पालिसी',
        }}
      />
      <Drawer.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{
          title: 'नियम एवं शर्तें',
        }}
      />
      <Drawer.Screen
        name="CancelRefund"
        component={CancelRefund}
        options={{
          title: 'रद्दीकरण/धनवापसी नीति',
        }}
      />
    </Drawer.Navigator>
  );
};
