import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  BackHandler,
  Alert,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

//Redux
import {connect} from 'react-redux';
import {homeOperations, homeSelectors} from 'data/redux/home';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {KEYS, getData} from 'api/UserPreference';
import HeaderTop from '../AppComponent/HeaderComponent/HomeHeader/HeaderTop';
import SliderComponent from '../AppComponent/SliderComponent';
import CartComponent from '../AppComponent/CartComponent';
import FooterComponent from '../AppComponent/FooterComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

import {makeRequest} from 'api/ApiInfo';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    const count = this.props.route.params;

    this.state = {
      refreshing: false,
      isProcessing: true,
      isListRefreshing: false,
      images: [],
      current_address: '',
      details: '',
      foodProducts: [],
      foodProducts2: [],
      searchText: '',
    };
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.checkLocationPermission();

        this.homeData();
      },
    );
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }

  checkLocationPermission = async () => {
    try {
      const platformPermission = Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      });

      const result = await check(platformPermission);

      switch (result) {
        case RESULTS.UNAVAILABLE:
          // this.isLocationPermissionBlocked = true;
          Alert.alert(
            'Location Services Not Available',
            'Press OK, then check and enable the Location Services in your Privacy Settings',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
          break;
        case RESULTS.DENIED:
          // console.log(
          //   'The permission has not been requested / is denied but requestable',
          // );
          const requestResult = await request(platformPermission);
          switch (requestResult) {
            case RESULTS.GRANTED:
              this.fetchCurrentPosition();
          }
          break;
        case RESULTS.GRANTED:
          // console.log("The permission is granted");
          this.fetchCurrentPosition();
          break;
        case RESULTS.BLOCKED:
          // this.isLocationPermissionBlocked = true;
          // console.log('The permission is denied and not requestable anymore');
          Alert.alert(
            'Permission Blocked',
            'Press OK and provide "Location" permission in App Setting',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: this.handleOpenSettings,
              },
            ],
            {cancelable: false},
          );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  handleOpenSettings = async () => {
    try {
      await openSettings();
    } catch (error) {
      console.log('Unable to open App Settings:', error);
    }
  };

  fetchCurrentPosition = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      showLocationDialog: true,
      forceRequestLocation: true,
    };

    Geolocation.getCurrentPosition(
      this.geolocationSuccessCallback,
      this.geolocationErrorCallback,
      options,
    );
  };

  geolocationSuccessCallback = async position => {
    try {
      // starting loader
      this.setState({isProcessing: true});

      // preparing info
      const API_KEY = 'AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k';
      this.coords = position.coords;
      const {latitude, longitude} = this.coords;

      // calling api
      const response = await makeRequest(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`,
      );
      console.log('formatted_address***', response);
      // processing response
      if (response) {
        const {status} = response;
        console.log('statu', status);

        if (status === 'OK') {
          console.log(' a-ok');
          const {results} = response;
          // filtering addresses result(taking first address only)
          const filteredResult = results[7];
          console.log(' a-ok');
          const currentLocationAddress = filteredResult.formatted_address;
          console.log(' a-ok', currentLocationAddress);
          this.setState({
            current_address: currentLocationAddress,
            isProcessing: false,
          });

          //console.log('formatted_address1111111***', current_address);
        } else {
          this.setState({
            current_address: null,
            isProcessing: false,
          });
        }
      } else {
        this.setState({
          isProcessing: false,
          isLoading: false,
        });
        console.log('Network Request Error...');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  geolocationErrorCallback = error => {
    if (
      error.code === 2 &&
      error.message === 'No location provider available.'
    ) {
      Alert.alert(
        '',
        "Make sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      console.log(error.code, error.message);

      Alert.alert(
        'Error',
        "Something went wrong...\nMake sure your device's Location/GPS is ON",
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  };

  backAction = () => {
    Alert.alert('रुको!', 'क्या आप वाकई वापस जाना चाहते हैं?', [
      {
        text: 'वापस लेना',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'हां', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.checkLocationPermission();
      this.homeData();
    } catch (error) {
      console.log(error.message);
    }
  };

  homeData = async () => {
    try {
      const userInfo = await getData(KEYS.USER_INFO);

      if (userInfo !== null) {
        const {id} = userInfo;
        var params = {userId: id};
      } else {
        var params = null;
      }

      await this.props.getHome(params);
      const {success} = this.props.isGetHome;

      if (success) {
        const {sliders, product, details} = this.props.isGetHome;
        const {cartItemCount} = details;

        await this.props.cartUpdate(cartItemCount);
        this.setState({
          details,
          images: sliders,
          foodProducts: product,
          foodProducts2: product,
          isProcessing: false,
          isListRefreshing: false,
        });
      } else {
        this.setState({
          images: [],
          foodProducts: [],
          isProcessing: false,
          isListRefreshing: false,
        });

        this.SliderImage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  SliderImage = () => {
    const {slider, images} = this.state;
  };
  onRefresh = () => {
    this.setState({
      refreshing: true,
    });
    setTimeout(() => {
      this.setState({
        refreshing: false,
      });
    }, 2000);
  };

  render() {
    let image = [];
    let nImage = [];
    const {images} = this.state;
    const {foodProducts} = this.state;

    if (images !== undefined) {
      images.forEach(img => {
        image.push(Object.values(img));
      });
      image.forEach(ig => {
        ig.map(val => {
          nImage.push(val);
        });
      });
    }

    console.log(this.state.current_address);

    const {cartItemCount} = this.state.details;
    return (
      <SafeAreaView
        style={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }>
        <View style={{}}>
          <HeaderTop
            navlogo="navicon"
            brandname={this.state.current_address}
            alert="cart-plus"
            location="map-marker"
            bookmark="bell"
            nav={this.props.navigation}
            count={cartItemCount}
          />
        </View>

        <View>
          <SliderComponent sliders={nImage} />
        </View>

        <View style={{height: 70, justifyContent: 'center'}}>
          <Text
            style={{
              flex: 1,
              padding: 20,
              color: 'black',
              backgroundColor: 'white',
              fontSize: 20,
            }}>
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: 'black',
                borderRadius: 40,
              }}></View>
            {'   '}
            केटेगरी
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center', marginBottom: 50}}>
          <CartComponent product={foodProducts} nav={this.props.navigation} />
        </View>
        <FooterComponent nav={this.props.navigation} />
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isGetHome: homeSelectors.isGetHome(state),
  isCartCount: cartSelectors.isCartCount(state),
});

const mapDispatchToProps = {
  getHome: homeOperations.getHome,
  cartUpdate: cartOperations.cartUpdate,
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
