import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  StatusBar,
  Modal,
  ToastAndroid,
  FlatList,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Constants from '../constants/Constants';
import {ActivityIndicator} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

const {width, height} = Dimensions.get('window');
export default class Accounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NoticeModal: false,
      student_id: this.props.navigation.getParam('student_id'),
      Payment_History: [
        // {
        //     Month: "January",
        //     Amount: 5000,
        //     Notice: "تم سداد المبلغ المطلوب مع العلم بخصم 10% من كل المبلغ",
        // },
        // {
        //     Month: "Fabrauray",
        //     Amount: 4500,
        //     Notice: ""
        // },
      ],
      Notice: '',
      disable: false,
      EmptyMessage: '',
      modalVisible: false,
      payment_title: '',
      payment_title_Message: '',
      payment_note: '',
      payment_note_Message: '',
      money_paid: '',
      money_paid__Message: '',
      loading: false,
      connection_Status: 'Online',
    };
  }
  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        this.setState({
          connection_Status: 'Online',
        });

        let student_id = 2;
        //  this.props.navigation.getParam("student_id")
        // alert(student_id)
        this.setState({student_id: student_id});
        this.getPayments();
      } else {
        this.setState({
          connection_Status: 'Offline',
        });
      }
    });
  }
  getPayments() {
    this.setState({loading: true});

    let DataToSend = {
      student_id: this.props.navigation.getParam('student_id'),
    };
    axios
      .post(Constants.Domain + 'select_student_payments.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          // alert(JSON.stringify(res.data))
          if (Array.isArray(res.data)) {
            this.setState({Payment_History: res.data, loading: false});
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Something Error',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              20,
              20,
            );
          }
        }
      });
  }

  renderPayment = ({item, index}) => {
    return (
      <>
        <View
          style={{
            height: height * 0.15,
            //  borderTopWidth:3,
            //  borderTopColor:"#999",
            borderBottomColor: '#999',
            borderBottomWidth: 1,
            elevation: 2,
            padding: 15,
            paddingRight: '5%',

            width: width,
            alignSelf: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{height: '100%', width: '50%', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  marginTop: 5,
                }}>
                {item.payment_title}
              </Text>
              <View
                style={{
                  height: '70%',
                  // width:"100%",
                  // backgroundColor: "#ff0",
                  justifyContent: 'center',
                }}>
                {item.notes == '' ? (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#f00'}}>No Notes</Text>
                  </View>
                ) : (
                  <Text style={{fontWeight: 'bold'}}>
                    {' '}
                    Note :{item.notes}
                  </Text>
                )}
              </View>
            </View>

            <View style={{height: '100%', width: '50%', alignItems: 'center'}}>
              <View style={{flexDirection: 'row', marginTop: '2%'}}>
                <Text
                  style={{fontSize: 16, fontWeight: '400', marginTop: '2%'}}>
                  Payment Value:
                </Text>
                <Text
                  style={{
                    fontSize: 19,
                    color: '#f8bb08',
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  {item.money_paid + ' '}
                </Text>
              </View>
              <Text style={{marginTop: '2%'}}>{item.date}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  render() {
    return (
      <>
        {/*///////////////////////////////////////////////////////// Header /////////////////////////////////////////////////////// * */}
        <View style={styles.HeaderView}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#F5FCFF', fontSize: 17, fontWeight: 'bold'}}>
              Accounts
            </Text>
          </View>
        </View>

        {/*///////////////////////////////////////////////////////// Content /////////////////////////////////////////////////////// * */}
        {/* <View style={{ flex: 1 }}> */}

        {this.state.connection_Status == 'Online' ? (
          this.state.loading ? (
            <>
              <View
                style={{
                  width: width,
                  height: height - 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size={40} />
              </View>
            </>
          ) : this.state.Payment_History.length == 0 ? (
            <View
              style={{
                width: width,
                height: height - 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#777',
                }}>
                No Payments Yet
              </Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={true}
              data={this.state.Payment_History}
              renderItem={this.renderPayment}
              keyExtractor={(i, k) => k.toString()}
            />
          )
        ) : (
          <View
            style={{
              width: width,
              height: height - 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                color: '#777',
              }}>
              No Internet Connection
            </Text>
          </View>
        )}

        {/* </View> */}

        {/*//////////////////////////////////////////////// Notice Modal //////////////////////////////////////////* */}

        <Modal visible={this.state.NoticeModal} transparent={true}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                width: width * 0.9,
                height: height * 0.3,
                // height: height * 0.25,
                backgroundColor: '#fff',
                borderRadius: 25,
                alignSelf: 'center',
                // marginTop: 15,
                // alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12,
              }}>
              <View style={{padding: 10}}>
                <TouchableOpacity
                  style={{width: '10%', marginLeft: 5}}
                  onPress={() => {
                    this.setState({
                      NoticeModal: false,
                    });
                  }}>
                  <FontAwesome5 name="times" size={30} />
                </TouchableOpacity>
              </View>

              {this.state.Notice != '' ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    width: '70%',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {this.state.Notice}
                </Text>
              ) : (
                <Text
                  style={{
                    alignSelf: 'center',
                    width: '70%',
                    fontWeight: 'bold',
                    fontSize: 20,
                    alignSelf: 'center',
                  }}>
                  No Notes
                </Text>
              )}
            </View>
          </View>
        </Modal>
        {/*////////////////////////////////////////////////////////Add Payment /////////////////////////////////////////* */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  AccountsStyle: {
    height: '50%',
    //  borderTopWidth:3,
    //  borderTopColor:"#999",
    borderBottomColor: '#999',
    borderBottomWidth: 1,
    elevation: 2,
    padding: 15,
  },
  TextStyle2: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  HeaderView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3c2365',
    // elevation: 22
  },
  TextInputStyle: {
    // flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    width: '90%',
    marginBottom: '3%',
  },
});
