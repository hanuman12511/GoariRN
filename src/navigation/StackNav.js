import React, {useEffect, useReducer, useMemo} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Splash from '../screensg/SplashScreen';

import {
  TOKEN,
  SIGN_IN,
  SIGN_OUT,
  USER_DATA,
  ONLINE_STATUS,
  PROFILE_STATUS,
  RESTORE_TOKEN,
  USER_ROLE,
  COMPLETE_PROFILE,
  COMPLETE_PROFILE_STATUS,
  FIRST_TIME_USER,
} from 'context_api/constant';
import {AppContext} from 'context_api/context';
//* AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// app screensg navigation
//logout
import HomeScreen from '../screensg/HomeScreen';
import ProductScreen from '../screensg/ProductScreen';
import LoginScreen from '../screensg/LoginScreen';
import SignUpScreen from '../screensg/SignUpScreen';
import CartScreen from '../screensg/CartScreen';
import LoginDrawerStack from './LoginUserData';
import DrawerStack from './Logout';
import OTPScreen from '../screensg/OTPScreen';
import WalletScreen from '../screensg/WalletScreen';
import NotificationScreen from '../screensg/NotificationScreen';

//login
import SelectSlotScreen from '../screensg/SelectSlotScreen';
import PaymentScreen from '../screensg/PaymentScreen';
import MyOrderScreen from '../screensg/MyOrderScreen';
import EditProfileScreen from '../screensg/EditProfileScreen';
import MyProfileScreen from '../screensg/MyProfileScreen';
import FAQQuestionsScreen from '../screensg/FAQQuestionsScreen';
import FAQAnsScreen from '../screensg/FAQAnsScreen';
import OrderDetailScreen from '../screensg/OrderDetailScreen';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
function AuthStackScreen(userData, userIntro, completeProfileStatus) {
  if (userData === 'true') {
    return (
      <Drawer.Navigator screenOptions={{headerShown: false}}>
        <Drawer.Screen name="logindrawerstack" component={LoginDrawerStack} />
        {/*  <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="productscreen" component={ProductScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Select Slot" component={SelectSlotScreen} />
        <Stack.Screen name="Payment Options" component={PaymentScreen} />
        <Stack.Screen name="My Order" component={MyOrderScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        <Stack.Screen name="MyProfileScreen" component={MyProfileScreen} />
        <Stack.Screen name="FAQ Questions" component={FAQQuestionsScreen} />
        <Stack.Screen name="FAQ Answer" component={FAQAnsScreen} />
        <Stack.Screen name="Order Detail" component={OrderDetailScreen} />
        <Stack.Screen name="wallet" component={WalletScreen} /> */}
        {/*  <Stack.Screen name="Add Address" component={AddAddressScreen} /> */}
      </Drawer.Navigator>
    );
  } else {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="drawer" component={DrawerStack} />
        <Stack.Screen name="home" component={HomeScreen} />

        <Stack.Screen name="productscreen" component={ProductScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="wallet" component={WalletScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
      </Stack.Navigator>
    );
  }
}
export default StackNav = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case RESTORE_TOKEN:
          return {
            ...prevState,
            userToken: action.userData.token,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
            isLoading: false,
          };

        case SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userIntro: action.userData.intro,
            userToken: action.userData.token,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
        case SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.intro,
            completeProfileStatus: false,
          };
        case COMPLETE_PROFILE:
          return {
            ...prevState,
            isSignout: true,
            userToken: false,
            userIntro: action.userData.intro,
            completeProfileStatus: action.userData.completeProfileStatus,
          };
      }
    },

    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userIntro: null,
      completeProfileStatus: null,
    },
  );

  const authContext = useMemo(() => {
    return {
      signIn: async () => {
        let userInfo;

        try {
          userInfo = {
            token: await AsyncStorage.getItem(TOKEN),
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_IN, userData: userInfo});
      },

      signOut: async () => {
        let userInfo;
        try {
          userInfo = await AsyncStorage.getItem(FIRST_TIME_USER);
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: SIGN_OUT, intro: userInfo});
      },

      completeProfile: async () => {
        let userInfo;
        try {
          userInfo = {
            intro: await AsyncStorage.getItem(FIRST_TIME_USER),
            completeProfileStatus: await AsyncStorage.getItem(
              COMPLETE_PROFILE_STATUS,
            ),
          };
        } catch (e) {
          console.log('error in useMemo ', e);
        }
        dispatch({type: COMPLETE_PROFILE, userData: userInfo});
      },
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      state.isLoading;
      bootstrapAsync();
    }, 1000);

    const bootstrapAsync = async () => {
      let userInfo;
      try {
        userInfo = {
          token: await AsyncStorage.getItem(TOKEN),
          intro: await AsyncStorage.getItem(FIRST_TIME_USER),
          completeProfileStatus: await AsyncStorage.getItem(
            COMPLETE_PROFILE_STATUS,
          ),
        };
      } catch (e) {
        console.log('error in useEffect ', e);
      }
      dispatch({type: RESTORE_TOKEN, userData: userInfo});
    };
  });

  var userData = state.userToken;

  if (state.isLoading) {
    return <Splash />;
  }
  return (
    <AppContext.Provider value={authContext}>
      <NavigationContainer>
        {AuthStackScreen(
          userData,
          state.userIntro,
          state.completeProfileStatus,
        )}
      </NavigationContainer>
    </AppContext.Provider>
  );
};
