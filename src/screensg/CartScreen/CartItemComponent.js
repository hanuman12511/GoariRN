import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class HomeTileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCartDetail = () => {
    const item = this.props.item;
    this.props.nav.navigate('Product Detail', {item});
  };

  handleUpdate = () => {
    const {cartUpdate} = this.props;
    cartUpdate('-1', this.props.item);
  };
  handleAdd = () => {
    const {cartUpdate} = this.props;
    cartUpdate('+1', this.props.item);
  };

  render() {
    return (
      <View>
        <View style={styles.listContainer}>
          <Image
            source={{uri: this.props.item.featuredImage}}
            resizeMode="cover"
            style={styles.listImage}
          />

          <View style={styles.description}>
            <Text style={styles.listTitle}>{this.props.item.name}</Text>
            <Text style={styles.listPrice}>₹ {this.props.item.addOnprice}</Text>

            <View style={styles.buttonContainer}>
              <Text style={styles.quantity}>
                {this.props.item.addOnWeight} KG
              </Text>
              <View style={styles.units}>
                <TouchableOpacity onPress={this.handleUpdate}>
                  <Text
                    style={styles.unitSign}
                    //   onPress={this.handleProductUnitUpdate(-1)}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={styles.unitQuantity}>
                  {this.props.item.quantity}
                </Text>
                <TouchableOpacity onPress={this.handleAdd}>
                  <Text
                    style={styles.unitSign}
                    //   onPress={this.handleProductUnitUpdate(+1)}
                  >
                    +
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeTileComponent;

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: wp(3),
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
    fontSize: wp(3.8),
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
  quantity: {
    fontSize: wp(3),
  },
  units: {
    flexDirection: 'row',
  },
  unitSign: {
    height: wp(7),
    width: wp(7),
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    lineHeight: wp(7),
    fontSize: wp(3.8),
  },
  unitQuantity: {
    height: wp(7),
    width: wp(8),
    textAlign: 'center',
    lineHeight: wp(7),
    fontSize: wp(3.8),
  },
});
