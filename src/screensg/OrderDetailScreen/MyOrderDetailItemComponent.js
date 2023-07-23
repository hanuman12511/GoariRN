import React from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import sarso_khal from '../../asset/images/sarso_khal.webp';

const categoryList = props => {
  const {item, nav} = props;
  const {
    productName,
    productPrice,
    quantity,
    weight,
    totalProductAmount,
    featuredImage,
  } = item;

  const handleCartDetail = () => {};

  return (
    <View>
      <View style={[styles.row, styles.justifyBetween]}>
        <Text style={styles.text}>{quantity} Item(s)</Text>
        <Text style={styles.text}>भुगतान राशि ₹ {productPrice}</Text>
      </View>
      <View style={styles.lineSeparator} />
      <TouchableHighlight underlayColor="#ffffff80" onPress={handleCartDetail}>
        <View style={styles.listContainer}>
          <Image
            source={{uri: featuredImage}}
            resizeMode="cover"
            style={styles.listImage}
          />

          <View style={styles.description}>
            <Text style={styles.listTitle}>{productName}</Text>
            <Text style={styles.quantity}>मात्रा ({quantity}x)</Text>
            <Text style={styles.listPrice}>₹ {totalProductAmount}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default categoryList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: wp(2),
    alignItems: 'center',
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
    width: wp(20),
    aspectRatio: 1.44 / 1,
    marginRight: wp(3),
  },
  description: {
    flex: 1,
    marginLeft: wp(2),
  },
  listTitle: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  listPrice: {
    fontSize: wp(4),
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
  quantity: {
    fontSize: wp(3.5),
    marginVertical: wp(1),
  },
  units: {
    flexDirection: 'row',
  },
  unitSign: {
    height: wp(5),
    width: wp(5),
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    lineHeight: wp(5.2),
    fontSize: wp(3),
  },
  unitQuantity: {
    height: wp(5),
    width: wp(8),
    textAlign: 'center',
    lineHeight: wp(5.2),
    fontSize: wp(3),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: wp(3.5),
  },
  lineSeparator: {
    height: 0.5,
    backgroundColor: '#ccc',
    marginVertical: hp(1.5),
  },
});
