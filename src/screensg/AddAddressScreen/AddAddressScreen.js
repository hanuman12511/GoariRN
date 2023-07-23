import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Alert,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CheckBox from 'react-native-check-box';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import SafeAreaView from 'react-native-safe-area-view';
// maps and location
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
navigator.geolocation = require('@react-native-community/geolocation');

// Icons
import ic_drawer_address from '../../asset/icons/ic_location.png';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import {makeRequest} from 'api/ApiInfo';
// loadsh
import get from 'loadsh/get';
// validation
import {isNameValid} from 'utils/validations';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
class AddAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.navi = get(props, 'navigation.addListener');
    this.state = {
      isProcessing: false,
      currentLocationAddress: null,
      name: '',
      flatNo: '',
      address: '',
      geometry: {lat: '', lng: ''},
      isDefaultAddress: false,
      nickName: '',
      showOtherNickName: false,
    };

    // current location coordinates
    this.coords = null;
    this.isLocationPermissionBlocked = false;
  }

  componentDidMount() {
    this.checkLocationPermission();
    this._subscribe = this.navi('focus', () => {
      this.checkLocationPermission();
    });
  }
  componentWillUnmount() {
    this._subscribe;
  }

  //* fetch location cordinates
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
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}&region=IN&language=hi`,
      );

      // processing response
      if (response) {
        const {status} = response;

        if (status === 'OK') {
          const {results} = response;
          // filtering addresses result(taking first address only)
          const filteredResult = results[0];
          const geometry = filteredResult.geometry.location;
          const currentAddressComponent = filteredResult.address_components;
          const currentLocationAddress = filteredResult.formatted_address;
          this.setState({
            geometry,
            currentAddressComponent,
            currentLocationAddress,
            isProcessing: false,
          });
          // console.log(
          //   geometry,
          //   currentAddressComponent,
          //   currentLocationAddress,
          // );
        } else {
          this.setState({
            geometry: null,
            currentAddressComponent: null,
            currentLocationAddress: null,
            isProcessing: false,
          });
        }
      } else {
        this.setState({
          isProcessing: false,
          isLoading: false,
        });
        // console.log('Network Request Error...');
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

  handleNameChange = name => {
    this.setState({name});
  };

  handleFlatNumberChange = flatNo => {
    this.setState({flatNo});
  };

  handleAddressChange = (data, details) => {
    try {
      if (!details) {
        return;
      }
      const {description} = data;
      const {geometry} = details;
      const {location} = geometry;
      const {lat, lng} = location;
      this.setState({
        currentLocationAddress: description,
        address: description,
        geometry: {lat, lng},
      });
      this.setState({address: description});
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSetDefaultAddress = () => {
    this.setState(prevState => ({
      isDefaultAddress: !prevState.isDefaultAddress,
    }));
  };

  handleAddressNickName = nickName => () => {
    this.setState({nickName, showOtherNickName: false});
  };

  handleAddressOtherNickname = () => {
    this.setState({nickName: '', showOtherNickName: true});
  };

  handleAddressOtherNicknameChange = nickName => {
    this.setState({nickName});
  };

  handleSaveAddress = async () => {
    const {
      currentLocationAddress,
      name,
      flatNo,
      address,
      isDefaultAddress,
      nickName,
      showOtherNickName,
      geometry,
    } = this.state;
    const {lat, lng} = geometry;
    if (!isNameValid(name)) {
      Alert.alert('', 'कृपया अपना नाम दर्ज करें !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }
    if (flatNo.trim() === '') {
      Alert.alert(
        '',
        'कृपया अपना प्लॉट/फ़ील्ड/फार्महाउस नंबर दर्ज करें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    if (nickName.trim() === '') {
      Alert.alert('', 'कृपया अपने पते का प्रकार चुनिए !', [{text: 'OK'}], {
        cancelable: false,
      });
      return;
    }
    if (isDefaultAddress === true) {
      var params = {
        address: flatNo + ',' + address,
        address_type: nickName,
        name,
        is_permanent: 'Y',
        latitude: lat,
        longitude: lng,
      };
    } else {
      var params = {
        address: flatNo + ',' + address,
        address_type: nickName,
        name,
        is_permanent: 'N',
        latitude: lat,
        longitude: lng,
      };
    }
    await this.props.addAddress(params).then(() => {
      const {success, message} = this.props.isAddressAdded;
      if (success) {
        this.props.navigation.navigate('My Address');
        Alert.alert('', message);
      } else {
        Alert.alert('', message);
      }
    });
  };

  render() {
    const {
      isProcessing,
      currentLocationAddress,
      name,
      flatNo,
      address,
      isDefaultAddress,
      nickName,
      showOtherNickName,
      geometry,
    } = this.state;

    const {lat = 0, lng = 0} = geometry;
    const LATITUDE = lat;
    const LONGITUDE = lng;
    const LATITUDE_DELTA = 0.0079;
    const LONGITUDE_DELTA = 0.0079;
    const region = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    };
    const mapOptions = {
      scrollEnabled: true,
    };
    const selectedNickNameStyle = {
      ...styles.btn,
      color: '#fff',
      backgroundColor: '#0b8457',
    };
    return (
      <SafeAreaView style={styles.container}>
        {/* <Header
          title="पता जोड़ें"
          nav={this.props.navigation}
          showNotificationIcon
          navAction="back"
        /> */}

        <KeyboardAwareScrollView
          enableOnAndroid
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            {/* <Image source={map} resizeMode="cover" style={styles.mapImage} /> */}
            {currentLocationAddress !== null || lat !== '' ? (
              <View style={{height: '40%'}}>
                <View style={{position: 'relative', height: hp(40)}}>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    mapType={MAP_TYPES.STANDARD}
                    region={region}
                    {...mapOptions}>
                    <MapView.Marker
                      coordinate={{
                        latitude: lat,
                        longitude: lng,
                      }}
                      title={`आपका स्थान यहाँ है`}
                      pinColor={'red'}
                    />
                  </MapView>
                </View>
              </View>
            ) : null}

            <View style={styles.addAddressContainer}>
              <TouchableHighlight
                underlayColor="transparent"
                onPress={this.checkLocationPermission}>
                <View style={styles.currentLocationButton}>
                  <Image
                    source={ic_drawer_address}
                    style={styles.icon}
                    resizeMode="cover"
                  />
                  <Text style={styles.currentLocationButtonTitle}>
                    वर्तमान स्थान चुनें
                  </Text>
                </View>
              </TouchableHighlight>

              {this.coords && (
                <View style={styles.row}>
                  <View style={styles.address}>
                    <Text style={styles.description}>
                      {currentLocationAddress}
                    </Text>
                  </View>
                </View>
              )}

              <TextInput
                style={styles.input}
                placeholder="नाम डाले"
                placeholderTextColor="#333"
                value={name}
                onChangeText={this.handleNameChange}
              />

              <TextInput
                style={styles.input}
                placeholder="घर/खेत/फार्महाउस"
                placeholderTextColor="#333"
                value={flatNo}
                onChangeText={this.handleFlatNumberChange}
              />

              {/* <TextInput
                style={styles.input}
                placeholder="गली/मोहोल्ला/गांव का नाम"
                placeholderTextColor="#999"
                value={currentLocationAddress}
                onChangeText={this.handleAddressChange}
              /> */}

              <ScrollView
                keyboardShouldPersistTaps="always"
                style={{marginHorizontal: wp(1.8)}}>
                <GooglePlacesAutocomplete
                  placeholder={
                    address !== ''
                      ? 'गली/मोहोल्ला/गांव का नाम'
                      : currentLocationAddress
                  }
                  placeholderTextColor="#333"
                  onPress={(data, details) =>
                    this.handleAddressChange(data, details)
                  }
                  returnKeyType={'default'}
                  fetchDetails={true}
                  styles={{
                    textInputContainer: {
                      fontWeight: '700',
                      backgroundColor: 'rgba(0,0,0,0)',
                      borderTopWidth: 0,
                      borderBottomWidth: 0,
                    },
                    textInput: {
                      fontFamily: 'OpenSans-Regular',
                      height: hp(4),
                      color: '#333',
                      fontSize: wp(3.5),
                      backgroundColor: 'transparent',
                    },
                    predefinedPlacesDescription: {
                      color: '#1faadb',
                    },
                  }}
                  query={{
                    key: 'AIzaSyBb3j8Aiv60CadZ_wJS_5wg2KBO6081a_k',
                    language: 'hi',
                    components: 'country:Ind',
                    fields: 'geometry',
                  }}
                  // currentLocation={true}
                  // currentLocationLabel="Current location"
                  enableHighAccuracyLocation={true}
                  GooglePlacesDetailsQuery={{
                    fields: ['formatted_address', 'geometry'],
                  }}
                />
              </ScrollView>

              <CheckBox
                style={styles.checkBox}
                rightText="स्थाई पते के रूप में सेट करें"
                isChecked={isDefaultAddress}
                onClick={this.handleSetDefaultAddress}
              />

              <Text style={styles.heading}>पते का उपनाम</Text>
              <View style={styles.buttonRow}>
                <Text
                  style={
                    nickName === 'Home' ? selectedNickNameStyle : styles.btn
                  }
                  onPress={this.handleAddressNickName('Home')}>
                  घर
                </Text>
                <Text
                  style={
                    nickName === 'Field' ? selectedNickNameStyle : styles.btn
                  }
                  onPress={this.handleAddressNickName('Field')}>
                  खेत
                </Text>
                <Text
                  style={
                    nickName === 'FarmHouse'
                      ? selectedNickNameStyle
                      : styles.btn
                  }
                  onPress={this.handleAddressNickName('FarmHouse')}>
                  फार्महाउस
                </Text>
                <Text
                  style={showOtherNickName ? selectedNickNameStyle : styles.btn}
                  onPress={this.handleAddressOtherNickname}>
                  अन्य
                </Text>
              </View>

              {showOtherNickName && (
                <TextInput
                  style={styles.input}
                  placeholder="अन्य उपनाम"
                  placeholderTextColor="#999"
                  value={nickName}
                  onChangeText={this.handleAddressOtherNicknameChange}
                />
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.addCart}>
          <TouchableHighlight
            onPress={this.handleSaveAddress}
            underlayColor="#2bb25680"
            style={styles.cartButton}>
            <Text style={styles.saveButtonText}>पता सेव करे</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isAddressAdded: profileSelectors.isAddressAdded(state),
});
const mapDispatchToProps = {
  addAddress: profileOperations.addAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
  },
  mapImage: {
    height: hp(32),
    aspectRatio: 2 / 1,
  },
  addAddressContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop: hp(-3),
    padding: wp(4),
    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
  },
  icon: {
    width: wp(5),
    aspectRatio: 1 / 1,
  },
  address: {
    flex: 1,
    // backgroundColor: '#ededed',
    borderRadius: wp(2),
    padding: wp(1.6),
  },
  heading: {
    fontSize: wp(4),
    marginBottom: wp(2),
    marginTop: wp(2),
  },
  description: {
    fontSize: wp(3),
  },
  currentLocationButton: {
    flexDirection: 'row',
    paddingVertical: hp(0.5),
    alignItems: 'center',
  },
  currentLocationButtonTitle: {
    color: '#444',
    fontSize: wp(3.5),
    textAlign: 'center',
    borderRadius: wp(1),
    marginLeft: wp(2),
    padding: wp(0.6),
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: '#333',
    height: hp(5.5),
    borderRadius: 4,
    fontSize: wp(3.5),
    lineHeight: 12,
    paddingLeft: wp(4.5),
    marginRight: wp(3),
    marginBottom: hp(1),
  },
  checkBox: {
    marginTop: hp(1),
    marginBottom: hp(1.4),
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp(0.6),
  },
  btn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    color: '#444',
    fontSize: wp(3.5),
    marginRight: wp(2),
  },
  saveButton: {
    backgroundColor: '#0b8457',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp(2),
  },
  saveButtonText: {
    fontSize: wp(4),
    color: '#fff',
  },
  addCart: {
    backgroundColor: '#e6f2ee',
    padding: wp(4),
  },
  cartButton: {
    backgroundColor: '#0b8457',
    flexDirection: 'row',
    padding: wp(2),
    height: hp(6),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: hp(8),
  },
  cartText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    // flex: 1,
  },
  addCartIcon: {
    backgroundColor: '#e6f2ee',
    padding: wp(2),
    paddingHorizontal: wp(4),
    borderRadius: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
