import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

// Components
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import TimeSlotComponent from './TimeSlotComponent';
import AliasSlotComponent from './AliasSlotComponent';

import HeaderComponent from '../AppComponent/HeaderComponent';

// redux
import {connect} from 'react-redux';
import {profileOperations, profileSelectors} from 'data/redux/profile';
import {cartOperations, cartSelectors} from 'data/redux/cart';
import get from 'loadsh/get';
class SelectSlotScreen extends Component {
  constructor(props) {
    super(props);
    const amountData = get(props.route, 'params.amountData');
    this.navi = get(this.props, 'navigation.addListener');
    this.state = {
      ...amountData,
      products: '',
      slotDate: '',
      isProcessing: true,
      message: '',
      sltTime: '',
      selectAlias: null,
      slotTimeIn: null,
      slots: [
        {
          day: 'सोमवार',
          alias: 'आज',
        },
      ],
      slotsTime: [
        {
          time: '10 बजे से 12 बजे तक',
        },
      ],
    };
  }
  // 'didFocus'
  UNSAFE_componentWillMount = async () => {};
  componentDidMount() {
    this._subscribe = this.navi('focus', async () => {
      this.handleUserAddress();
      this.showOrderSlots();
    });
  }
  componentWillUnmount() {
    this._subscribe();
  }

  handleUserAddress = async () => {
    try {
      const product = get(this.props.route, 'params.address');
      if (product !== undefined) {
        this.setState({products: product[0], isProcessing: false});
      } else {
        const params = null;
        await this.props.viewAddress(params).then(() => {
          const {success, message} = this.props.isAddressView;
          if (success) {
            const {useraddress} = this.props.isAddressView;
            this.setState({products: useraddress[0], isProcessing: false});
          } else {
            this.setState({products: [], message, isProcessing: false});
          }
        });
      }
    } catch (error) {}
  };

  showOrderSlots = async () => {
    try {
      const params = null;
      await this.props.showSlots(params).then(() => {
        const {success, message} = this.props.isShowSlots;
        if (success) {
          const {slots} = this.props.isShowSlots;
          this.setState({slots, isProcessing: false});
        } else {
          this.setState({slots: [], message, isProcessing: false});
        }
      });
    } catch (error) {}
  };

  renderItem = ({item, index}) => {
    const selectTimeData = (data, value) => {
      this.setState({
        slotsTime: data.slotDetails,
        slotDate: data.date,
        selectAlias: value,
      });
    };
    return (
      <AliasSlotComponent
        item={item}
        index={index}
        selectAlias={this.state.selectAlias}
        nav={this.props.navigation}
        selectTimeSlot={selectTimeData}
      />
    );
  };

  renderItem2 = ({item, index}) => {
    const handleSlots = (data, value) => {
      this.setState({sltTime: data, slotTimeIn: value});
    };
    return (
      <TimeSlotComponent
        item={item}
        index={index}
        selectAlias={this.state.slotTimeIn}
        nav={this.props.navigation}
        SelectTimeSlot={handleSlots}
      />
    );
  };

  keyExtractor = (item, index) => item.id;

  itemSeparator = () => <View style={styles.separator} />;

  handlePayment = () => {
    const {
      sltTime,
      products,
      totalAmount,
      walletAmount,
      slotDate,
      selectedState,
    } = this.state;
    const payData = {
      sltTime,
      products,
      totalAmount,
      walletAmount,
      slotDate,
      selectedState,
    };
    if (products.length === 0) {
      Alert.alert(
        '',
        'कृपया अपने पशु आहार डिलीवरी का स्थान चुनें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    if (sltTime.slotdetail_id === undefined) {
      Alert.alert(
        '',
        'कृपया अपने पशु आहार की डिलीवरी का समय चुनें !',
        [{text: 'OK'}],
        {
          cancelable: false,
        },
      );
      return;
    }
    this.props.navigation.navigate('Payment Options', {payData});
  };

  handleAddressChange = () => {
    this.props.navigation.navigate('My Address');
  };

  render() {
    const {products, slotsTime} = this.state;
    if (products.length !== 0) {
      var {address_type, name, address} = products;
    }
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" समय चुने"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />
        <View style={styles.mainContainer}>
          <View style={[styles.userInfo, styles.row]}>
            {products.length !== 0 ? (
              <View style={styles.infoContainer}>
                <Text style={styles.heading}>{address_type}</Text>
                <Text style={styles.description}>{name}</Text>
                <Text style={styles.description}>{address}</Text>
              </View>
            ) : null}

            <TouchableHighlight
              onPress={this.handleAddressChange}
              underlayColor="#ffffff80"
              style={styles.button}>
              <Text style={styles.buttonText}>पता बदलें</Text>
            </TouchableHighlight>
          </View>

          <Text style={styles.heading}>इस पते के लिए डिलीवरी का समय चुनें</Text>
          {this.state.slots.length !== 0 ? (
            <View style={styles.deliverySlotsContainer}>
              <View style={styles.deliverySlotsDayContainer}>
                <FlatList
                  data={this.state.slots}
                  renderItem={this.renderItem}
                  horizontal
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.itemSeparator}
                  contentContainerStyle={styles.listContainer}
                  extraData={this.state.selectAlias}
                />
              </View>
              <View style={styles.slots}>
                <FlatList
                  data={this.state.slotsTime}
                  renderItem={this.renderItem2}
                  keyExtractor={this.keyExtractor}
                  showsVerticalScrollIndicator={false}
                  ItemSeparatorComponent={this.itemSeparator}
                  contentContainerStyle={styles.listContainer}
                  extraData={this.state.slotTimeIn}
                />
              </View>
            </View>
          ) : (
            <View style={styles.errorMsg}>
              <Text style={styles.errorTxt}>{this.state.message}</Text>
            </View>
          )}

          <TouchableHighlight
            onPress={this.handlePayment}
            underlayColor="#2bb25680"
            style={styles.saveButton}>
            <Text style={styles.saveButtonText}>भुगतान करने की प्रक्रिया</Text>
          </TouchableHighlight>
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isAddressView: profileSelectors.isAddressView(state),
  isShowSlots: cartSelectors.isShowSlots(state),
});
const mapDispatchToProps = {
  viewAddress: profileOperations.viewAddress,
  showSlots: cartOperations.showSlots,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectSlotScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  mainContainer: {
    flex: 1,
    padding: wp(2),
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: wp(2),
    marginBottom: hp(2),
  },
  infoContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: wp(1),
  },
  deliverySlotsContainer: {
    flex: 1,
  },
  heading: {
    fontSize: wp(3.5),
    marginBottom: wp(2),
  },
  day: {
    fontSize: wp(3),
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subHeading: {
    fontSize: wp(2.5),
    textAlign: 'center',
  },
  description: {
    fontSize: wp(3),
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(1),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    marginRight: wp(2),
  },
  buttonText: {
    fontSize: wp(3),
    color: '#333',
  },
  dayTab: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    // backgroundColor: '#f2f1f1',
    padding: wp(2),
  },
  deliverySlotsDayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  active: {
    backgroundColor: '#2bb256',
    borderBottomWidth: 1,
    borderBottomColor: '#00832a',
  },
  activeText: {
    color: '#fff',
  },
  listContainer: {
    paddingVertical: wp(2),
  },
  separator: {
    height: wp(2),
  },
  saveButton: {
    backgroundColor: 'green',
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: wp(4),
    color: '#fff',
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
