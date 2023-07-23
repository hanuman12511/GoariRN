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
    const answer = this.props.item.answer;
    this.props.nav.navigate('FAQ Answer', {answer});
  };

  render() {
    return (
      <TouchableOpacity style={styles.tile} onPress={this.handleQuestions}>
        <Image source={ic_faq} resizeMode="cover" style={styles.tileIcon} />
        <Text style={styles.title}>{this.props.item.question}</Text>
      </TouchableOpacity>
    );
  }
}

export default FaqTIleComponent;
const styles = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    margin: wp(1.5),
    marginVertical: wp(1),
    paddingVertical: wp(3),
    paddingHorizontal: wp(2),
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
    width: wp(6),
    marginRight: wp(3),
    aspectRatio: 1 / 1,
  },
  title: {
    flex: 1,
    fontSize: wp(3.5),
    fontWeight: '700',
    color: '#444',
  },
});
