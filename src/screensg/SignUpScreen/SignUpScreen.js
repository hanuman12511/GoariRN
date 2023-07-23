import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
// logo
import appIcon from '../../asset/logo/appIcon.png';

// Redux
import {connect} from 'react-redux';
import {authOperations, authSelectors} from 'data/redux/auth';

import ProcessingLoader from '../AppComponent/ProcessingLoader';
import {isNameValid, isMobileNumber} from 'utils/validations';

// validation

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isProcessing: false,
      name: '',
      place: '',
      VName: '',
      mobile: '',
      catleCount: '',
      mQty: '',
      refCode: '',
    };
  }

  onChangeName = name => {
    this.setState({name: name});
  };
  onChangePlace = place => {
    this.setState({place: place});
  };
  onChangeVName = VName => {
    this.setState({VName: VName});
  };
  onChangeMobile = mobile => {
    this.setState({mobile: mobile});
  };
  onChangeCCount = catleCount => {
    this.setState({catleCount: catleCount});
  };
  onChangeMQty = mQty => {
    this.setState({mQty: mQty});
  };
  onReferralCode = refCode => {
    this.setState({refCode: refCode});
  };

  handleHome = async () => {
    const {name, place, VName, mobile, catleCount, mQty, refCode} = this.state;

    console.log('user info mation', this.state);

    if (!isNameValid(name)) {
      Alert.alert('', 'कृपया अपना नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (place.trim() === '') {
      Alert.alert('', 'कृपया अपना वास्तविक स्थान दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (VName.trim() === '') {
      Alert.alert('', 'कृपया अपने गांव का नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

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

    if (catleCount.trim() === '' || catleCount === '0') {
      Alert.alert('', 'कृपया अपना वैध पशुधन संख्या भरें', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }

    if (mQty.trim() === '' || mQty === '0') {
      Alert.alert(
        '',
        'कृपया अपने मवेशी के दूध की मात्रा लीटर में दर्ज करें',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    this.setState({isProcessing: true});
    const params = {
      name,
      address: place,
      villageName: VName,
      mobile,
      animalCount: catleCount,
      milkQuantity: mQty,
      referralCode: refCode,
    };
    await this.props.registerUser(params).then(() => {
      const {success, message} = this.props.isRegisterSuccess;

      if (success) {
        this.props.navigation.navigate('login');
      } else {
        console.log('error while registration');
      }
    });
  };

  render() {
    return (
      <>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" Register"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.container}>
            <Image source={appIcon} style={styles.logo} />
            <Text style={styles.heading}>रजिस्ट्रेशन फॉर्म</Text>
            <View style={styles.formscreen}>
              <TextInput
                placeholder="नाम"
                placeholderTextColor="#666"
                value={this.state.name}
                onChangeText={this.onChangeName}
                style={{borderWidth: 1, marginTop: 10}}
              />

              <TextInput
                placeholder="जगह"
                placeholderTextColor="#666"
                value={this.state.place}
                onChangeText={this.onChangePlace}
                style={{borderWidth: 1, marginTop: 10}}
              />
              <TextInput
                placeholder="गांव का नाम"
                placeholderTextColor="#666"
                value={this.state.VName}
                onChangeText={this.onChangeVName}
                style={{borderWidth: 1, marginTop: 10}}
              />
              <TextInput
                placeholder="मोबाइल नंबर"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                maxLength={10}
                value={this.state.mobile}
                onChangeText={this.onChangeMobile}
                style={{borderWidth: 1, marginTop: 10}}
              />
              <TextInput
                placeholder="पशुओ की संख्या"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                maxLength={4}
                value={this.state.catleCount}
                onChangeText={this.onChangeCCount}
                style={{borderWidth: 1, marginTop: 10}}
              />
              <TextInput
                placeholder="रोज का दूध का उत्पाद"
                keyboardType="phone-pad"
                value={this.state.mQty}
                maxLength={4}
                onChangeText={this.onChangeMQty}
                placeholderTextColor="#666"
                style={{borderWidth: 1, marginTop: 10}}
              />
              <TextInput
                placeholder="रेफरल कोड यदि आपके पास है"
                keyboardType="phone-pad"
                value={this.state.refCode}
                maxLength={6}
                onChangeText={this.onReferralCode}
                placeholderTextColor="#666"
                style={{borderWidth: 1, marginTop: 10}}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={this.handleHome}>
              <Text style={{color: 'white', fontSize: 20}}>रजिस्टर करे</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {this.state.isProcessing && <ProcessingLoader />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isRegisterSuccess: authSelectors.isRegisterSuccess(state),
});
const mapDispatchToProps = {
  registerUser: authOperations.registerUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  heading: {
    width: '100%',
    padding: 20,
    color: 'green',
    textAlign: 'center',
    fontSize: 20,
  },
  formscreen: {
    width: '90%',
  },
  btn: {
    backgroundColor: 'green',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
});
