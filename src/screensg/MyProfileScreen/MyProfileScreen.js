import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//loadsh
import get from 'loadsh/get';

// Components
import HeaderComponent from '../AppComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Styles
import basicStyles from 'styles/BasicStyles';
//* AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import ic_logout from '../../asset/icons/ic_logout.png';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import {clearData} from 'api/UserPreference';
import {AppContext} from 'context_api/context';
function ViewProfileScreen(props) {
  const [isProcessing, setIsProcessing] = useState(true);
  const [userProfile, setUserProfile] = useState('');
  const [message, setMessage] = useState('');
  const {signOut} = useContext(AppContext);
  useEffect(() => {
    const _subscribe = props.navigation.addListener('focus', async () => {
      handleProfileData();
    });
    return () => _subscribe;
  });

  const handleProfileData = async () => {
    const params = null;
    await props.viewProfile(params).then(() => {
      const {success, message} = props.isProfile;
      if (success) {
        const {userProfile} = props.isProfile;
        setUserProfile(userProfile);
        setIsProcessing(false);
      } else {
        setUserProfile('');
        setIsProcessing(false);
        setMessage(message);
      }
    });
  };

  const handleEditProfile = () => {
    props.navigation.navigate('Edit Profile');
  };

  const handleLogout = async () => {
    await clearData();
    console.log(props);
    await signOut();
    await AsyncStorage.clear();
  };

  const {name, mobile} = userProfile;
  if (!(name == null)) {
    const pImg = name.match(/\b(\w)/g);
    if (!(pImg === null)) {
      var ProImg = pImg.join(' ');
      var Latter = ProImg.toUpperCase();
    }
  } else {
    var Latter = null;
  }
  return (
    <SafeAreaView style={basicStyles.container}>
      <View
        style={[basicStyles.mainContainer, basicStyles.whiteBackgroundColor]}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" माई प्रोफाइल"
          alert=""
          location=""
          bookmark=""
          nav={props.navigation}
        />
        <View style={basicStyles.flexOne}>
          <View style={[styles.astroInfoContainer]}>
            <Text style={styles.userNameWord}>{Latter}</Text>
            <View style={basicStyles.flexOne}>
              <Text style={styles.userName}>{name}</Text>

              <Text style={styles.userNameSmall}>{mobile}</Text>
            </View>
            <TouchableHighlight
              underlayColor="#f2f1f1"
              style={styles.editProfileButton}
              onPress={handleEditProfile}>
              <Text style={[basicStyles.text, basicStyles.whiteColor]}>
                प्रोफाइल बदले
              </Text>
            </TouchableHighlight>
          </View>

          <View style={styles.infoContainer}></View>
        </View>
      </View>
      {isProcessing && <ProcessingLoader />}
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  isProfile: profileSelectors.isProfile(state),
});
const mapDispatchToProps = {
  viewProfile: profileOperations.viewProfile,
};
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileScreen);

const styles = StyleSheet.create({
  linearGradient: {
    height: hp(20),
    justifyContent: 'center',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    position: 'relative',
    zIndex: 9,
    backgroundColor: '#0b8457',
    // elevation: 5,
  },
  astroInfoContainer: {
    padding: wp(3),
    marginBottom: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userNameWord: {
    backgroundColor: '#0b8457',
    height: wp(16),
    width: wp(16),
    borderRadius: wp(8),
    textAlign: 'center',
    lineHeight: wp(16),
    marginRight: wp(3),
    color: '#fff',
    fontSize: wp(5),
  },
  userName: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#333',
  },
  userNameSmall: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#333',
  },
  editProfileButton: {
    backgroundColor: '#0b8457',
    height: hp(5),
    borderRadius: hp(2.5),
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: hp(-2.5),
    zIndex: 999,
  },
  infoContainer: {
    padding: wp(3),
    marginTop: hp(1.5),
  },
  inputContainer: {
    alignItems: 'center',
    // paddingHorizontal: wp(2),
    marginBottom: wp(2),
    backgroundColor: '#f2f1f1',
    paddingHorizontal: wp(3),
    borderRadius: 5,
  },
  label: {
    width: wp(22),
    fontSize: wp(3),
  },
  detailSeparator: {
    width: wp(6),
    fontSize: wp(3),
  },
  info: {
    flex: 1,
    fontSize: wp(3.5),
    // backgroundColor: '#cccccc80',
    height: hp(5.5),
    lineHeight: hp(5.5),
    paddingHorizontal: wp(3),
  },

  iconRow: {
    height: hp(4),
    width: hp(4),
    backgroundColor: '#ff9933',
    borderRadius: hp(2),
    textAlign: 'center',
    lineHeight: hp(4),
  },
  icons: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
});
