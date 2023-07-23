import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_delete from '../../asset/icons/ic_delete_white.png';

const MyAddressListComponent = props => {
  const handlePayment = data => {
    const address = [data];
    // console.log(address);
    props.nav.navigate('Select Slot', {address});
  };

  const handleAddressDelete = id => {
    props.deleteAddressCallback(id);
  };

  return (
    <TouchableOpacity
      onPress={() => handlePayment(props.item)}
      style={[styles.listContainer, styles.row, styles.justifyBetween]}>
      <View style={styles.flex}>
        <Text style={[styles.text, styles.bold, styles.space]}>
          {props.item.address_type}
        </Text>
        <Text style={[styles.text, styles.spaceHalf]}>{props.item.name}</Text>
        <Text style={[styles.text, styles.spaceHalf]}>
          {props.item.address}
        </Text>
      </View>

      <View>
        {/* <TouchableHighlight
          onPress={handleEdit}
          underlayColor="#2bb25680"
          style={styles.editButton}>
          <Image source={ic_edit} resizeMode="cover" style={styles.btnIcon} />
        </TouchableHighlight> */}

        <TouchableHighlight
          onPress={() => handleAddressDelete(props.item.id)}
          underlayColor="#b82a2a80"
          style={styles.deleteButton}>
          <Image source={ic_delete} resizeMode="cover" style={styles.btnIcon} />
        </TouchableHighlight>
      </View>
    </TouchableOpacity>
  );
};

export default MyAddressListComponent;

const styles = StyleSheet.create({
  listContainer: {
    padding: wp(5),
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },
  space: {
    marginBottom: wp(2),
  },
  spaceHalf: {
    marginBottom: wp(1),
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
  text: {
    fontSize: wp(4),
  },
  color: {
    color: '#2bb256',
  },
  icon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
    marginLeft: wp(3),
  },
  // editButton: {
  //   height: wp(6),
  //   width: wp(6),
  //   borderRadius: wp(3),
  //   backgroundColor: '#2bb256',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: hp(2),
  // },
  deleteButton: {
    height: wp(8),
    width: wp(8),
    borderRadius: wp(4),
    backgroundColor: '#b82a2a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    height: wp(4),
    aspectRatio: 1 / 1,
  },
});
