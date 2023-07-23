import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Components
import MyOrderDetailItemComponent from './MyOrderDetailItemComponent';
import HeaderComponent from '../AppComponent/HeaderComponent';
import get from 'loadsh/get';
export default class AllCategory extends Component {
  constructor(props) {
    super(props);
    const orderDetail = get(props.route, 'params.orderDetail');

    this.state = {
      isProcessing: false,
      ...orderDetail,
      orderDetails: [
        {
          title: 'बिनोला खली',
        },
        {
          title: 'बिनोला खली',
        },
      ],
    };
  }

  cartItem = ({item}) => (
    <MyOrderDetailItemComponent item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  // handleChangeDeliveryTime = () => {};

  render() {
    const {
      isProcessing,
      discount,
      delivery_charges,
      billing_address,
      product,
      status,
      subtotal,
      totalAmount,
      orderId,
      orderStartTime,
      orderDate,
      orderDay,
      delivery_date,
      address_type,
    } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" उत्पाद विवरण"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <ScrollView>
          <View style={[styles.cartListContainer, styles.padding]}>
            <View style={styles.topContainer}>
              <View style={styles.orderContainer}>
                <Text style={styles.timePlaced}>{orderDate}</Text>
              </View>

              <View style={[styles.row, styles.deliveryTime]}>
                <View style={styles.flexOne}>
                  <Text style={styles.text}>डिलीवरी का समय</Text>
                  <Text style={[styles.text, styles.bold]}>
                    {delivery_date}
                  </Text>
                </View>
              </View>

              <View style={styles.lineSeparator} />

              <View style={styles.status}>
                <Text style={[styles.text, styles.bold]}>
                  आर्डर की स्थिति :{' '}
                </Text>
                <Text style={styles.text}>{status}</Text>
              </View>
            </View>

            <View style={styles.payOnDelivery}>
              <Text style={[styles.text, styles.bold, styles.pay]}>
                डिलीवरी पर नगद भुगतान
              </Text>
              <Text style={[styles.text]}>
                डिलीवरी पर देय राशि ₹ {totalAmount}
              </Text>
            </View>

            <View style={styles.orderItem}>
              <FlatList
                data={product}
                renderItem={this.cartItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.itemSeparator}
                contentContainerStyle={styles.listContainer}
              />
            </View>

            <View style={styles.PaymentSummery}>
              <Text style={styles.text}>भुगतान सारांश</Text>

              <View style={styles.lineSeparator} />

              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={styles.text}>एम आर पी</Text>
                <Text style={styles.text}>₹ {subtotal}</Text>
              </View>

              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={styles.text}>पहुंचाने का शुल्क</Text>
                <Text style={styles.text}> {delivery_charges}</Text>
              </View>
              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={styles.text}>उत्पाद छूट</Text>
                <Text style={styles.text}>- ₹ {discount}</Text>
              </View>

              <View style={styles.lineSeparator} />

              <View style={[styles.row, styles.justifyBetween]}>
                <Text style={styles.text}>कुल देय राशि</Text>
                <Text style={styles.text}>₹ {totalAmount}</Text>
              </View>
            </View>

            <View style={styles.deliveryAddress}>
              <Text style={[styles.text, styles.bold]}>डिलिवरी का पता</Text>
              <Text style={[styles.text]}>{address_type}</Text>

              <Text style={[styles.text]}>{billing_address}</Text>
            </View>
          </View>
        </ScrollView>
        {isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  orderContainer: {
    padding: wp(2),
  },
  topContainer: {
    backgroundColor: '#fff',
    marginBottom: wp(2),
  },
  cartListContainer: {
    padding: wp(2),
  },
  separator: {
    height: 4,
    backgroundColor: '#f2f1f1',
  },
  alignItems: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '700',
  },
  timePlaced: {
    fontSize: wp(3),
    padding: wp(2),
    backgroundColor: '#cccccc80',
    textAlign: 'center',
    color: '#555',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  text: {
    fontSize: wp(3.5),
  },

  deliveryTime: {
    paddingHorizontal: wp(2),
  },
  changeButton: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    paddingVertical: wp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
  },
  lineSeparator: {
    height: 0.5,
    backgroundColor: '#ccc',
    marginVertical: hp(1.5),
  },
  status: {
    paddingHorizontal: wp(2),
    paddingBottom: wp(2.8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    height: 12,
    width: 12,
    borderWidth: 0.5,
    borderColor: '#999',
    borderRadius: 6,
    marginBottom: wp(1),
    backgroundColor: '#fff',
  },
  first: {
    flex: 1,
  },
  middle: {
    width: '32%',
    alignItems: 'center',
  },
  last: {
    flex: 1,
    alignItems: 'flex-end',
  },
  borderBottom: {
    width: wp(90),
    height: 1,
    backgroundColor: '#ccc',
    position: 'absolute',
    left: wp(3),
    top: 16,
  },
  payOnDelivery: {
    backgroundColor: '#fff',
    padding: wp(2),
  },
  PaymentSummery: {
    backgroundColor: '#fff',
    padding: wp(2),
    marginTop: wp(2),
  },
  pay: {
    marginBottom: wp(1.5),
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: wp(2),
    marginTop: wp(2),
  },
  deliveryAddress: {
    backgroundColor: '#fff',
    padding: wp(3),
    marginTop: wp(2),
  },
  cancelOrder: {
    backgroundColor: '#2bb256',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: wp(3.5),
    color: '#fff',
  },
});
