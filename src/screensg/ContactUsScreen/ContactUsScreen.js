import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Linking} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';
import ic_check from '../../asset/icons/ic_check.png';
import ic_close from '../../asset/icons/ic_close.png';
import ic_phone from '../../asset/icons/ic_phone.png';
import ic_email from '../../asset/icons/ic_email.png';
import ic_location_drawer from '../../asset/icons/ic_location_drawer.png';
import ic_chat from '../../asset/icons/whatsapp.png';
// Components
import HeaderComponent from '../AppComponent/HeaderComponent/';
import OrderListComponent from '../AppComponent/OrderListComponent';
import ProcessingLoader from '../AppComponent/ProcessingLoader';
import basicStyles from 'styles/BasicStyles';
//redux
import {connect} from 'react-redux';
import {appOperations, appSelectors} from 'data/redux/app';

class ContactUsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProcessing: true,
      contactInformation: '',
      message: '',
      orderList: [
        {
          statusIcon: ic_check,
          status: 'Delivered',
        },
        {
          statusIcon: ic_close,
          status: 'Cancelled',
        },
      ],
    };
  }

  componentDidMount() {
    this.handleContactInfo();
  }

  async UNSAFE_componentWillMount() {
    this._subscribe = this.props.navigation.addListener(
      'didFocus',
      async () => {
        this.handleContactInfo();
      },
    );
  }

  componentWillUnmount() {
    this._subscribe;
  }

  handleContactInfo = async () => {
    const params = null;
    await this.props.contactInfo(params).then(() => {
      const {success, message} = this.props.isContactInfo;
      if (success) {
        const {contactInformation} = this.props.isContactInfo;
        this.setState({contactInformation, isProcessing: false});
      } else {
        this.setState({contactInformation: '', message, isProcessing: false});
      }
    });
  };

  renderItem = ({item}) => (
    <OrderListComponent
      item={item}
      nav={this.props.navigation}
      refreshCallback={this.fetchMyOrders}
    />
  );

  keyExtractor = (item, index) => index.toString();

  itemSeparator = () => <View style={styles.separator} />;

  handleCheckout = () => {
    this.props.navigation.push('AddAddress');
  };

  handleOnCall = value => {
    console.log('value', value);
    Linking.openURL(`tel:${value}`);
  };
  handleWhatsAppChat = value => {
    console.log('value', value);

    let url = 'whatsapp://send?text=' + 'नमस्ते' + '&phone=91' + value;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };

  render() {
    const {
      accountName,
      accountNumber,
      address1,
      address2,
      address3,
      bankName,
      branch,
      contactEmail,
      factoryAddress,
      helplineNumber,
      ifsc,
      pincode1,
      pincode2,
      pincode3,
      registerAddress,
      smsMobile,
    } = this.state.contactInformation;
    return (
      <SafeAreaView style={styles.container}>
        <HeaderComponent
          navlogo="arrow-left"
          brandname=" सम्पर्क करे"
          alert=""
          location=""
          bookmark=""
          nav={this.props.navigation}
        />

        {this.state.contactInformation !== '' ? (
          <ScrollView>
            <View style={styles.cartListContainer}>
              <Text style={styles.heading}>संपर्क जानकारी</Text>
              <View style={styles.contactContainer}>
                <View>
                  <Text style={basicStyles.heading}>हेल्पलाइन नंबर</Text>
                  <View style={[styles.list]}>
                    <Image
                      source={ic_phone}
                      resizeMode="cover"
                      style={styles.contactIcons}
                    />
                    <Text
                      onPress={() => this.handleOnCall(helplineNumber)}
                      style={[
                        basicStyles.text,
                        {
                          borderBottomColor: '#1ba2de',
                          borderBottomWidth: 1,
                          marginLeft: wp(2),
                        },
                      ]}>
                      {helplineNumber}
                    </Text>
                  </View>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <Text style={basicStyles.heading}>ईमेल आईडी</Text>
                  <View style={[styles.list]}>
                    <Image
                      source={ic_email}
                      resizeMode="cover"
                      style={styles.contactIcons}
                    />
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      {contactEmail}
                    </Text>
                  </View>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <Text style={basicStyles.heading}>फैक्ट्री का पता</Text>
                  <View style={[styles.list]}>
                    <Image
                      source={ic_location_drawer}
                      resizeMode="cover"
                      style={styles.contactIcons}
                    />
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      {factoryAddress}
                    </Text>
                  </View>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <Text style={basicStyles.heading}>Registered Address</Text>
                  <View style={[styles.list]}>
                    <Image
                      source={ic_location_drawer}
                      resizeMode="cover"
                      style={styles.contactIcons}
                    />
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      {registerAddress}
                    </Text>
                  </View>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <Text style={basicStyles.heading}>व्हाट्स एप</Text>
                  <View style={[styles.list]}>
                    <Image
                      source={ic_chat}
                      resizeMode="cover"
                      style={styles.contactIcons}
                    />
                    <Text
                      onPress={() => this.handleWhatsAppChat(smsMobile)}
                      style={[
                        basicStyles.text,
                        {
                          borderBottomColor: '#1ba2de',
                          borderBottomWidth: 1,
                          marginLeft: wp(2),
                        },
                      ]}>
                      {smsMobile}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.cartListContainer}>
              <Text style={styles.heading}>
                पिन कोड द्वारा क्षेत्र का स्थान
              </Text>
              <View style={styles.contactContainer}>
                <View>
                  <View style={[styles.list2]}>
                    {/* <Image
                    source={ic_location_drawer}
                    resizeMode="cover"
                    style={styles.contactIcons2}
                  /> */}
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      <Text style={basicStyles.heading}>पता: </Text>
                      {address1}
                    </Text>
                  </View>
                  <Text style={basicStyles.heading}>पिन कोड: {pincode1}</Text>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <View style={[styles.list2]}>
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      <Text style={basicStyles.heading}>Address: </Text>
                      {address2}
                    </Text>
                  </View>
                  <Text style={basicStyles.heading}>पिन कोड: {pincode2}</Text>
                </View>

                <View style={basicStyles.separatorHorizontal} />

                <View>
                  <View style={[styles.list2]}>
                    <Text style={[basicStyles.text, basicStyles.flexOne]}>
                      <Text style={basicStyles.heading}>पता: </Text>
                      {address3}
                    </Text>
                  </View>
                  <Text style={basicStyles.heading}>पिन कोड: {pincode3}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cartListContainer}>
              <Text style={styles.heading}>बैंक विवरण</Text>
              <View style={styles.contactContainer}>
                <Text
                  style={[
                    basicStyles.text,
                    basicStyles.flexOne,
                    basicStyles.paddingBottom,
                  ]}>
                  <Text style={[basicStyles.heading, basicStyles.flexOne]}>
                    खाता नाम:{' '}
                  </Text>
                  {accountName}
                </Text>
                <Text
                  style={[
                    basicStyles.text,
                    basicStyles.flexOne,
                    basicStyles.paddingBottom,
                  ]}>
                  <Text style={[basicStyles.heading, basicStyles.flexOne]}>
                    बैंक का नाम:{' '}
                  </Text>
                  {bankName}
                </Text>
                <Text
                  style={[
                    basicStyles.text,
                    basicStyles.flexOne,
                    basicStyles.paddingBottom,
                  ]}>
                  <Text style={[basicStyles.heading, basicStyles.flexOne]}>
                    खाता संख्या:{' '}
                  </Text>
                  {accountNumber}
                </Text>
                <Text
                  style={[
                    basicStyles.text,
                    basicStyles.flexOne,
                    basicStyles.paddingBottom,
                  ]}>
                  <Text style={[basicStyles.heading, basicStyles.flexOne]}>
                    आईएफएससी (IFSC) कोड:{' '}
                  </Text>
                  {ifsc}
                </Text>
                <Text style={[basicStyles.text, basicStyles.flexOne]}>
                  <Text style={[basicStyles.heading, basicStyles.flexOne]}>
                    ब्रांच:{' '}
                  </Text>
                  {branch}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.eMessage}>
            <Text style={styles.txtMessage}>{this.state.message}</Text>
          </View>
        )}

        {this.state.isProcessing && <ProcessingLoader />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  isContactInfo: appSelectors.isContactInfo(state),
});
const mapDispatchToProps = {
  contactInfo: appOperations.contactInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(ContactUsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f1f1',
  },
  contactContainer: {
    backgroundColor: '#fff',
    padding: wp(3),
  },
  cartListContainer: {
    flex: 1,
    padding: wp(3),
    borderRadius: wp(2),
  },
  heading: {
    fontSize: wp(5),
    fontWeight: '700',
    marginBottom: wp(4),
  },
  contactIcons: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginRight: wp(2),
  },
  contactIcons2: {
    width: wp(4),
    aspectRatio: 1 / 1,
    marginTop: wp(1),
    marginRight: wp(2),
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: wp(2),
    flex: 1,
  },
  list2: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: wp(2),
    flex: 1,
  },
  eMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtMessage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
