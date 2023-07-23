import React, {Component} from 'react';
import {View, Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import RadioForm from 'react-native-simple-radio-button';
import CheckBox from 'react-native-check-box';

//loadsh
import get from 'loadsh/get';
import basicStyles from 'styles/BasicStyles';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import {connect} from 'react-redux';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import {walletOperations, walletSelectors} from 'data/redux/wallet';
//payment gateway
import RazorpayCheckout from 'react-native-razorpay';
import HeaderComponent from '../AppComponent/HeaderComponent/HeaderComponent';
const radio_props = [
  {label: 'डिलवरी पर नगद भुगतान', value: 'COD'},
  {label: 'ऑनलाइन भुगतान', value: 'Online'},
];
class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    const payData = get(props.route, 'params.payData');
    // console.log(payData);
    this.state = {
      ...payData,
      payMod: 'COD',
      foodProducts: [],
      amount: 0,
      isDefaultSelect: false,
      isProcessing: true,
    };
  }

  componentDidMount() {
    this.setState({
      isProcessing: false,
    });
  }
  placeOrder = async () => {
    try {
      const {
        products,
        sltTime,
        payMod,
        slotDate,
        isDefaultSelect,
        walletAmount,
        selectedState,
      } = this.state;

      const {address, address_type, latitude, longitude} = products;
      const {slotdetail_id} = sltTime;
      if (isDefaultSelect) {
        var params = {
          address_type,
          address,
          latitude: latitude,
          longitude: longitude,
          slotId: slotdetail_id,
          paymentMode: payMod,
          delivery_date: slotDate,
          wallet: walletAmount,
          coupon: selectedState.Code !== undefined ? selectedState.Code : '',
        };
      } else {
        var params = {
          address_type,
          address,
          latitude: latitude,
          longitude: longitude,
          slotId: slotdetail_id,
          paymentMode: payMod,
          delivery_date: slotDate,
          coupon: selectedState.Code !== undefined ? selectedState.Code : '',
        };
      }

      await this.props.orderProduct(params).then(async () => {
        const {success, message} = this.props.isOrderProduct;

        this.setState({
          isProcessing: false,
        });
        this.props.navigation.navigate('My Order');

        if (!success) {
          const {output, orderPlaced, cartCount} = this.props.isOrderProduct;

          if (payMod === 'COD') {
            await this.props.cartUpdate(cartCount);
            this.props.navigation.navigate('My Order');
            // navigation.jumpTo('My Order');
          } else if (payMod === 'Online') {
            // console.log(payMod);
            this.handleOnlinePayment(output);
          }
        } else {
          Alert.alert('', message);
        }
      });
    } catch (error) {}
  };

  handleOnlinePayment = async info => {
    try {
      const {
        userId,
        orderId,
        onlineOrderId,
        onlineKeyId,
        orderAmount,
        currency,
        description,
        merchantLogo,
        merchantName,
      } = info;
      const options = {
        key: onlineKeyId,
        // key: 'rzp_test_nBxiE2ZSodCXCO',
        //amount: `${amount}`,
        amount: orderAmount,
        currency: currency,
        name: merchantName,
        order_id: onlineOrderId,
        description: description,
        image: merchantLogo,
        theme: {color: '#0b8457'},
      };
      // console.log(info);
      // transferring control to payment gateway
      const paymentGatewayResponse = await RazorpayCheckout.open(options);

      // processing payment gateway response
      if (paymentGatewayResponse) {
        const {
          razorpay_order_id: onlineOrderId,
          razorpay_payment_id: onlinePaymentId = null,
          razorpay_signature: onlineSignature = null,
        } = paymentGatewayResponse;

        // preparing params
        const params = {
          orderId,
          onlineOrderId,
          onlinePaymentId,
          onlineSignature,
        };
        // console.log('for verification', params);
        // calling api
        await this.props.paymentVerify(params);
        // processing response
        if (this.props.isPaymentVerifySuccess) {
          // updating cart item count
          const {cartCount} = this.props.isPaymentVerifySuccess;
          await this.props.cartUpdate(cartCount);
          // stopping loader
          this.props.navigation.navigate('My Order');
          this.setState({isProcessing: false});

          // navigating
          // this.props.navigation.navigate('Wallet');
        }
      }
    } catch (error) {
      const {code, description} = error;

      if (code === 0 && description === 'Payment Cancelled') {
        // stopping loader
        this.setState({isProcessing: false});
      } else if (code === 2 && description === 'Payment cancelled by user') {
        // stopping loader
        this.setState({isProcessing: false});
      } else {
        console.log(error);
      }
    }
  };

  handleModeChange = data => {
    this.state.payMod === data
      ? this.setState({payMod: data})
      : this.setState({payMod: data});
  };

  handleSetDefault = () => {
    this.setState(prevState => ({
      isDefaultSelect: !prevState.isDefaultSelect,
    }));
  };

  render() {
    if (this.state.amount !== 0 || this.state.amount !== null) {
      if (this.state.walletAmount < this.state.totalAmount) {
        var patymentAmount = this.state.totalAmount - this.state.walletAmount;
        var remainig = patymentAmount;
      } else if (this.state.walletAmount > this.state.totalAmount) {
        var patymentAmount = this.state.walletAmount - this.state.totalAmount;
        var remainig = 0;
      } else {
        var patymentAmount = 0;
        var remainig = 0;
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={basicStyles.mainContainer}>
          <HeaderComponent
            navlogo="arrow-left"
            brandname=" भुगतान के तरीके"
            alert=""
            location=""
            bookmark=""
            nav={this.props.navigation}
          />
          {this.state.isDefaultSelect ? (
            <View style={styles.payAmount}>
              <CheckBox
                isChecked={this.state.isDefaultSelect}
                onClick={this.handleSetDefault}
                // tintColors={{true: '#0b8457', false: '#000'}}
                checkBoxColor={'#0b8457'}
              />

              <Text style={styles.title}>वॉलेट राशि</Text>
              <Text style={styles.value}>₹ {patymentAmount}</Text>
            </View>
          ) : (
            <View style={styles.payAmount}>
              <CheckBox
                isChecked={this.state.isDefaultSelect}
                onClick={this.handleSetDefault}
                // tintColors={{true: '#0b8457', false: '#000'}}
                checkBoxColor={'#0b8457'}
              />

              <Text style={styles.title}>वॉलेट राशि</Text>
              <Text style={styles.value}>₹ {this.state.walletAmount}</Text>
            </View>
          )}

          <View style={styles.payAmount}>
            <Text style={styles.title}>भुगतान योग्य राशि</Text>
            <Text style={styles.value}>₹ {this.state.totalAmount}</Text>
          </View>
          {this.state.isDefaultSelect ? (
            <View style={styles.payAmount}>
              <Text style={styles.title}>वॉलेट से पैसे काटने के बाद</Text>
              <Text style={styles.value}>₹ {remainig}</Text>
            </View>
          ) : null}

          <View style={styles.paymentContainer}>
            <Text style={styles.optionHeading}>भुगतान विकल्प चुनें</Text>
            <RadioForm
              radio_props={radio_props}
              onPress={this.handleModeChange}
              formHorizontal={false}
              labelHorizontal={true}
              animation={true}
              buttonSize={12}
              buttonOuterSize={24}
              buttonColor={'#ccc'}
              selectedButtonColor={'#0b8457'}
              labelColor={'#ccc'}
              labelStyle={styles.radioButtonLabel}
              style={styles.radioButton}
            />
          </View>
        </View>

        <View style={styles.addCart}>
          <TouchableOpacity style={styles.cartButton} onPress={this.placeOrder}>
            <Text style={styles.cartText}>आर्डर करे</Text>
          </TouchableOpacity>
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isOrderProduct: cartSelectors.isOrderProduct(state),
  isPaymentVerifySuccess: walletSelectors.isPaymentVerifySuccess(state),
});
const mapDispatchToProps = {
  orderProduct: cartOperations.orderProduct,
  cartUpdate: cartOperations.cartUpdate,
  paymentVerify: walletOperations.paymentVerify,
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  allCategoryContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  listContainer: {
    padding: wp(2),
  },
  payAmount: {
    backgroundColor: '#fff',
    paddingVertical: wp(4),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(4),
    color: '#777',
    flex: 1,
  },
  radioButtonLabel: {
    fontSize: wp(3.5),
    color: '#777',
    flex: 1,
  },
  value: {
    fontSize: wp(4),
    color: '#0b8457',
    fontWeight: '700',
  },
  optionHeading: {
    fontSize: wp(4),
    fontWeight: '700',
    padding: wp(3),
    marginTop: wp(2),
  },
  option: {
    backgroundColor: '#fff',
    paddingHorizontal: wp(3),
    height: hp(6),
    alignItems: 'center',
    marginBottom: 4,
    flexDirection: 'row',
  },
  radioButton: {
    backgroundColor: '#fff',
    paddingVertical: wp(3),
    height: hp(12),
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 4,
  },
  circle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: '#ccc',
    marginRight: wp(3),
  },
  addCart: {
    backgroundColor: '#fff',
    padding: wp(4),
  },
  cartButton: {
    backgroundColor: 'green',
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
});
