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
            videos_data: []
        }
    }

    componentDidMount() {
        let videos = this.props.navigation.getParam("videos")
        // alert(JSON.stringify(videos))
        // setTimeout(() => {
        //     let videos = this.state.videos_data
        //     let video_arr = [];
        //     for (let i = 0; i <= videos.length; i++) {
        //         if (videos[i].type == "video") {
        //             video_arr.push(videos[i])
        //         }
        //     }
        this.setState({ videos_data: videos })

        // }, 4000);



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


                        {this.state.videos_data.map((item, index) => (
                            item.type == "video" ? (
                                <TouchableOpacity

                                    onPress={
                                        () => {
                                            this.props.navigation.navigate("Video", {
                                                video_link: item.link,
                                                description: item.description,
                                                title: item.title
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
                                        source={require('../assets/images/video.png')}
                                        style={{
                                            width: 90,
                                            height: 70,
                                            elevation: 10,
                                            resizeMode: "center"
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
                                            color: "#ff0b67"
                                        }}

                                    >{item.title}</Text>



                                </TouchableOpacity>

                            ) : null

                        ))}










                    </View>


                </ScrollView>





            </>
        )
    }

}

const styles = StyleSheet.create({


})