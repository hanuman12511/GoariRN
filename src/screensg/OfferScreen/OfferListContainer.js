import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const OfferList = props => {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.heading}>{props.item.code}</Text>
      <Text style={styles.Description}>{props.item.description}</Text>
      <Text style={styles.Description}>{props.item.validTill}</Text>
    </View>
  );
};

export default OfferList;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    padding: wp(2),
  },
  heading: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  Description: {
    fontSize: wp(3),
  },
});
