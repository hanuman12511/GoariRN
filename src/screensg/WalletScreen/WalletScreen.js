import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Alert,
  // TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import HeaderComponent from '../AppComponent/HeaderComponent';
import WalletListItemComponents from './WalletListItemComponents';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Icons
import ic_wallet_white from '../../asset/icons/ic_wallet_white.png';
// import ic_plus from 'assets/icons/ic_add_green.png';
import {KEYS, getData} from 'api/UserPreference';

import {connect} from 'react-redux';
import {walletOperations, walletSelectors} from 'data/redux/wallet';
import get from 'loadsh/get';
class WalletOptionScreen extends Component {
  constructor(props) {
    super(props);
    this.navi = get(this.props, 'navigation.addListener');

    this.state = {
      UserInfo: null,

      isProcessing: true,
      walletBalance: 0,
      minimum_recharge_amount: 0,
      income: '',
      message: '',
      walletTransaction: [
        {
          title: 'बिनोला खली',
        },
        {
          title: 'बिनोला खली',
        },
      ],
    };
  }

  UserLogin() {
    const {UserInfo} = this.state;

    if (UserInfo !== null) {
    } else {
      Alert.alert(
        '',
        'आप ऐप में लॉगइन नहीं हैं, कृपया लॉगइन करें',
        [
          {text: 'NO', style: 'cancel'},
          {text: 'LOGIN', onPress: this.handleLogin},
        ],
        {
          cancelable: false,
        },
      );
    }
  }

  componentDidMount = async () => {
    this._subscribe = this.navi('focus', async () => {
      this.showWalletIncome();

      const userInfo = await getData(KEYS.USER_INFO);

      this.setState({
        UserInfo: userInfo,
      });
      this.UserLogin();
    });
  };

  // // 'didFocus'
  // UNSAFE_componentWillMount = async () => {};

  componentWillUnmount() {
    this._subscribe();
  }

  showWalletIncome = async () => {
    const params = null;
    await this.props.walletIncome(params).then(() => {
      const {success, message} = this.props.isWalletIncome;
      if (success) {
        const {income, wallet} = this.props.isWalletIncome;
        this.setState({walletBalance: wallet, income, isProcessing: false});
      } else {
        this.setState({
          walletBalance: 0,
          income: '',
          message,
          isProcessing: false,
        });
      }
    });
  };
  renderItem = ({item}) => (
    <WalletListItemComponents item={item} nav={this.props.navigation} />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  // handleAddWalletAmount = () => {
  //   const {minimum_recharge_amount} = this.state;
  //   const miniAmount = minimum_recharge_amount;
  //   this.props.navigation.navigate('Recharge Wallet', {miniAmount});
  // };

  handleLogin = async () => {
    this.props.navigation.navigate('login');
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" उत्पाद"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <View style={styles.mainContainer}>
          <View style={styles.wallet}>
            <Image
              source={ic_wallet_white}
              resizeMode="cover"
              style={styles.walletIcon}
            />
            <Text style={styles.walletAmountTitle}>वॉलेट राशि</Text>
            <Text style={styles.walletAmount}>
              ₹ {this.state.walletBalance}
            </Text>
          </View>
          {this.state.income !== '' ? (
            <View style={styles.flexOne}>
              <FlatList
                data={this.state.income}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={this.itemSeparator}
                contentContainerStyle={styles.listContainer}
              />
            </View>
          ) : (
            <View style={styles.errorMsg}>
              <Text style={styles.errorTxt}>{this.state.message}</Text>
            </View>
          )}
        </View>

        {/* <TouchableHighlight
          onPress={this.handleAddWalletAmount}
          underlayColor="transparent"
          style={styles.addWallet}>
          <Image source={ic_plus} resizeMode="cover" style={styles.addIcon} />
        </TouchableHighlight> */}
        {this.state.isProcessing && <ProcessingLoader />}
        {/*   <Footer nav={this.props.navigation} /> */}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  isWalletIncome: walletSelectors.isWalletIncome(state),
});
const mapDispatchToProps = {
  walletIncome: walletOperations.walletIncome,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletOptionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  walletIcon: {
    height: hp(6),
    aspectRatio: 1 / 1,
    marginBottom: hp(0.5),
  },
  themeTextColor: {
    color: '#2bb256',
  },
  orangeColor: {
    color: '#ff7800',
  },
  borderSeparator: {
    backgroundColor: '#ccc',
    height: 1,
    marginVertical: hp(0.5),
  },
  mainContainer: {
    flex: 1,
    padding: wp(2),
  },
  wallet: {
    backgroundColor: 'green',
    height: hp(20),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletAmountTitle: {
    fontSize: wp(4),
    color: '#fff',
  },
  walletAmount: {
    fontSize: wp(4.5),
    fontWeight: '700',
    marginTop: hp(1),
    color: '#fff',
  },
  text: {
    fontSize: wp(3.5),
  },
  description: {
    fontSize: wp(3),
    color: '#444',
  },
  listContainer: {
    paddingVertical: wp(2),
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
  separator: {
    height: wp(2),
  },
  addWallet: {
    bottom: hp(9),
    right: hp(1.5),
    position: 'absolute',
  },
  addIcon: {
    height: hp(7),
    aspectRatio: 1 / 1,
  },
  errorMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTxt: {
    fontWeight: '700',
  },
});
