import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';

import OTPInputView from '@twotalltotems/react-native-otp-input';

import HeaderComponent from '../AppComponent/HeaderComponent';

import appIcon from '../../asset/logo/appIcon.png';
//Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';
import {KEYS, storeData} from 'api/UserPreference';
import {AppContext} from '../../context_api/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ProcessingLoader from '../AppComponent/ProcessingLoader';

import get from 'lodash/get';

import {
  ONLINE_STATUS,
  COMPLETE_PROFILE_STATUS,
  USER_DATA,
  accessToken,
  TOKEN,
  USER_ROLE,
} from 'context_api/constant';

function OTPScreen(props) {
  const mobile = get(props.route, 'params.mobile');
  const [otp, setOtp] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const {signIn} = useContext(AppContext);

  useEffect(() => {
    try {
      const {success, message} = props.isOtpVerifySuccess;
      if (success) {
        const {userInfo} = props.isOtpVerifySuccess;
        storeData(KEYS.USER_INFO, userInfo);

        AsyncStorage.setItem(COMPLETE_PROFILE_STATUS, 'true');
        AsyncStorage.setItem(accessToken, userInfo.authToken);
        AsyncStorage.setItem(ONLINE_STATUS, 'true');
        AsyncStorage.setItem(USER_DATA, userInfo);
        AsyncStorage.setItem(TOKEN, 'true');
        if (success) {
          signIn();
        }
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }
    } catch (error) {
      console.log('errr otp', error);
    }
  }, [props]);

  const handleLogin = otp => {
    setOtp(otp);
  };
  const handleAddress = async () => {
    setIsProcessing(true);
    const params = {
      mobile,
      otp,
    };
    await props.otpVerify(params);
  };

  const handleResendOtp = async () => {
    const params = {mobile};
    await props.resendOtp(params).then(() => {
      const {success} = props.isOtpResendSuccess;
      if (success) {
        const {message} = props.isOtpResendSuccess;
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <HeaderComponent
        navlogo="arrow-left"
        brandname=" OTP"
        alert=""
        location=""
        bookmark=""
        nav={props.navigation}
      />
      <View style={{width: '80%', alignItems: 'center'}}>
        <Image source={appIcon} style={styles.logo} />
        <OTPInputView
          pinCount={4}
          autoFocusOnLoad
          placeholderCharacter="0"
          placeholderTextColor="green"
          keyboardType="number-pad"
          onCodeFilled={handleLogin}
          codeInputFieldStyle={{color: 'black'}}
          style={{
            width: '80%',
            height: 100,
            marginTop: 20,
            paddingTop: 30,
            color: 'black',
          }}
        />

        <TouchableHighlight
          onPress={handleAddress}
          underlayColor="#ffffff80"
          style={{
            backgroundColor: 'green',
            marginTop: 20,
            alignItems: 'center',
            width: '70%',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white', padding: 20}}>ओटीपी डाले</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={handleResendOtp}
          underlayColor="#ffffff80"
          style={{
            backgroundColor: 'green',
            marginTop: 10,
            alignItems: 'center',
            width: '70%',
            borderRadius: 20,
          }}>
          <Text style={{color: 'white', padding: 20}}>ओटीपी पुनः भेजें</Text>
        </TouchableHighlight>
      </View>

      {isProcessing && <ProcessingLoader />}
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  isOtpVerifySuccess: authSelectors.isOtpVerifySuccess(state),
  isOtpResendSuccess: authSelectors.isOtpResendSuccess(state),
});
const mapDispatchToProps = {
  otpVerify: authOperations.otpVerify,
  resendOtp: authOperations.resendOtp,
};
export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});
