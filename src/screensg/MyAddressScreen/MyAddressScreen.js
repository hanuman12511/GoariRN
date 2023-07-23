import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
//import Header from 'components/HeaderComponent';
import MyAddressListComponent from './MyAddressListComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';

// Icons
import ic_add from '../../asset/icons/ic_add.png';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import get from 'loadsh/get';
class MyAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      isProcessing: true,
    };
  }

  // 'didFocus'
  UNSAFE_componentWillMount = async () => {
    const navi = get(this.props, 'navigation.addListener');
    this._subscribe = navi('focus', async () => {
      this.handleUserAddress();
    });
  };

  componentDidMount() {
    this.handleUserAddress();
  }

  componentWillUnmount() {
    this._subscribe;
  }

  handleUserAddress = async () => {
    try {
      const params = null;
      await this.props.viewAddress(params).then(() => {
        const {success, message} = this.props.isAddressView;
        if (success) {
          const {useraddress} = this.props.isAddressView;
          this.setState({products: useraddress, isProcessing: false});
        } else {
          this.setState({products: [], message, isProcessing: false});
        }
      });
    } catch (error) {}
  };

  deleteAddressCallback = async id => {
    // console.log('address delete', id);
    const params = {id};
    await this.props.deleteAddress(params).then(() => {
      const {success, message} = this.props.isAddressDeleted;
      if (success) {
        this.handleUserAddress();
        Alert.alert('', message);
      } else {
        Alert.alert('', message);
      }
    });
  };

  renderItem = ({item}) => (
    <MyAddressListComponent
      item={item}
      nav={this.props.navigation}
      deleteAddressCallback={this.deleteAddressCallback}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleAddAddress = () => {
    this.props.navigation.push('Add Address');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          {/* <Header
            title="मेरा पता"
            nav={this.props.navigation}
            showNotificationIcon
            navAction="back"
          /> */}
          <TouchableHighlight
            onPress={this.handleAddAddress}
            underlayColor="#ffffff80">
            <View style={styles.row}>
              <Image source={ic_add} resizeMode="cover" style={styles.icon} />
              <Text style={styles.text}>नया पता जोड़ें</Text>
            </View>
          </TouchableHighlight>
          {this.state.products.length !== 0 ? (
            <FlatList
              data={this.state.products}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={this.itemSeparator}
              contentContainerStyle={styles.listContainer}
              refreshing={this.state.isListRefreshing}
              onRefresh={this.handleListRefresh}
            />
          ) : (
            <View style={styles.errorMsg}>
              <Text style={styles.errorTxt}>{this.state.message}</Text>
            </View>
          )}
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isAddressView: profileSelectors.isAddressView(state),
  isAddressDeleted: profileSelectors.isAddressDeleted(state),
});
const mapDispatchToProps = {
  viewAddress: profileOperations.viewAddress,
  deleteAddress: profileOperations.deleteAddress,
  addAddress: profileOperations.addAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyAddressScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  separator: {
    height: wp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(3),
    marginTop: wp(2),
  },
  alignItems: {
    alignItems: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  bold: {
    fontWeight: '700',
  },
  text: {
    fontSize: wp(3.5),
  },
  color: {
    color: '#0b8457',
  },
  icon: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(3),
    marginLeft: wp(3),
  },
  // listContainer: {
  //   padding: wp(2),
  // },
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
  errorMsg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTxt: {
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
});
