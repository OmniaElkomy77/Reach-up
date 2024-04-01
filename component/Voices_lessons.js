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

} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// import Video from 'react-native-af-video-player-updated'
// import LinearGradient from 'react-native-linear-gradient';
const { width, height } = Dimensions.get('window');

export default class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voices_data: []
        }
    }

    componentDidMount() {

        let voices = this.props.navigation.getParam("voices")

        this.setState({ voices_data: voices })

        // alert(JSON.stringify(this.state.lesson_data))
    }

    render() {

        return (
            <>
                <StatusBar barStyle='dark-content' backgroundColor="transparent" translucent={true} ></StatusBar>

                <ScrollView>

                    <View>

                        <ImageBackground

                            source={
                                require('../assets/images/BG2.png')
                            }
                            style={{

                                height: height * 0.4,
                                paddingTop: "20%",
                                paddingRight: "10%"
                            }}

                        >
                            <Text

                                style={{
                                    fontSize: 23,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#ff0b67"
                                }}

                            > {" "} choose your </Text>
                            <Text

                                style={{
                                    fontSize: 30,
                                    fontFamily: "Hacen-Sahara-TX",
                                    color: "#01185b"
                                }}

                            >  {"      "} Lessons </Text>
                        </ImageBackground>

                        {
                            this.state.voices_data.map((item, index) => (
                                item.type == "record" ? (
                                    <TouchableOpacity

                                        onPress={
                                            () => {
                                                this.props.navigation.navigate("Record",
                                                    {
                                                        Records: this.state.voices_data
                                                    }
                                                )
                                                // alert(JSON.stringify(this.state.voices_data))
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
                                            source={require('../assets/images/voice.png')}
                                            style={{
                                                width: 90,
                                                height: 70,
                                                elevation: 10,
                                                resizeMode: 'center'
                                            }}
                                        />
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                width: "90%",
                                                //  backgroundColor:"#ff0",
                                                // height: "70%",
                                                fontSize: 20,
                                                fontFamily: "Hacen-Sahara-TX",
                                                color: "#9108a9"
                                            }}

                                        >{item.title}</Text>



                                    </TouchableOpacity>


                                ) : null


                            ))
                        }













                    </View>


                </ScrollView>





            </>
        )
    }

}

const styles = StyleSheet.create({


})