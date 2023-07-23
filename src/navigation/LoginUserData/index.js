import React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import CustDrawerLogin from '../../components/CustDrawerLogin';
import HomeScreen from '../../screensg/HomeScreen';
import ProductScreen from '../../screensg/ProductScreen';
import CartScreen from '../../screensg/CartScreen';
import NotificationScreen from '../../screensg/NotificationScreen';
import CancelRefund from '../../screensg/CancelRefund';
import OfferScreen from '../../screensg/OfferScreen';
import ContactUsScreen from '../../screensg/ContactUsScreen';
import PrivacyPolicies from '../../screensg/PrivacyPolicies';
import ReferScreen from '../../screensg/ReferScreen';
import TermsCondition from '../../screensg/TermsCondition';
import WalletScreen from '../../screensg/WalletScreen';
import MyProfileScreen from '../../screensg/MyProfileScreen';
import FAQScreen from '../../screensg/FAQScreen';

import SelectSlotScreen from '../../screensg/SelectSlotScreen';
import PaymentScreen from '../../screensg/PaymentScreen';
import MyOrderScreen from '../../screensg/MyOrderScreen';
import EditProfileScreen from '../../screensg/EditProfileScreen';
import FAQQuestionsScreen from '../../screensg/FAQQuestionsScreen';
import FAQAnsScreen from '../../screensg/FAQAnsScreen';
import OrderDetailScreen from '../../screensg/OrderDetailScreen';
import AddAddressScreen from '../../screensg/AddAddressScreen';
import MyAddressScreen from '../../screensg/MyAddressScreen';
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="home" component={HomeScreen} />

      <RootStack.Screen name="productscreen" component={ProductScreen} />
      <RootStack.Screen name="Cart" component={CartScreen} />
      <RootStack.Screen name="Select Slot" component={SelectSlotScreen} />
      <RootStack.Screen name="Payment Options" component={PaymentScreen} />
      <RootStack.Screen name="My Order" component={MyOrderScreen} />
      <RootStack.Screen name="Edit Profile" component={EditProfileScreen} />
      <RootStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <RootStack.Screen name="FAQ Questions" component={FAQQuestionsScreen} />
      <RootStack.Screen name="FAQ Answer" component={FAQAnsScreen} />
      <RootStack.Screen name="Order Detail" component={OrderDetailScreen} />
      <RootStack.Screen name="wallet" component={WalletScreen} />
      <RootStack.Screen name="My Address" component={MyAddressScreen} />
      <RootStack.Screen name="Add Address" component={AddAddressScreen} />
    </RootStack.Navigator>
  );
};

export default LoginDrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustDrawerLogin {...props} />}
      screenOptions={{drawerStyle: {width: '100%'}, headerShown: false}}>
      <Drawer.Screen
        name="home"
        component={HomeNavigator}
        options={{
          title: 'मुख्य पृष्ठ',
        }}
      />
      <Drawer.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'कार्ट',
        }}
      />
      <Drawer.Screen
        name="My Order"
        component={MyOrderScreen}
        options={{
          title: 'माई आर्डर',
        }}
      />
      <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'वॉलेट',
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={MyProfileScreen}
        options={{
          title: 'माई प्रोफाइल',
        }}
      />

      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          title: 'नोटिफिकेशन',
        }}
      />

      <Drawer.Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          title: 'सामान्य प्रश्न',
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
