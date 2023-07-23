import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

export default CategoryComponent = props => {
  const [menucolor, setMenuColor] = useState(1);
  const {product, nav} = props;
  console.log('nav===', nav);
  return (
    <FlatList
      data={product}
      renderItem={({item}) => (
        <View style={{flex: 1, marginTop: 10}}>
          <TouchableOpacity
            onPress={() => {
              nav.navigate('singlescreen', item.brandName),
                setMenuColor(item.id);
            }}>
            <Text
              style={{
                padding: 10,
                borderRadius: 20,
                borderWidth: 1,
                marginLeft: 10,
                color: 'green',
                borderColor: 'green',
                backgroundColor: menucolor === item.id ? 'green' : 'white',
                color: menucolor === item.id ? 'white' : 'green',
              }}>
              {item.brandName}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={item => item.id}
      horizontal
    />
  );
};
