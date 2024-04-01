import React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  StatusBar,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Constants from '../constants/Constants';
import NetInfo from '@react-native-community/netinfo';
const { width, height } = Dimensions.get('window');
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_code: '',
      national_id: '',
      borderstudent_code: '#bdc1c6',
      bordernational_id: '#bdc1c6',
      secure: true,
      // modalVisible: false,
      // text_wrong: "",
      connection_Status: 'Online',
      loading_buttom: false,
    };
  }

  componentDidMount() {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected == true) {
        this.setState({
          connection_Status: 'Online',
        });
      } else {
        this.setState({
          connection_Status: 'Offline',
        });
      }
    });
  }

  function_national_id(pass) {
    if (this.state.national_id.length <= 4 && pass.length < 4) {
      this.setState({ bordernational_id: 'red' });
      if (pass == '') {
        this.setState({ bordernational_id: '#bdc1c6' });
      }
    } else {
      this.setState({ bordernational_id: '#bdc1c6' });
    }
  }
  function_student_code(text_student_code) {
    if (this.state.student_code <= 5 && text_student_code != '') {
      this.setState({ borderstudent_code: 'red' });
      if (text_student_code == '') {
        this.setState({ borderstudent_code: '#bdc1c6' });
      }
    } else {
      this.setState({ borderstudent_code: '#bdc1c6' });
    }
  }

  async setDate(data) {
    let arr = []
    arr.push(data)
    await AsyncStorage.setItem('AllData', JSON.stringify(data));
    await AsyncStorage.setItem("student_arr", JSON.stringify(arr))

    await AsyncStorage.setItem('switch', 'Home');
    this.props.navigation.navigate('AppSwitch');
  }

  check() {
    if (this.state.connection_Status == 'Online') {
      if (this.state.national_id == "" && this.state.student_code == "") {
        ToastAndroid.showWithGravityAndOffset(
          'You Must Enter  Data',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          20,
          20,
        );
      } else {
        this.setState({ loading_buttom: true });
        let DataToSend = {
          student_id: this.state.student_code,
          N_id: this.state.national_id,
        };

        axios
          .post(Constants.Domain + 'signin.php', DataToSend)
          .then(res => {
            // console.log(res.data)
            if (res.status == 200) {
              if (res.data == 'data_is_not_correct') {
                ToastAndroid.showWithGravityAndOffset(
                  'You Must Enter Correct Data',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  20,
                  20,
                );
              } else if (res.data == 'can_not_login') {
                // this.setState({ text_wrong: "لا تستطيع الدخول حاليا", modalVisible: true })
                ToastAndroid.showWithGravityAndOffset(
                  "You Can't Login Right Now",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  20,
                  20,
                );
              } else if (res.data == 'error') {
                // this.setState({ text_wrong: "حدث خطأ ما ", modalVisible: true })
                ToastAndroid.showWithGravityAndOffset(
                  'Something Error',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM,
                  20,
                  20,
                );
              } else {
                this.setDate(res.data);

              }
            }
            this.setState({ loading_buttom: false });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // }
    } else {
      ToastAndroid.showWithGravityAndOffset(
        'No Internet Connection',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        20,
        20,
      );
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <StatusBar
          backgroundColor="#3c2365"
          barStyle="light-content"></StatusBar>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            // backgroundColor: '#255'
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              height: height / 3,
              alignSelf: 'center',
              width: '95%',
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <Image
              source={require('../photo/AppLogoPurple.png')}
              style={{ height: height, width: '90%', resizeMode: 'contain' }}
            />
          </View>

          <View
            style={{
              height: height / 3,
              width: '100%',
              // backgroundColor:'#528'
            }}>
            <TextInput
              style={{
                backgroundColor: '#fff',
                height: 70,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                margin: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: this.state.borderstudent_code,
                color: '#000',
              }}
              placeholder="Student ID"
              placeholderTextColor="#777"
              keyboardType="number-pad"
              value={this.state.student_code}
              onChangeText={value => {
                this.setState({ student_code: value });
                this.function_student_code(value);
              }}
            />

            <View
              style={{
                backgroundColor: '#fff',
                height: 70,
                width: '90%',
                alignSelf: 'center',
                borderRadius: 10,
                margin: 10,
                padding: 10,
                borderColor: this.state.bordernational_id,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>

              <TextInput
                style={{
                  backgroundColor: '#fff',
                  height: '100%',
                  width: '90%',
                  borderRadius: 10,
                  // alignItems: "flex-end",
                  color: '#000',
                }}
                secureTextEntry={this.state.secure ? true : false}
                placeholder="Password"
                placeholderTextColor="#777"
                keyboardType="number-pad"
                value={this.state.national_id}
                onChangeText={value => {
                  this.setState({ national_id: value });
                  this.function_national_id(value);
                }}
              />
              {this.state.secure ? (
                <TouchableOpacity
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.setState({ secure: false });
                  }}>
                  <Icon
                    name="eye-slash"
                    style={{ fontSize: 20, color: '#777' }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '10%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    this.setState({ secure: true });
                  }}>
                  <Icon name="eye" style={{ fontSize: 20, color: '#777' }} />
                </TouchableOpacity>
              )}









            </View>

            <View
              style={{
                height: 100,
                // backgroundColor: '#ff1',
                width: '95%',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.check();
                }}
                style={{
                  backgroundColor: '#3c2365',
                  height: 70,
                  width: '40%',
                  // alignSelf: 'flex-end',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.loading_buttom ? (
                  <ActivityIndicator size={30} color={'#fff'} />
                ) : (
                  <Text
                    style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 50,
                // width: '95%',
                // backgroundColor: '#845',
                alignSelf: 'center',
              }}>


              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Reach_up');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: "#485",
                  // borderBottomWidth: 1,
                  marginTop: 10
                }}>
                <Icon
                  name="share-square"
                  style={{ fontSize: 15, color: '#000' }}
                />
                <Text style={{ color: '#000', fontSize: 18, textDecorationLine: "underline" }}>
                  About  Academey
                </Text>
              </TouchableOpacity>











              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Camp_coding');
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderBottomWidth: 1,
                }}>
                <Icon
                  name="share-square"
                  style={{ fontSize: 15, color: '#000', }}
                />
                <Text style={{ color: '#000', fontSize: 18, textDecorationLine: "underline" }}>
                  Developed By Camp Coding {''}
                </Text>
              </TouchableOpacity>


            </View>
          </View>
        </View>
      </View>
    );
  }
}
