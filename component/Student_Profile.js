import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  Modal,
  Linking,
  AsyncStorage,
  // Button
  TouchableWithoutFeedback,
} from 'react-native';
// import {Container, Fab, Icon, Button} from 'native-base';
// import { TextInput } from 'react-native-paper'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import Picker from '@react-native-picker/picker'
// import { Hoshi } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import react from 'react';
// import { color } from 'native-base/lib/typescript/theme/styled-system';
import axios from 'axios';
import Constants from '../constants/Constants';
const { width, height } = Dimensions.get('window');

export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      classes: [],
      // student_name: "امنيه ",
      // parent_phone: "01223490505",
      // Group_Name: "المجموعه الاولي",
      // class_name: "المستوي الاول",
      // student_id: "4555",
      student_data: [],
      active: false,
      generation: [],
      collection: [],
      payment: true,
      modalVisible1: false,
    };
  }
  async componentDidMount() {
    // alert(JSON.stringify(this.state.payment))
    let data = JSON.parse(await AsyncStorage.getItem('AllData'));
    // alert(JSON.stringify(data))
    this.setState({
      student_data: data,
      generation: data.generation,
      collection: data.collection_data,
    });

    setTimeout(() => {
      this.get_unpaid_student();
      // this.paid_fun()
    }, 400);

    // alert(JSON.stringify(this.state.student_data));
  }

  get_unpaid_student() {
    let DataToSend = {
      student_id: this.state.student_data.student_id,
    };
    // parent/select_paid_status.php
    axios
      .post(Constants.Domain + 'select_paid_status.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          if (res.data != 'error') {
            let payment = res.data.paid;
            if (payment == false) {
              this.setState({ modalVisible1: true, payment: payment });
            } else {
              this.setState({ modalVisible1: false, payment: payment });
            }
            // this.setState({payment: payment});
            //  console.log( JSON.stringify(res.data.paid))
          }
        }
      });
  }



  render() {
    return (
      <>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <ScrollView>
            <StatusBar
              backgroundColor={'#3c2365'}
              barStyle="light-content"></StatusBar>
            <View
              style={{
                height: 60,
                backgroundColor: '#3c2365',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{ color: '#F5FCFF', fontSize: 17, fontWeight: 'bold' }}>
                Student Profile
              </Text>
            </View>

            <View
              style={{ height: '100%', width: '100%', backgroundColor: '#fff' }}>
              <View
                style={{
                  height: 120,
                  width: '100%',
                  backgroundColor: '#eee',
                  marginVertical: 10,
                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {this.state.student_data.gender == 'male' ? (
                  <Image
                    resizeMode={'contain'}
                    style={{ height: 80, width: 110 }}
                    source={require('../photo/boy.png')}
                  />
                ) : (
                  <Image
                    resizeMode={'contain'}
                    style={{ height: 80, width: 110 }}
                    source={require('../photo/girl.png')}
                  />
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width: "70%",
                    // backgroundColor: "#414"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      alignSelf: "center",
                      color: '#000',
                    }}>
                    {this.state.student_data.student_name}
                  </Text>

                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      color: '#3aa514',
                      //   fontWeight: 'bold',
                    }}>
                    {' '}
                    {this.state.generation.generation_name}
                  </Text>

                  <Text
                    style={{
                      alignSelf: 'center',
                      //   fontSize: 15,
                      color: '#767',
                      //   fontWeight: 'bold',
                    }}>
                    {' '}
                    {this.state.collection.collection_name}
                  </Text>
                  <Text style={{ alignSelf: 'center', color: '#767' }}>
                    {this.state.collection.collection_time_table}
                  </Text>
                  {this.state.payment == false ? (
                    <Text style={{ alignSelf: 'center', color: '#f00' }}>
                      Not Paid
                    </Text>
                  ) : null}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Student_Mounthly_Reports', {
                    student_id: this.state.student_data.student_id,
                  });
                  // alert(this.state.student_data.student_id)
                }}
                style={{
                  height: 95,
                  width: '100%',
                  backgroundColor: '#eee',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ height: 75, width: 110 }}
                  source={require('../photo/report.png')}
                />

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width:"70%"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      color: '#000',
                    }}>
                    Student Reports
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Accounts', {
                    student_id: this.state.student_data.student_id,
                  });
                }}
                style={{
                  height: 95,
                  width: '100%',
                  backgroundColor: '#eee',
                  //   marginVertical: 10,
                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ height: 75, width: 110 }}
                  source={require('../photo/account.png')}
                />

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width:"70%"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      color: '#000',
                    }}>
                    Student Accounts
                  </Text>
                </View>
              </TouchableOpacity>



              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Reach_up")
                }}
                style={{
                  height: 95,
                  width: '100%',
                  backgroundColor: '#eee',
                  marginTop: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  //   marginVertical: 10,
                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ height: 80, width: 110 }}
                  source={require('../photo/reach_up.png')}
                />

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width:"70%"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      color: '#000',
                    }}>
                    About Academey
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Camp_coding');
                }}
                style={{
                  height: 95,
                  width: '100%',
                  backgroundColor: '#eee',

                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    // backgroundColor: '#452',
                    height: 75,
                    width: 110,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // borderRadius: 10
                  }}>
                  <Image
                    resizeMode={'contain'}
                    style={{ height: 65, width: 70, borderRadius: 10 }}
                    source={require('../photo/logoCamp.jpeg')}
                  />
                </View>
                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width:"70%"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      color: '#000',
                    }}>
                    About Camp Coding
                  </Text>
                </View>
              </TouchableOpacity>



              {/* <TouchableOpacity
                onPress={() => {
                  this.logOut();
                }}
                style={{
                  height: 95,
                  width: '100%',
                  backgroundColor: '#eee',
                  marginVertical: 20,
                  //   borderBottomWidth: 1,
                  //   borderBottomColor: '#ddd',
                  //   justifyContent:"center",
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  resizeMode={'contain'}
                  style={{ height: 75, width: 115 }}
                  source={require('../photo/logOut.png')}
                />

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    // width:"70%"
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      //   marginTop: '4%',
                      color: '#000',
                    }}>
                    Exit
                  </Text>
                </View>
              </TouchableOpacity> */}
            </View>
          </ScrollView>
        </View>

        <Modal
          visible={this.state.modalVisible1}
          onRequestClose={() => {
            this.setState({ modalVisible1: false });
          }}
          animationType="slide"
          // presentationStyle="formSheet"s
          transparent={true}>
          <View
            style={{
              // opacity:0.7,
              backgroundColor: 'rgba(0,0,0,0.6)',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ modalVisible1: false });
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
            <View
              style={{
                height: height,
                // width: width,
                flex: 1,
                // alignContent: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  // height:height,
                  alignSelf: 'center',
                  justifyContent: 'space-around',
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  elevation: 5,
                  paddingVertical: 15,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    height: 50,
                    width: '100%',
                    // backgroundColor: '#525',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ color: '#000', fontSize: 18 }}>
                    You didn't pay the expenses yet{' '}
                  </Text>
                </View>

                <View
                  style={{
                    height: 100,
                    width: '100%',
                    // flexDirection: 'row',
                    justifyContent: 'center',
                    // backgroundColor: "#eee",
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ modalVisible1: false });
                    }}
                    style={{
                      height: 50,
                      width: '40%',
                      backgroundColor: '#3c2365',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 15,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      OK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({ modalVisible1: false });
              }}>
              <View
                style={{
                  width: '100%',
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </Modal>

        {/*////////////////////////////////////////////////////// Update Data //////////////////////////////////////////////////////* */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  HeaderView: {
    // width: '100%',
    height: 60,
    // flexDirection: 'row',
    backgroundColor: '#3c2365',
    elevation: 22,
    // alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  GradientView: {
    height: height * 0.85,
    backgroundColor: '#3c2365',
    width: width * 0.9,
    alignSelf: 'center',
    // justifyContent: 'space-around',
    borderRadius: 20,
    padding: 10,
  },
  innnerStyle: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    marginBottom: '5%',
  },
  TextStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  TextStyle2: {
    alignSelf: 'center',
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
});
