import React from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AliasSlotComponent = props => {
  const handleTimeSlots = (data, index) => {
    props.selectTimeSlot(data, index);
  };
  const styleIn =
    props.index === props.selectAlias
      ? styles.slotContainerStyle2
      : styles.slotContainerStyle;
  return (
    <View>
      <TouchableHighlight
        underlayColor="transparent"
        onPress={() => handleTimeSlots(props.item, props.index)}>
        <View style={styleIn}>
          <Text style={styles.slotLabelStyleH}>{props.item.day}</Text>
          <Text style={styles.slotLabelStyle}>{props.item.date}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default AliasSlotComponent;

const styles = StyleSheet.create({
  slotContainerStyle: {
    backgroundColor: '#ccc8',
    padding: wp(2),
    marginRight: wp(2),
  },
  slotContainerStyle2: {
    backgroundColor: '#2bb256',
    padding: wp(2),
    marginRight: wp(2),
  },
  slotLabelStyleH: {
    fontSize: wp(3.5),
    fontWeight: '700',
  },
  slotLabelStyle: {
    fontSize: wp(3),
    textAlign: 'center',
  },
});
