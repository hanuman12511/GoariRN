import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
//redux
import {connect} from 'react-redux';
import {walletOperations, walletSelectors} from 'data/redux/wallet';

// Components
import HeaderComponent from '../AppComponent/HeaderComponent';
import OfferListContainer from './OfferListContainer';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Images
import logoIcon from '../../asset/images/logoIcon.webp';

class OfferZoneScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: true,
      isListRefreshing: false,
      coupons: '',
      offers: [
        {
          title: 'बिनोला खली',
        },
        {
          title: 'मोटा काकड़ा',
        },
      ],
    };
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'focus',
      () => {
        this.handleCouponsData();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription();
  }
  handleCouponsData = async () => {
    const params = null;
    await this.props.viewCoupons(params).then(() => {
      const {success, message} = this.props.isCouponList;
      if (success) {
        const {coupons} = this.props.isCouponList;
        this.setState({coupons, isListRefreshing: false, isProcessing: false});
      } else {
        this.setState({
          coupons: '',
          message,
          isListRefreshing: false,
          isProcessing: false,
        });
      }
    });
  };
  handleListRefresh = async () => {
    try {
      // pull-to-refresh
      this.setState({isListRefreshing: true});

      // updating list
      this.handleCouponsData();
    } catch (error) {
      console.log(error.message);
    }
  };
  renderItem = ({item}) => (
    <OfferListContainer item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" ऑफर्स"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        {this.state.coupons !== '' ? (
          <View style={styles.mainContainer}>
            <Image
              source={logoIcon}
              resizeMode="cover"
              style={styles.logoIcon}
            />

            <FlatList
              data={this.state.coupons}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.eMessage}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isListRefreshing}
                onRefresh={this.handleListRefresh.bind(this)}
              />
            }>
            <Text style={styles.txtMessage}>{this.state.message}</Text>
          </ScrollView>
        )}

        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isCouponList: walletSelectors.isCouponList(state),
});

const mapDispatchToProps = {
  viewCoupons: walletOperations.viewCoupons,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferZoneScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  mainContainer: {
    flex: 1,
  },
  logoIcon: {
    width: wp(20),
    aspectRatio: 1 / 1,
    alignSelf: 'center',
  },
  separator: {
    height: wp(2),
  },
  listContainer: {
    padding: wp(2),
  },
  messageContainer: {
    flex: 1,
    padding: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    color: '#000',
    fontSize: wp(3.5),
    textAlign: 'center',
  },
  eMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMessage: {
    fontFamily: 'OpenSans-Bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
