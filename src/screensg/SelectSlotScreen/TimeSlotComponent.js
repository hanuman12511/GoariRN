import React from 'react';
import {Text, View, TouchableHighlight, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TimeSlot = props => {
  const handleSelectTimeSlot = (data, index) => {
    props.SelectTimeSlot(data, index);
  };
  const styleIn =
    props.index === props.selectAlias
      ? styles.slotContainerStyle2
      : styles.slotContainerStyle;
  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => handleSelectTimeSlot(props.item, props.index)}>
      <View style={styleIn}>
        <Text style={styles.slotLabelStyle}>{props.item.slotdetail}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default TimeSlot;

const styles = StyleSheet.create({
  slotContainerStyle: {
    backgroundColor: '#999',
    padding: wp(2),
  },
  slotContainerStyle2: {
    backgroundColor: '#2bb256',
    padding: wp(2),
  },
  slotLabelStyle: {
    color: '#fff',
  },
});
