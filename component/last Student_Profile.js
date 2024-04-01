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
  TouchableWithoutFeedback
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
const {width, height} = Dimensions.get('window');

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
      modalVisible1:false
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
            if(payment==false){
              this.setState({modalVisible1:true,payment:payment})
            }else{
              this.setState({modalVisible1:false,payment:payment})
            }
            // this.setState({payment: payment});
            //  console.log( JSON.stringify(res.data.paid))
          }
        }
      });
  }

  async logOut() {
    await AsyncStorage.setItem('switch', 'Auth');
    this.props.navigation.navigate('AppSwitch');
  }

  // paid_fun(){
  //   if(this.state.payment==false){
  //     this.setState({modalVisible1:true})
  //   }else{
  //     this.setState({modalVisible1:false})
  //   }
  // }

  // {"parent_phone": "010069853693", "student_collection_id": "1", "student_generation_id": "1",
  //  "student_id": "2005", "student_name": "امنيه الكومي",
  // "student_national_id": "31101021806953", "student_registration_date": "2022-01-07 17:51:04.000000"}

  render() {
    return (
      <>
        <StatusBar backgroundColor={'#3c2365'}></StatusBar>
        {/*///////////////////////////////////////////////////////// Header /////////////////////////////////////////////////////// * */}
        <ScrollView>
          <View>
            <View style={styles.HeaderView}>
              {/* <TouchableOpacity
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              {/* <FontAwesome5
                            name="angle-right"
                            size={35}
                            style={{ color: '#fff', marginRight: 20 }}
                        /> 
            </TouchableOpacity> */}
              <View
                style={{
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: '#F5FCFF', fontSize: 17, fontWeight: 'bold'}}>
                  Profile Page
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
            {/*///////////////////////////////////////////////////////// Contant/////////////////////////////////////////////////////// * */}

            <View
              // colors={['#fff', '#fff']}
              style={{height: "100%", padding: '7%', backgroundColor: '#fff'}}>
              <View
                style={{
                  height: height * 0.85,
                  backgroundColor: '#3c2365',
                  width: width * 0.9,
                  alignSelf: 'center',
                  // justifyContent: 'space-around',
                  borderRadius: 20,
                  padding: 10,
                  borderWidth: this.state.payment == false ? 4 : null,
                  borderColor: this.state.payment == false ? '#f00' : null,
                }}>
                <View style={{}}>
                  <View style={styles.innnerStyle}>
                    {this.state.student_data.gender == 'male' ? (
                      <Image
                        resizeMode={'contain'}
                        style={{height: 110, width: 110}}
                        source={require('../photo/boy.png')}
                      />
                    ) : (
                      <Image
                        resizeMode={'contain'}
                        style={{height: 110, width: 110}}
                        source={require('../photo/girl.png')}
                      />
                    )}
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: '2%',
                      color: '#fff',
                    }}>
                    {this.state.student_data.student_name}
                  </Text>
                </View>
                {/* <View style={{
                                flexDirection: "row",
                                justifyContent: "center",


                            }}>
                                <FontAwesome5 name={"phone"} size={17}
                                    style={{
                                        marginTop: "2%",
                                        color: "#3c2",
                                        marginRight: "1%"
                                    }} />


                                <Text selectable={true} style={{
                                    fontSize: 20,
                                    fontWeight: "bold",
                                    marginBottom: "10%",
                                    alignSelf: "center",
                                    // marginTop:"6%",
                                    color: "#fff"

                                }}>

                                    {this.state.student_data.parent_phone}
                                </Text> */}

                {/* </View> */}

                <View
                  style={{
                    // flexDirection: 'row',
                    // backgroundColor: "#589",
                    marginVertical: 10,
                    alignSelf: 'center',
                    justifyContent: 'space-around',
                    width: '95%',
                    height: 160,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 70,
                      width: '100%',
                      backgroundColor: '#fff',
                      // elevation: 7,
                      // marginRight: "20%",
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.TextStyle}>
                      {' '}
                      {this.state.generation.generation_name}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 70,
                      width: '100%',
                      backgroundColor: '#fff',
                      // elevation: 7,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.TextStyle}>
                      {' '}
                      {this.state.collection.collection_name}
                    </Text>
                    <Text style={{color: '#777'}}>
                      {this.state.collection.collection_time_table}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    // flexDirection: 'row',
                    // height: 200,
                    // padding: '2%',
                    justifyContent: 'space-around',
                    // alignItems: "flex-end",
                    // backgroundColor: "#582",
                    width: '95%',
                    alignSelf: 'center',
                    height: 160,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        'Student_Mounthly_Reports',
                        {
                          student_id: this.state.student_data.student_id,
                        },
                      );
                      // alert(this.state.student_data.student_id)
                    }}
                    style={{
                      height: 70,
                      width: '100%',
                      backgroundColor: '#f8bb08',
                      // elevation: 7,
                      borderRadius: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.TextStyle2}>Student Report</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('Accounts', {
                        student_id: this.state.student_data.student_id,
                      });
                    }}
                    style={{
                      height: 70,
                      width: '100%',
                      backgroundColor: '#c31406',
                      // elevation: 7,
                      borderRadius: 10,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.TextStyle2}>Accounts</Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    // flexDirection: 'row',
                    height: 130,
                    // padding: "2%",
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    alignSelf: 'center',
                    // backgroundColor: '#542',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.logOut();
                    }}
                    style={{
                      height: 70,
                      width: '40%',
                      backgroundColor: '#592',
                      // elevation: 7,
                      borderRadius: 20,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={styles.TextStyle2}>Exit</Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      height: 50,
                      // width: '95%',
                      // backgroundColor: '#845',
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Camp_coding');
                      }}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 1,
                        borderBottomColor: '#fff',
                      }}>
                      <Icon
                        name="share-square"
                        style={{fontSize: 15, color: '#fff'}}
                      />
                      <Text style={{color: '#fff', fontSize: 18}}>
                        Developed By Camp Coding {''}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

     
          <Modal
            visible={this.state.modalVisible1}
            onRequestClose={() => {
              this.setState({modalVisible1: false});
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
                style={{flex: 1}}
                onPress={() => {
                  this.setState({modalVisible1: false});
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
                    <Text style={{color: '#000', fontSize: 18}}>
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
                        this.setState({modalVisible1: false});
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
                style={{flex: 1}}
                onPress={() => {
                  this.setState({modalVisible1: false});
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
