import React, {Component} from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {WebView} from 'react-native-webview';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import get from 'loadsh/get';
// Components
import HeaderComponent from '../AppComponent/HeaderComponent';
import FaqAns from './FaqAnsListComponent';

export default class ReferScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      isProcessing: true,
    };
  }

  componentDidMount() {
    this.setState({
      isProcessing: false,
    });
  }
  listItem = ({item}) => <FaqAns item={item} nav={this.props.navigation} />;

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    const answer = get(this.props.route, 'params.answer');

    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" सामान्य उत्तर"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <View style={{flex: 1}}>
          <WebView source={{html: `${answer}`}} />
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: wp(3),
  },

  heading: {
    fontSize: wp(4),
    fontWeight: '700',
    color: '#192423',
    marginBottom: wp(2),
  },

  text: {
    fontSize: wp(3.2),
    fontWeight: '400',
    color: '#666',
    textAlign: 'justify',
  },
});
