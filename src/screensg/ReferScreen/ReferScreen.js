import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Images
import refer_banner from '../../asset/images/refer_banner.webp';

//share
import Share from 'react-native-share';

import RNFetchBlob from 'rn-fetch-blob';

// redux
import {connect} from 'react-redux';
import {shareOperations, shareSelectors} from 'data/redux/share';

import {KEYS, getData} from 'api/UserPreference';
// loadsh
import get from 'loadsh/get';
class ReferScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      UserInfo: null,
      referralInfo: '',
      isListRefreshing: false,
      isProcessing: true,
    };
  }
  componentDidMount = async () => {
    const navi = get(this.props, 'navigation.addListener');
    this._subscribe = navi('focus', async () => {
      this.handleShareData();

      const userInfo = await getData(KEYS.USER_INFO);
      this.setState({
        UserInfo: userInfo,
      });
      this.UserLogin();
    });
  };

  UserLogin() {
    const {UserInfo} = this.state;
    if (UserInfo === null) {
      Alert.alert(
        '',
        'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें',
        [
          {text: 'NO', style: 'cancel'},
          {text: 'LOGIN', onPress: this.handleLogin},
        ],
        {
          cancelable: false,
        },
      );
    }
  }

  componentWillUnmount() {
    this._subscribe();
  }

  handleShareData = async () => {
    const {UserInfo} = this.state;
    if (UserInfo !== '') {
      const params = null;
      await this.props.shareToUser(params).then(() => {
        const {success} = this.props.isShareSuccess;
        if (success) {
          const {output} = this.props.isShareSuccess;
          console.log('refer Data', output);
          this.setState({
            referralInfo: output,
            isProcessing: false,
            isListRefreshing: false,
          });
        } else {
          this.setState({isListRefreshing: false, isProcessing: false});
        }
      });
    } else {
      this.setState({
        referralInfo: '',
        isProcessing: false,
        isListRefreshing: false,
      });
    }
  };
  handleShare = async () => {
    try {
      this.setState({isProcessing: true});
      const {referralInfo} = this.state;
      const {shareInfo} = referralInfo;
      const {title, message, image, androidUrl, iosUrl} = shareInfo;

      const {url: url, extension} = image;

      const base64ImageData = await this.encodeImageToBase64(url);

      if (!base64ImageData) {
        return;
      }

      const shareOptions = {
        title,
        subject: title,
        message: `${title}\n${message}\n${androidUrl}\n${iosUrl}`,
        url: `data:image/${extension};base64,${base64ImageData}`,
      };

      // stopping loader
      this.setState({isProcessing: false});

      await Share.open(shareOptions);
    } catch (error) {
      console.log(error.message);
    }
  };
  encodeImageToBase64 = async url => {
    try {
      const fs = RNFetchBlob.fs;
      const rnFetchBlob = RNFetchBlob.config({fileCache: true});
      const downloadedImage = await rnFetchBlob.fetch('GET', url);
      const imagePath = downloadedImage.path();
      const encodedImage = await downloadedImage.readFile('base64');
      await fs.unlink(imagePath);
      return encodedImage;
    } catch (error) {
      return null;
    }
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.handleShareData();
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const {referralInfo} = this.state;
    const {referralCode, referralAmount} = referralInfo;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" दोस्तों को भेजे"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />

        <View style={styles.bannerContainer}>
          <Image
            source={refer_banner}
            resizeMode="cover"
            style={styles.headerBanner}
          />
        </View>

        <View style={styles.mainContainer}>
          <ScrollView
            style={styles.referContainer}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh.bind(this)}
              />
            }>
            <Text style={styles.heading}>पशु खाद्य खरीदना शुरू करे</Text>
            <View style={styles.helpContainer}>
              <View style={styles.helpText}>
                <Text style={styles.text}>
                  गौरी ब्रांड ऐप को अपने दोस्त और परिवार को भेजे, जब आपका दोस्त
                  पहला ऑर्डर पूरा करेगा तो आपको ₹{referralAmount} मिलेंगे
                </Text>

                <Text style={styles.text}>
                  रेफरल कोड:{' '}
                  {this.state.UserInfo !== '' ? (
                    <Text style={styles.referAmount}>{referralCode}</Text>
                  ) : (
                    <></>
                  )}
                </Text>
                <Text style={styles.text}>
                  रेफरल राशि:{' '}
                  {this.state.UserInfo !== '' ? (
                    <Text style={styles.referAmount}>₹ {referralAmount}</Text>
                  ) : (
                    <></>
                  )}
                </Text>
              </View>

              {/* <Image
                source={ideographic}
                resizeMode="cover"
                style={styles.graphic}
              /> */}
            </View>
          </ScrollView>

          <TouchableHighlight
            style={styles.lastButton}
            underlayColor="#0b8457"
            onPress={this.handleShare}>
            <Text style={styles.lastButtonText}>
              गौरी ब्रांड ऐप को दोस्तों के साथ शेयर करें
            </Text>
          </TouchableHighlight>
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isShareSuccess: shareSelectors.isShareSuccess(state),
});
const mapDispatchToProps = {
  shareToUser: shareOperations.shareToUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ReferScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  bannerContainer: {
    flexDirection: 'row',
  },
  headerBanner: {
    width: wp(100),
    aspectRatio: 2 / 1,
  },
  referContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: wp(3),
    borderTopRightRadius: wp(3),
    marginTop: hp(-5),
    padding: wp(3),
  },
  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#192423',
  },
  referralCode: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginTop: wp(3),
    color: '#0b8457',
  },
  referAmount: {
    fontSize: wp(3.5),
    fontWeight: '700',
    marginTop: wp(3),
    color: '#0b8457',
  },
  text: {
    fontSize: wp(3.5),
    color: '#192423',
    marginTop: hp(1.5),
  },
  helpContainer: {
    // flexDirection: 'row',
  },
  helpText: {
    flex: 1,
    marginRight: wp(2),
  },
  graphic: {
    height: wp(45),
    aspectRatio: 3 / 2,
    alignSelf: 'center',
    marginBottom: hp(3),
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: wp(1.5),
    borderRadius: wp(1),
    marginTop: hp(1.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: wp(3),
    color: '#0b8457',
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: wp(3),
    padding: wp(3),
  },
  number: {
    width: wp(8),
    height: wp(8),
    backgroundColor: '#0b8457',
    color: '#fff',
    fontSize: wp(4),
    textAlign: 'center',
    lineHeight: wp(8),
    borderRadius: wp(4),
    marginRight: wp(3),
  },
  dirationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  numberInfo: {
    fontSize: wp(3.5),
    flex: 1,
  },
  lastButton: {
    backgroundColor: '#0b8457',
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastButtonText: {
    color: '#fff',
    fontSize: wp(3.5),
    fontWeight: '700',
  },
});
