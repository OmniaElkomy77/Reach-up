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
import NetInfo from '@react-native-community/netinfo';

import Video from 'react-native-af-video-player-updated'
// const { width, height } = Dimensions.get('window');
// const url = 'https://your-url.com/video.mp4'
export default class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video_link: "",
            description: "",
            title: ""
        }
    }

    componentDidMount() {
        let Video_obj = this.props.navigation.getParam("video")
        let video = Video_obj.url
        let description = Video_obj.description
        let title = Video_obj.title

        // alert(video)
        this.setState({
            video_link: video,
            description: description,
            title: title
        })
    }

    render() {

        return (
            <>
                <StatusBar barStyle='light-content' backgroundColor="#3c2365" translucent={true} ></StatusBar>
                <View style={{ flex: 1, backgroundColor: "#fff", }}>
                    <Video
                        url={this.state.video_link}
                        rotateToFullScreen={true}
                        fullScreenOnly={true}
                        hideFullScreenControl={false}
                        lockRatio={16 / 9}
                        useNativeDriver={false}
                    // rotateToFullScreen={true}
                    // // hideFullScreenControl={true}
                    // fullScreen={true}
                    // lockPortraitOnFsExit={true}
                    // hideFull

                    // scrollBounce={true}
                    // volum={1}
                    // style={{ marginTop: "15%", }}

                    />
                    <Text style={{ fontWeight: "bold", fontSize: 20, color: "#000", margin: 20 }}>
                        {this.state.title}
                    </Text>
                    <Text style={{ fontSize: 18, color: "#777", marginHorizontal: 10 }}>
                        {this.state.description}
                    </Text>
                </View>

            </>
        )
    }

}

const styles = StyleSheet.create({


})