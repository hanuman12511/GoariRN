import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_faq from '../../asset/icons/ic_faq.png';

class FaqTIleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleQuestions = () => {
    const id = this.props.item.id;
    this.props.nav.navigate('FAQ Questions', {id});
  };

  render() {
    return (
      <TouchableOpacity style={styles.tile} onPress={this.handleQuestions}>
        {/* <Image
          source={{uri: this.props.item.image}}
          resizeMode="cover"
          style={styles.tileIcon}
        /> */}
        <Text style={styles.title}>{this.props.item.name}</Text>
      </TouchableOpacity>
    );
  }
}

export default FaqTIleComponent;
const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    flex: 1,
    margin: wp(1.5),
    paddingVertical: wp(3),
    paddingHorizontal: wp(3),
    // alignItems: 'center',
    shadowColor: '#0006',
    shadowRadius: 10,
    shadowOpacity: 0.6,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  tileIcon: {
    height: wp(8),
    aspectRatio: 1 / 1,
  },
  title: {
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#444',
    // marginTop: wp(2),
  },
});
