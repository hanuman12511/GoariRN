//import liraries
import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import HeaderComponent from '../AppComponent/HeaderComponent';

import SafeAreaView from 'react-native-safe-area-view';
import PickerModal from 'react-native-picker-modal-view';
//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// loadsh
import get from 'loadsh/get';

import Footer from '../AppComponent/FooterComponent';
// Styles
import basicStyles from 'styles/BasicStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
//components
import CartItemComponent from './CartItemComponent';
import ProductTile from '../ProductScreen/ProductTile';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
// redux
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {walletOperations, walletSelectors} from 'data/redux/wallet';
import {KEYS, getData} from 'api/UserPreference';
// create a component
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.navi = get(this.props, 'navigation.addListener');
    this.state = {
      UserInfo: null,
      isProcessing: true,
      isRefreshing: false,
      cartData: [],
      foodProducts: [],
      productInfo: '',
      totalQuantity: '',
      totalAmount: '',
      message: '',
      subtotal: '',
      discount: '',
      deliveryCharges: '',
      walletAmount: '',
      coupons: [],
      code: '',
      selectedState: {
        Id: -1,
        Name: 'कूपन कोड डालें',
        Value: 'कूपन कोड डालें',
      },
      selectedValue: 'कूपन कोड डालें',
    };
  }

  // UNSAFE_componentWillMount() {
  //   console.log(this.navi);
  // }

  componentDidMount = async () => {
    this._subscribe = this.navi('focus', () => {
      this.handleCart();
      this.handleCoupons();
    });
    const userInfo = await getData(KEYS.USER_INFO);
    this.setState({
      UserInfo: userInfo,
    });
    this.UserLogin();
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

  handleCart = async () => {
    try {
      let params;
      if (this.state.coupons.length != 0) {
        params = {Coupon: this.state.selectedState.Code};
      } else {
        params = {Coupon: ''};
      }

      await this.props.viewCart(params).then(async () => {
        const {success, message} = this.props.isCartAvailable;

        if (success) {
          const {cartDetail, walletAmount} = this.props.isCartAvailable;
          const {
            productInfo,
            totalQuantity,
            totalAmount,
            subtotal,
            discount,
            deliveryCharges,
          } = cartDetail;

          await this.props.cartUpdate(totalQuantity);

          this.setState({
            productInfo,
            totalQuantity,
            totalAmount,
            subtotal,
            discount,
            deliveryCharges,
            walletAmount,
            isProcessing: false,
            isRefreshing: false,
          });
        } else {
          this.setState({
            productInfo: '',
            totalQuantity: '',
            totalAmount: '',
            message,
            subtotal: '',
            discount: '',
            deliveryCharges: '',
            isProcessing: false,
            isRefreshing: false,
          });
        }
      });
    } catch (error) {}
  };

  handleCoupons = async () => {
    const params = null;

    await this.props.viewCoupons(params).then(() => {
      const {success} = this.props.isCouponList;
      if (success) {
        const {coupons} = this.props.isCouponList;
        var newOne = [];
        coupons.forEach((value, index) => {
          var clData = {};
          let Id = index + 1;
          let Name = value.code + '\n Description: ' + value.description;
          let Value = Name;
          let Code = value.code;
          clData = {Id, Name, Value, Code};
          newOne.push(clData);
        });

        this.setState({coupons: newOne});
      } else {
        this.setState({coupons: []});
      }
    });
  };

  handleSelectedState = async selectedState => {
    const params = {Coupon: selectedState.Code};
    await this.props.viewCart(params).then(async () => {
      const {success, message} = this.props.isCartAvailable;

      if (success) {
        const {cartDetail, walletAmount} = this.props.isCartAvailable;
        const {
          productInfo,
          totalQuantity,
          totalAmount,
          subtotal,
          discount,
          deliveryCharges,
        } = cartDetail;
        await this.props.cartUpdate(totalQuantity);
        this.setState({
          productInfo,
          totalQuantity,
          totalAmount,
          subtotal,
          discount,
          deliveryCharges,
          walletAmount,
          isProcessing: false,
        });
      } else {
        Alert.alert('', message);
        this.setState({
          productInfo: '',
          totalQuantity: '',
          totalAmount: '',
          message: '',
          subtotal: '',
          discount: '',
          deliveryCharges: '',
          isProcessing: false,
        });
      }
    });

    this.setState({
      selectedState:
        selectedState.Code != undefined
          ? selectedState
          : {
              Id: -1,
              Name: 'कूपन कोड डालें',
              Value: 'कूपन कोड डालें',
            },
    });
    return selectedState;
  };

  handleSelectedStateClose = () => {
    this.setState({
      selectedState: {
        Id: -1,
        Name: 'कूपन कोड डालें',
        Value: 'कूपन कोड डालें',
      },
    });
  };

  renderStatesCategoryPicker = (disabled, selected, showModal) => {
    const {selectedState} = this.state;
    const {Name} = selectedState;
    const labelStyle = {
      color: '#000',
      fontSize: wp(3.2),
    };

    if (Name === 'Select State') {
      labelStyle.color = '#555';
    }

    const handlePress = disabled ? null : showModal;

    return (
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={handlePress}
          style={[
            basicStyles.directionRow,
            basicStyles.alignCenter,
            basicStyles.justifyBetween,
          ]}>
          <Text style={labelStyle}>{Name}</Text>
          <FontAwesome5
            name="caret-down"
            color="#333"
            size={14}
            style={styles.vIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderItem = ({item}) => (
    <CartItemComponent
      item={item}
      nav={this.props.navigation}
      fetchCartCount={this.fetchCartCount}
      cartUpdate={this.handleCartUpdate}
    />
  );

  renderItem2 = ({item}) => (
    <ProductTile
      item={item}
      nav={this.props.navigation}
      fetchCartCount={this.fetchCartCount}
    />
  );

  handleCartUpdate = async (data, item) => {
    this.setState({isProcessing: true});
    const userInfo = await getData(KEYS.USER_INFO);

    if (userInfo !== null) {
      const {addOnId, id} = item;
      let qty = '';
      if (data === '+1') {
        qty = +1;
      } else if (data === '-1') {
        qty = -1;
      }
      const params = {
        productId: id,
        quantity: qty,
        addonId: addOnId,
      };
      await this.props.addToCart(params).then(async () => {
        const {success, message} = this.props.isItemAddSuccess;

        if (success) {
          const {cartItemCount} = this.props.isItemAddSuccess;
          // console.log(cartItemCount);
          if (cartItemCount !== undefined) {
            await this.props.cartUpdate(cartItemCount);
          } else {
            await this.props.cartUpdate(0);
          }
          this.handleCart();
          // this.setState({isProcessing: false});
        } else {
          Alert.alert('', message);
          this.setState({isProcessing: false});
        }
      });
    } else {
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
  };

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleAddress = () => {
    const {totalAmount, walletAmount, selectedState} = this.state;
    const amountData = {totalAmount, walletAmount, selectedState};
    console.log('amountData', amountData);
    this.props.navigation.navigate('Select Slot', {amountData});
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isRefreshing: true});

      // updating list
      this.handleCart();
      this.handleCoupons();
    } catch (error) {
      console.log(error.message);
    }
  };
  handleGoBack = () => {
    this.state.UserInfo !== null
      ? this.props.navigation.navigate('logindrawerstack')
      : this.props.navigation.navigate('drawer');
  };

  handleLogin = async () => {
    this.props.navigation.navigate('login');
  };
  render() {
    const {UserInfo} = this.state;
    return (
      <>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" कार्ट"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />

        <ScrollView style={[styles.container]}>
          <View style={[styles.container]}>
            {this.state.productInfo !== '' && UserInfo !== null ? (
              <View style={[styles.container]}>
                <ScrollView
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.isRefreshing}
                      onRefresh={this.handleListRefresh}
                    />
                  }>
                  <View
                    style={[basicStyles.mainContainer, styles.homeContainer]}>
                    <View style={styles.cartListContainer}>
                      <FlatList
                        data={this.state.productInfo}
                        renderItem={this.renderItem}
                        keyExtractor={this.keyExtractor}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={this.itemSeparator}
                        contentContainerStyle={styles.listContainer}
                      />
                    </View>
                    {this.state.coupons.length !== 0 ? (
                      <View style={styles.aboutProduct}>
                        <Text style={styles.aboutProductHeading}>
                          कूपन लागू करें
                        </Text>

                        <View style={styles.inputContainer}>
                          <PickerModal
                            items={this.state.coupons}
                            selected={this.state.selectedState}
                            onSelected={this.handleSelectedState}
                            // onClosed={this.handleSelectedStateClose}
                            backButtonDisabled
                            showToTopButton={true}
                            // showAlphabeticalIndex={true}
                            autoGenerateAlphabeticalIndex={false}
                            searchPlaceholderText="कूपन कोड डालें"
                            renderSelectView={this.renderStatesCategoryPicker}
                          />

                          <TouchableOpacity>
                            <Text>लागू करे</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : null}

                    <View style={styles.cartTopDetail}>
                      <View style={styles.row}>
                        <Text style={styles.rowColumn}>एम आर पी</Text>
                        <Text style={styles.rowColumn}>
                          ₹ {this.state.subtotal}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.rowColumn}>उत्पाद छूट</Text>
                        <Text style={styles.rowColumn}>
                          ₹ {this.state.discount}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.rowColumn}>डिलीवरी शुल्क</Text>
                        <Text style={styles.rowColumn}>
                          {this.state.deliveryCharges}
                        </Text>
                      </View>
                      <View style={styles.rowSeparator} />
                      <View style={styles.row}>
                        <Text style={styles.rowColumnBold}>कुल राशि</Text>
                        <Text style={styles.rowColumnBold}>
                          ₹ {this.state.totalAmount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ScrollView>

                <View style={styles.addCart}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={this.handleAddress}>
                    <Text style={styles.cartText}>आर्डर करे</Text>
                    <View style={styles.addCartIcon}>
                      <Text>₹ {this.state.totalAmount}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{marginBottom: 50}}></View>
              </View>
            ) : (
              <View style={[styles.errorMessage]}>
                <Text style={styles.textMessage}>{this.state.message}</Text>
                <Button
                  onPress={this.handleGoBack}
                  title="मुख्य पृष्ठ पर जाएं"
                  color="#841584"
                />
              </View>
            )}
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
          <Footer nav={this.props.navigation} />
        </View>

        {this.state.isProcessing && <ProcessingLoader />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isCartAvailable: cartSelectors.isCartAvailable(state),
  isItemAddSuccess: cartSelectors.isItemAddSuccess(state),
  isCartCount: cartSelectors.isCartCount(state),
  isCouponList: walletSelectors.isCouponList(state),
});

