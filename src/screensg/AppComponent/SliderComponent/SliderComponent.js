import React from 'react';
import {View, Text} from 'react-native';

import {SliderBox} from 'react-native-image-slider-box';
export default SliderComponent = props => {
  const {sliders} = props;

  return (
    <SliderBox
      images={sliders}
      sliderBoxHeight={200}
      onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      ImageComponentStyle={{
        borderRadius: 15,
        width: '90%',
        marginTop: 0,
      }}
      dotColor="green"
      inactiveDotColor="#90A4AE"
      paginationBoxVerticalPadding={20}
      autoplay
      circleLoop
      resizeMethod={'resize'}
      resizeMode={'cover'}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'rgba(128, 128, 128, 0.92)',
      }}
      imageLoadingColor="#2196F3"
    />
  );
};
