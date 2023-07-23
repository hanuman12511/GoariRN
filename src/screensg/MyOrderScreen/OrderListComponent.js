import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_bag from '../../asset/icons/ic_bag.png';
import ic_check from '../../asset/icons/ic_check.png';
import sarso_khal from '../../asset/images/sarso_khal.webp';

const categoryList = props => {
  const {item, nav, refreshCallback} = props;
  const {image} = item;

  const handleOrderDetail = data => {
    const orderDetail = data;
    props.nav.navigate('Order Detail', {orderDetail});
  };

  return (
    <View style={styles.orderContainer}>
      <Text style={styles.timePlaced}>{props.item.orderDate}</Text>
      <Text style={styles.scheduled}>{props.item.delivery_date}</Text>

      <View style={styles.row}>
        <Image source={ic_bag} resizeMode="cover" style={styles.bagIcon} />
        <Text style={styles.text}>{props.item.tagline}</Text>
      </View>
      <View style={styles.listContainer}>
        {props.item.product !== null ? (
          <Image
            source={{uri: props.item.product[0].featuredImage}}
            resizeMode="cover"
            style={styles.listImage}
          />
        ) : null}

        <View style={styles.description}>
          <View style={[styles.row, styles.justifyBetween]}>
            {props.item.product !== null ? (
              <Text style={[styles.text, styles.bold]}>
                {props.item.product[0].productName}
              </Text>
            ) : null}
            <Text style={[styles.text, styles.bold]}>
              ₹ {props.item.subtotal}
            </Text>
          </View>
          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={styles.text}>पहुंचाने का शुल्क</Text>
            <Text style={[styles.text, styles.color]}>
              {props.item.delivery_charges}
            </Text>
          </View>
          <View style={[styles.row, styles.justifyBetween]}>
            <Text style={styles.text}>आर्डर ID</Text>
            <Text style={styles.text}> {props.item.orderId}</Text>
          </View>
          <View style={styles.row}>
            <Image
              source={props.item.statusIcon}
              resizeMode="cover"
              style={styles.CheckIcon}
            />
            <Text style={styles.text}>{props.item.status}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.row, styles.justifyBetween]}>
        <Text style={[styles.text, styles.bold]}>अंतिम भुगतान राशि</Text>
        <Text style={[styles.text, styles.bold, styles.color]}>
          ₹ {props.item.totalAmount}
        </Text>
      </View>

      <TouchableHighlight
        underlayColor="#0b8457"
        onPress={() => handleOrderDetail(props.item)}
        style={styles.button}>
        <Text style={styles.buttonText}>विवरण देखे</Text>
      </TouchableHighlight>
    </View>
  );
};

export default categoryList;

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: '#fff',
    padding: wp(2),
  },
  listContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: wp(3),
    paddingTop: wp(1),
    alignItems: 'center',
  },
  alignItems: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  bold: {fontWeight: '700'},
  timePlaced: {
    fontSize: wp(3),
    padding: wp(2),
    backgroundColor: '#cccccc80',
    textAlign: 'center',
    color: '#555',
  },
  scheduled: {
    fontSize: wp(3.5),
    padding: wp(2),
    color: '#333',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f1f1',
    marginBottom: hp(1),
  },
  offerTag: {
    backgroundColor: '#2bb256',
    height: wp(8),
    width: wp(8),
    borderRadius: wp(4),
    position: 'absolute',
    top: wp(3),
    left: wp(17),
    zIndex: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  offerTagText: {
    fontSize: wp(2.5),
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  listImage: {
    width: wp(15),
    aspectRatio: 1.44 / 1,
    marginRight: wp(3),
  },
  description: {
    flex: 1,
    marginLeft: wp(2),
  },
  listTitle: {
    fontSize: wp(3),
    fontWeight: '700',
  },
  listPrice: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#2bb256',
  },
  listDescription: {
    fontSize: wp(3),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  color: {
    color: '#2bb256',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(1),
  },
  bagIcon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
    marginLeft: wp(3),
  },
  CheckIcon: {
    width: wp(3.5),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
  },
  text: {
    fontSize: wp(3.5),
  },
  button: {
    backgroundColor: '#2bb256',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(5),
    marginTop: wp(1),
  },
  buttonText: {
    color: '#fff',
    fontSize: wp(4),
  },
  separator: {
    backgroundColor: '#f2f1f1',
    height: 1,
    marginVertical: wp(1),
  },
});
