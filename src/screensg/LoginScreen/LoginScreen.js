import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Alert,
  Platform,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import HeaderComponent from '../AppComponent/HeaderComponent';
//Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import {isMobileNumber} from '../../utils/validations';

//logo
import appIcon from '../../asset/logo/appIcon.png';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: false,
      mobile: '',
      referralCode: '',
    };
  }

  onMobileChange = mobile => {
    if (mobile !== '') {
      this.setState({mobile});
    } else {
      Alert.alert('enter phone number');
    }
  };

  handleNext = async () => {
    const {mobile} = this.state;
    if (!isMobileNumber(mobile)) {
      Alert.alert(
        '',
        'कृपया अपना वैध मोबाइल नंबर दर्ज करें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }

    this.setState({isProcessing: true});
    const params = {
      mobile,
    };
    await this.props.loginUser(params).then(() => {
      const {success, message} = this.props.isLoginSuccess;
      if (success) {
        this.setState({isProcessing: false});
        this.props.navigation.navigate('OTP', {mobile});
      } else {
        this.setState({isProcessing: false});
      }
    });
  };

  handleSignUp = () => {
    this.props.navigation.navigate('signup');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" Login"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <ScrollView style={styles.container}>
          <View style={styles.logo}>
            <Image source={appIcon} style={styles.imglog} />
            <Text style={styles.heading}>
              हम इस नंबर पर एक पुष्टिकरण कोड के साथ एक एसएमएस भेजेंगे
            </Text>
          </View>

          <View style={styles.phonenumber}>
            <TextInput
              value="+91"
              placeholderTextColor="#fff"
              style={styles.indiacode}
            />

            <TextInput
              placeholder="फ़ोन नंबर डाले"
              placeholderTextColor="white"
              maxLength={10}
              keyboardType="numeric"
              value={this.state.mobile}
              onChangeText={this.onMobileChange}
              style={styles.num}
            />
          </View>

          <View style={styles.btn}>
            <TouchableHighlight
              onPress={this.handleNext}
              style={styles.btnlogin}
              underlayColor="#ffffff80">
              <Text style={styles.logtext}>लॉगिन करे</Text>
            </TouchableHighlight>

            <TouchableOpacity
              onPress={this.handleSignUp}
              style={styles.btnregister}>
              <Text style={styles.textregister}>रजिस्टर करे</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isLoginSuccess: authSelectors.isLoginSuccess(state),
});
const mapDispatchToProps = {
  loginUser: authOperations.loginUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  logo: {padding: 20, alignItems: 'center'},
  imglog: {width: 100, height: 100, marginTop: 50},
  heading: {
    padding: 20,
    height: 100,
    fontSize: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  phonenumber: {
    flexDirection: 'row',
    backgroundColor: 'green',
    padding: 20,
  },

  indiacode: {
    flex: 1,
    padding: 20,
    color: 'white',
  },

  num: {
    flex: 6,
    borderBottomWidth: 1,
    borderColor: 'white',
    color: 'white',
    paddingLeft: 30,
  },
  btn: {
    backgroundColor: 'green',
    width: '100%',
  },
  btnlogin: {
    backgroundColor: 'white',
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },

  logtext: {
    color: 'green',
  },
  btnregister: {
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  textregister: {
    color: 'white',
  },
});
