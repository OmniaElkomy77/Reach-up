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
  Animated,
  ImageBackground,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// import Video from 'react-native-af-video-player-updated'
// import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
const { width, height } = Dimensions.get('window');

export default class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   generation_id: '',
      lessons: [],
      loading: false,
      connection_Status: ""
    };
  }

  componentDidMount() {
    const unsubscripe = NetInfo.addEventListener(state => {
      this.setState({
        connection_Status: state.isConnected ? "Online" : "Offline"
      })
      if (!state.isConnected) {

      }
      this.setState({ loading: true })

      this.get_data();


    })
    return unsubscripe

  }
  async get_data() {
    let Data = JSON.parse(await AsyncStorage.getItem('AllData'));
    // alert(JSON.stringify(Data))
    let data_to_send = {
      generation_id: Data.student_generation_id
      // Data.student_generation_id,
    };
    axios
      .post(
        'https://camp-coding.org/reachUpAcademy/lessons/select_lessons.php',
        data_to_send,
      )
      .then(res => {
        if (res.status == 200) {
          // console.log(JSON.stringify(res.data))
          if (Array.isArray(res.data)) {
            this.setState({
              lessons: res.data, loading
                : false
            });
          } else {
          }
        }
      });
  }

  render() {
    return (
      <>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}></StatusBar>

        <ScrollView>
          <View>
            <ImageBackground
              source={require('../assets/images/BG2.png')}
              style={{
                height: height * 0.4,
                paddingTop: '20%',
                paddingRight: '10%',
              }}>
              <Text
                style={{
                  fontSize: 23,
                  fontFamily: 'Hacen-Sahara-TX',
                  color: '#ff0b67',
                }}>
                {'  '}
                {''} It's time
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'Hacen-Sahara-TX',
                  color: '#01185b',
                }}>
                {' '}
                {'      '}to study{' '}
              </Text>
            </ImageBackground>
            {this.state.connection_Status == "Offline" ?
              <View style={{ justifyContent: "center", alignItems: "center", paddingTop: "50%" }}>
                <Text style={{ coloe: "#777", alignSelf: "center", fontSize: 18 }}>
                  No Internet Connection
                </Text>
              </View> :

              this.state.loading == false ?
                this.state.lessons.length == 0 ?
                  <View style={{ justifyContent: "center", alignItems: "center", paddingTop: "50%" }}>
                    <Text style={{ coloe: "#777", alignSelf: "center", fontSize: 18 }}>
                      There are No Lessons
                    </Text>
                  </View>
                  :
                  this.state.lessons.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Record', {
                          lesson_data: item.data
                        });
                        // alert(JSON.stringify(item.data))
                      }}
                      style={{
                        backgroundColor: '#fff',
                        width: "90%",
                        height: 100,
                        alignSelf: 'center',
                        borderTopRightRadius: 50,
                        borderBottomLeftRadius: 50,
                        elevation: 2,
                        borderColor: '#9108a9',
                        borderWidth: 1,
                        paddingTop: '4%',
                        paddingLeft: '7%',
                        flexDirection: 'row',
                        marginBottom: '5%',
                        marginTop: 10,
                        // alignItems: "center"
                      }}>
                      <Image
                        source={require('../assets/images/lesson.png')}
                        style={{
                          width: 90,
                          height: 70,
                          elevation: 10,
                          resizeMode: 'center',
                        }}
                      />
                      <Text
                        style={{
                          // textAlign: 'center',
                          alignSelf: 'center',
                          width: '70%',
                          //  backgroundColor:"#ff0",
                          // height: '70%',
                          fontSize: 25,
                          fontFamily: 'Hacen-Sahara-TX',
                          color: '#9108a9',
                        }}>
                        {item.lesson_name}
                      </Text>
                    </TouchableOpacity>
                  ))
                :
                <View style={{ alignSelf: "center", paddingTop: "50%" }}>
                  <ActivityIndicator size={50} color={"#9d138e"}
                  />
                </View>

            }

            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Lesson_type');
              }}
              style={{
                backgroundColor: '#fff',
                width: width * 0.9,
                height: 100,
                alignSelf: 'center',
                borderTopRightRadius: 50,
                borderBottomLeftRadius: 50,
                elevation: 2,
                borderColor: '#ff0b67',
                borderWidth: 1,
                paddingTop: '4%',
                paddingLeft: '7%',
                flexDirection: 'row',
                marginBottom: '5%',
              }}>
              <Image
                source={require('../assets/images/lesson.png')}
                style={{
                  width: 90,
                  height: 70,
                  elevation: 10,
                  resizeMode: 'center',
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  width: '90%',
                  //  backgroundColor:"#ff0",
                  height: '70%',
                  fontSize: 30,
                  fontFamily: 'Hacen-Sahara-TX',
                  color: '#ff0b67',
                }}>
                Lesson 2
              </Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 3
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#ffc80b",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/3.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "90%",
                                    //  backgroundColor:"#ff0",
                                    height: "70%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#ffc80b"
                                }}

                            >تعلم الجمع</Text>



                        </TouchableOpacity>



                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 4
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#01185b",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/4.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "90%",
                                    //  backgroundColor:"#ff0",
                                    height: "70%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#01185b"
                                }}

                            >تعلم الطرح</Text>



                        </TouchableOpacity>




                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 5
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#9108a9",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/5.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "70%",
                                    //  backgroundColor:"#ff0",
                                    height: "60%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#9108a9"
                                }}

                            >نطق الأرقام بالعربي</Text>



                        </TouchableOpacity>



                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 6
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#ff0b67",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/6.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "90%",
                                    //  backgroundColor:"#ff0",
                                    height: "70%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#ff0b67"
                                }}

                            >الأرقام العربيه</Text>



                        </TouchableOpacity>


                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 7
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#ffc80b",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/7.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "70%",
                                    //  backgroundColor:"#ff0",
                                    height: "70%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#ffc80b"
                                }}

                            >نطق الأرقام العربيه</Text>



                        </TouchableOpacity>



                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 8
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#01185b",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/8.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "70%",
                                    //  backgroundColor:"#ff0",
                                    height: "70%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#01185b"
                                }}

                            >Numbers Song</Text>



                        </TouchableOpacity>


                        <TouchableOpacity

                            onPress={
                                () => {

                                    this.props.navigation.navigate("Video", {
                                        Vid: 9
                                    })
                                }
                            }

                            style={{
                                backgroundColor: "#fff",
                                width: width * 0.9,
                                height: 100,
                                alignSelf: "center",
                                borderTopRightRadius: 50,
                                borderBottomLeftRadius: 50,
                                elevation: 2,
                                borderColor: "#9108a9",
                                borderWidth: 1,
                                paddingTop: "4%",
                                paddingLeft: "7%",
                                flexDirection: "row",
                                marginBottom: "5%"

                            }}

                        >


                            <Image
                                source={require('../assets/images/9.png')}
                                style={{
                                    width: 90,
                                    height: 70,
                                    elevation: 10
                                }}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    width: "90%",
                                    //  backgroundColor:"#ff0",
                                    height: "60%",
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#9108a9"
                                }}

                            >كتابه الأرقام</Text>



                        </TouchableOpacity> */}
          </View>
        </ScrollView>

        {/* <Video
                        url={require('../assets/Videos/arabic_letter/1.mp4')}
                        lockRatio={16 / 9}
                        rotateToFullScreen={true}
                        lockPortraitOnFsExit={true}
                        hideFull
                        scrollBounce={true}
                        lockPortraitOnFsExit={true}
                    />  */}
      </>
    );
  }
}

const styles = StyleSheet.create({});
