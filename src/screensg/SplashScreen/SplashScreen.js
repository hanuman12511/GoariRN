import React, {PureComponent} from 'react';
import {View, Animated, StyleSheet, ImageBackground} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Images
import appLogo from '../../asset/logo/appIcon.png';

export default class SplashScreen extends PureComponent {
  state = {
    opacity: new Animated.Value(0),
  };

  handleAnimation = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const animatedImageStyle = [
      {
        opacity: this.state.opacity,
        transform: [
          {
            scale: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0.85, 1],
            }),
          },
        ],
      },
      {
        width: 200,
        height: 200,
      },
    ];

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.Image
          source={appLogo}
          resizeMode="cover"
          onLoad={this.handleAnimation}
          style={animatedImageStyle}
        />
      </View>
    );
  }
}
