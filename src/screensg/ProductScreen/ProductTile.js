import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

import ProductTile from './ProductTile';
//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Images
import churi from '../../asset/images/churi.webp';
import basicStyles from 'styles/BasicStyles';

class HomeTileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.tileContainer}>
        <Image
          source={this.props.item.itemImage}
          resizeMode="cover"
          style={styles.productImage}
        />
        <View
          style={[
            basicStyles.directionRow,
            basicStyles.alignCenter,
            basicStyles.justifyCenter,
          ]}>
          <View style={styles.design} />
          <Text style={styles.title}>{this.props.item.title}</Text>
        </View>

        <View style={[basicStyles.directionRow, basicStyles.justifyCenter]}>
          <Text style={styles.price}>Rs. 1300</Text>
          <Text style={styles.oldPrice}>Rs. 1379</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default HomeTileComponent;

const styles = StyleSheet.create({
  tileContainer: {
    backgroundColor: '#0b845710',
    width: wp(45),
    margin: wp(1.5),
    paddingVertical: wp(8),
    paddingHorizontal: wp(2),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  productImage: {
    height: wp(16),
    aspectRatio: 1.44 / 1,
    marginBottom: wp(3),
  },
  design: {
    backgroundColor: '#0b8457',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginRight: wp(2),
  },
  title: {
    fontSize: wp(4),
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
});