const mapDispatchToProps = {
  viewCart: cartOperations.viewCart,
  addToCart: cartOperations.addToCart,
  cartUpdate: cartOperations.cartUpdate,
  viewCoupons: walletOperations.viewCoupons,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ee',
  },
  homeContainer: {
    backgroundColor: '#e6f2ee',
  },
  aboutProduct: {
    backgroundColor: '#fff',
    padding: wp(3),
    marginTop: wp(2),
    // borderRadius: wp(4),
  },
  aboutProductHeading: {
    fontSize: wp(4),
    fontWeight: '700',
    marginBottom: wp(2),
  },
  aboutProductPara: {
    fontSize: wp(3.5),
    fontWeight: '400',
    color: '#777',
  },
  productContainer: {
    backgroundColor: '#fff',
    padding: wp(6),
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
    // alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    height: wp(30),
    aspectRatio: 1.44 / 1,
    alignSelf: 'center',
  },
  design: {
    backgroundColor: '#0b8457',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: wp(2),
  },
  title: {
    fontSize: wp(5),
    fontWeight: '700',
  },
  price: {
    fontSize: wp(4),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: wp(3),
  },
  oldPrice: {
    fontSize: wp(4),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: wp(3),
    color: '#999',
    marginLeft: wp(3),
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ccc4',
    paddingHorizontal: wp(3),
    borderRadius: 4,
    marginBottom: wp(3),
    // marginHorizontal: wp(2),
    marginTop: wp(3),
    // width: wp(90),
  },
  searchBar: {
    height: hp(5.5),
    fontSize: wp(3.5),
    flex: 1,
    color: '#333',
  },
  searchIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
  addCart: {
    backgroundColor: '#fff',
    padding: wp(4),
  },
  cartButton: {
    backgroundColor: 'green',
    flexDirection: 'row',
    padding: wp(2),
    paddingHorizontal: wp(5),
    alignItems: 'center',
    borderRadius: hp(8),
  },
  cartText: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#fff',
    flex: 1,
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
  heading: {
    fontSize: wp(4.5),
    fontWeight: '700',
    paddingHorizontal: wp(3),
    marginTop: wp(3),
  },
  // listContainer: {
  //   padding: wp(2),
  // },
  headerContainer: {
    height: hp(7),
    // justifyContent: 'center',
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc8',
  },
  menuIcon: {
    height: wp(6),
    aspectRatio: 1 / 1,
  },
  headerTitle: {
    fontSize: wp(4),
    fontWeight: '700',
    marginLeft: wp(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(4),
    marginTop: wp(1),
  },
  mapIcon: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  location: {
    fontSize: wp(3),
    flex: 1,
  },

  cartTopDetail: {
    marginTop: wp(2),
    backgroundColor: '#fff',
    padding: wp(3),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(1),
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: wp(1),
  },
  rowColumn: {
    fontSize: wp(3.5),
  },
  rowColumnBold: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  //   cartListContainer: {
  //     flex: 1,
  //   },
  separator: {
    height: 4,
    backgroundColor: 'transparent',
  },
  //   listContainer: {
  //     padding: wp(2),
  //   },
  checkoutButton: {
    padding: wp(2),
  },
  checkoutButtonView: {
    backgroundColor: '#2bb256',
    height: hp(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
  },
  checkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
  next: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginLeft: wp(2),
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    marginTop: hp(3),
  },
  shopByCategoryTitle: {
    fontSize: wp(3.5),
    flex: 1,
  },
  headingIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
  },
  errorMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
  textMessage: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  pickerContainer: {
    flex: 1,
    justifyContent: 'center',

    paddingRight: wp(3),

    height: hp(6),
  },
});
