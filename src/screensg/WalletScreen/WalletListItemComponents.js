import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WalletListItemComponents = props => {
  const {item} = props;
  const {title, type, orderId, description, date, expiryDate, amount} = item;

  let txnAmount = null;
  if (type === 'income') {
    txnAmount = '+ ₹ ' + amount;
  } else if (type === 'expense') {
    txnAmount = '- ₹ ' + amount;
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.DateTime}>05-08-2021</Text>

      <View style={[styles.row, styles.spaceBottom]}>
        <Text style={[styles.title, styles.flexOne]}>{title}</Text>
        <Text style={styles.amountText}>₹ {props.item.amount}</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.text, styles.flexOne]}>
          ट्रांसक्शन ID: #{props.item.transactionId}
        </Text>
        <Text style={[styles.text, styles.textBold]}>
          समाप्ति तिथि: {props.item.date}
        </Text>
      </View>

      <Text style={styles.description}>
        वॉलेट में {props.item.amount} जोड़े गए
      </Text>
    </View>
  );
};

export default WalletListItemComponents;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    padding: wp(3),
    borderRadius: wp(1),
    marginTop: hp(2),
    paddingTop: hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  amountText: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  themeTextColor: {
    color: '#2bb256',
  },
  orangeColor: {
    color: '#ff7800',
  },
  spaceBottom: {
    marginBottom: hp(1),
  },
  title: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#333',
    marginTop: wp(2),
  },
  textBold: {
    fontWeight: '700',
    color: '#333',
  },

  separator: {
    backgroundColor: '#ccc',
    height: 1,
    marginVertical: hp(0.5),
  },
  text: {
    fontSize: wp(3),
  },
  description: {
    fontSize: wp(3),
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: wp(1.5),
    marginTop: wp(1.5),
  },
  DateTime: {
    alignSelf: 'flex-start',
    fontSize: wp(2.8),
    color: '#fff',
    marginTop: hp(-4),
    backgroundColor: '#2bb256',
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderTopRightRadius: hp(3),
    borderTopLeftRadius: hp(3),
    borderBottomRightRadius: hp(3),
    borderBottomLeftRadius: hp(0),
    marginLeft: wp(-3),
  },
  cashIcon: {
    width: wp(5),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
});
