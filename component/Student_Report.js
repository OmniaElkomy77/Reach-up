import React, { Component } from 'react';
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
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
} from 'react-native';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
export default class Student_Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Report: this.props.navigation.getParam('Report'),
    };
  }
  render() {
    return (
      <>
        <View style={{ backgroundColor: '#eee', flex: 1 }}>
          <ScrollView>
            {/* <StatusBar
                            backgroundColor='#3c2365' barStyle='light-content'></StatusBar> */}
            {/*///////////////////////////////////////////////////////// Header /////////////////////////////////////////////////////// * */}
            <View style={styles.HeaderView}>
              <View
                style={{
                  height: 60,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // marginTop:10
                }}>
                <Text
                  style={{ color: '#F5FCFF', fontSize: 18, fontWeight: 'bold' }}>
                  Student Report
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
            {/*/////////////////////////////////////////////////////////////////////////////////////////////////////* */}

            {this.state.Report == null ? (
              <>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#777',
                    fontSize: 15,
                    // fontWeight: 'bold',
                    marginTop: '90%',
                  }}>
                  No Reports Yet
                </Text>
              </>
            ) : (
              <>
                <View
                  style={{
                    backgroundColor: '#eee',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'dashed',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',

                      height: 70,
                      width: 140,
                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Revision sheet</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.r_sh == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ___
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.r_sh}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,
                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Dictation</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.dic == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ____
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.dic}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,

                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Homework</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.h_w == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ____
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.h_w}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#eee',
                    height: 80,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'dashed',
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,
                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Points</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.points == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ____
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.points}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,
                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Participate</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.participate == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ____
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.participate}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,
                      // backgroundColor: "#857"
                    }}>
                    <Text style={{ color: '#000' }}>Booklet</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 100,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.bo == '' ? (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ___
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.bo}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    backgroundColor: '#eee',
                    height: 80,
                    // flexDirection: 'row',
                    // alignItems: 'flex-end',
                    // justifyContent: "flex-end",
                    marginTop: 10,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderColor: '#000',
                    borderStyle: 'dashed',
                  }}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      height: 70,
                      width: 140,
                      // backgroundColor: "#857",
                      marginLeft: 15
                    }}>
                    <Text style={{ color: '#000' }}>Units</Text>
                    <View
                      style={{
                        height: 50,
                        backgroundColor: '#fff',
                        width: 150,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {this.state.Report.unit == '' ? (
                        <Text
                          style={{
                            // fontSize: 20,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          ____
                        </Text>
                      ) : (
                        <Text
                          style={{
                            // fontSize: 15,
                            fontWeight: 'bold',
                            color: '#777',
                          }}>
                          {this.state.Report.unit}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    // backgroundColor: '#fff',

                    backgroundColor: '#eee',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#eee',
                      padding: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderStyle: 'dashed',
                      borderBottomWidth: 1,
                    }}>
                    <Text
                      style={{ color: '#000', fontSize: 15, marginVertical: 10 }}>
                      Student Report
                    </Text>
                    {this.state.Report.note == '' ? (
                      <View
                        style={{
                          backgroundColor: '#fff',
                          alignSelf: 'center',
                          alignContent: 'center',
                          borderRadius: 10,
                          color: '#000',
                          padding: 10,
                          justifyContent: 'center',
                          width: '95%',
                        }}>
                        <Text style={{ color: '#777', alignSelf: 'center' }}>
                          {' '}
                          No Student Report{' '}
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: '#fff',
                          alignSelf: 'center',
                          borderRadius: 10,
                          color: '#000',
                          padding: 10,

                          width: '95%',
                        }}>
                        <Text>{this.state.Report.note}</Text>
                      </View>
                    )}
                  </View>

                  <View
                    style={{
                      // backgroundColor: '#fff',

                      backgroundColor: '#eee',
                    }}>
                    <View
                      style={{
                        backgroundColor: '#eee',
                        padding: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'dashed',
                        borderBottomWidth: 1,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 15,
                          marginVertical: 10,
                        }}>
                        Student test
                      </Text>
                      {this.state.Report.test == "" ? (
                        <View
                          style={{
                            backgroundColor: '#fff',
                            alignSelf: 'center',
                            alignContent: 'center',
                            borderRadius: 10,
                            color: '#000',
                            padding: 10,
                            justifyContent: 'center',
                            width: '95%',
                          }}>
                          <Text style={{ color: '#777', alignSelf: 'center' }}>
                            {' '}
                            No Test{' '}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: '#fff',
                            alignSelf: 'center',
                            borderRadius: 10,
                            color: '#000',
                            padding: 10,
                            width: '95%',
                          }}>
                          <Text>{this.state.Report.test}</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  {/* <View style={{ backgroundColor: '#eee', padding: 15, justifyContent: 'center', alignItems: 'center', borderStyle: "dashed", borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#000", fontSize: 15, marginVertical: 10 }}>
                                            Grammer Notes
                                        </Text>
                                        {this.state.Report.qs_1_grammer == "" ?
                                            <View
                                                style={{
                                                    backgroundColor: '#fff',
                                                    alignSelf: 'center',
                                                    alignContent: "center",
                                                    borderRadius: 10,
                                                    color: "#000",
                                                    padding: 10,
                                                    justifyContent: "center",
                                                    width: "95%"
                                                }}>
                                                <Text style={{ color: "#f00", alignSelf: "center" }}> No  Grammer Notes </Text>
                                            </View>

                                            :

                                            <Text
                                                style={{
                                                    // height: 50,
                                                    backgroundColor: '#fff',
                                                    width: '95%',
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                    color: "#000",

                                                    padding: 10
                                                }}
                                            > {this.state.Report.qs_1_grammer}

                                            </Text>

                                        }

                                    </View>


                                    <View style={{
                                        backgroundColor: '#eee',
                                        padding: 15,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderStyle: "dashed",
                                        borderBottomWidth: 1
                                    }}>
                                        <Text style={{ color: "#000", fontSize: 15, marginVertical: 10 }}>
                                            students dictation comments
                                        </Text>
                                        {this.state.Report.qs_2_dictation == "" ?
                                            <View
                                                style={{
                                                    backgroundColor: '#fff',
                                                    alignSelf: 'center',
                                                    alignContent: "center",
                                                    borderRadius: 10,
                                                    color: "#000",
                                                    padding: 10,
                                                    justifyContent: "center",
                                                    width: "95%"
                                                }}>
                                                <Text style={{ color: "#f00", alignSelf: "center" }}> No students dictation comments </Text>
                                            </View>

                                            :
                                            <Text
                                                style={{
                                                    backgroundColor: '#fff', width: '95%',
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                    color: "#000",
                                                    padding: 10
                                                }}

                                            > {this.state.Report.qs_2_dictation}

                                            </Text>

                                        }

                                    </View>



                                    <View style={{ backgroundColor: '#eee', padding: 15, justifyContent: 'center', alignItems: 'center', borderStyle: "dashed", borderBottomWidth: 1 }}>
                                        <Text style={{ color: "#000", fontSize: 15, marginVertical: 10 }}>
                                            students homework comment
                                        </Text>
                                        {this.state.Report.qs_3_homework == "" ?
                                            <View
                                                style={{
                                                    backgroundColor: '#fff',
                                                    alignSelf: 'center',
                                                    alignContent: "center",
                                                    borderRadius: 10,
                                                    color: "#000",
                                                    padding: 10,
                                                    justifyContent: "center",
                                                    width: "95%"
                                                }}>
                                                <Text style={{ color: "#f00", alignSelf: "center" }}> No    students homework comment  </Text>
                                            </View>

                                            :
                                            <Text
                                                style={{
                                                    // height: 50,
                                                    backgroundColor: '#fff',
                                                    width: '95%',
                                                    alignSelf: 'center',
                                                    borderRadius: 10,
                                                    color: "#000",
                                                    padding: 10
                                                }}

                                            >{this.state.Report.qs_3_homework}

                                            </Text>

                                        }

                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>






                                    </View> */}
                </View>
              </>
            )}
          </ScrollView>
        </View>
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
    // elevation: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
