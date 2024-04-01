import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Animated,
} from 'react-native';
// import LottieView from 'lottie-react-native';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const { width, height } = Dimensions.get('window');
const Record = props => {
  const playbackState = usePlaybackState();
  const progress = useProgress();
  // });
  const mainImage =
    '../photo/AppLogoPurple.png';
  const [originalData, setOriginalData] = useState([]);
  const [message, setMessage] = useState([]);
  const [selectedObj, setSelectedObj] = useState({});
  const [showAudioModal, setShowAudioModal] = useState(false);
  const lottiePlayBtnRef = useRef();

  useEffect(() => {
    let passedData = props.navigation.getParam('lesson_data');
    // let passedData = [
    //   {
    //     VR_id: '1',
    //     lesson_id: '1',
    //     type: 'record',
    //     title: 'التسجيل الاول',
    //     description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
    //     link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    //     date: '2022-05-16 20:47:56.697120',
    //   },
    //   {
    //     VR_id: '1',
    //     lesson_id: '1',
    //     type: 'record',
    //     title: 'التسجيل الاول',
    //     description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
    //     link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    //     date: '2022-05-16 20:47:56.697120',
    //   },
    //   {
    //     VR_id: '1',
    //     lesson_id: '1',
    //     type: 'record',
    //     title: 'التسجيل الاول',
    //     description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
    //     link: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    //     date: '2022-05-16 20:47:56.697120',
    //   },
    //   {
    //     VR_id: '1',
    //     lesson_id: '1',
    //     type: 'record',
    //     title: 'التسجيل الاول',
    //     description: 'د والعدة، والمتكلمون فرقوا بينهما فقالوا الوصف يقو...',
    //     link: 'https://camp-coding.org/reachUpAcademy/lessons/recordes/535255137_1643453575audiofile.wav',
    //     date: '2022-05-16 20:47:56.697120',
    //   },
    // ];

    if (passedData.length == 0) {
      setMessage([]);
      setOriginalData([]);
    } else {
      setOriginalData(passedData);
      let newTracks = [];
      for (let i = 0; i < passedData.length; i++) {
        let newObj = {
          id: passedData[i].VR_id,
          artwork: mainImage,
          title: passedData[i].title,
          url: passedData[i].link,
          description: passedData[i].description,
          type: passedData[i].type
        };
        newTracks.push(newObj);
      }

      setMessage(newTracks);
    }

    return () => {
      TrackPlayer.destroy();
    };
  }, []);

  const togglePlayerback = async playbackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    if (currentTrack != null) {
      if (playbackState == State.Paused) {
        await TrackPlayer.play();
        // lottiePlayBtnRef.current.play(48, 66);
      } else {
        await TrackPlayer.pause();
        // lottiePlayBtnRef.current.play(0, 34);
      }
    }
  };
  async function _perpareModel(item) {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        // Capability.Stop,
        // Capability.SeekTo,
      ],
    });
    await TrackPlayer.add([item]);
    setSelectedObj(item);
    setShowAudioModal(true);
    // lottiePlayBtnRef.current.play(15, 34);
  }

  useEffect(() => {
    if (showAudioModal) {
      if (playbackState == State.Paused) {
        lottiePlayBtnRef.current.play(18, 34);
      } else {
        lottiePlayBtnRef.current.play(48, 64);
      }
    }
  }, [playbackState]);

  function _renderDisplayAudioModal() {
    return (
      <Modal
        animationType="slide"
        visible={showAudioModal}
        onRequestClose={() => {
          setShowAudioModal(false);
          setSelectedObj({});
          TrackPlayer.destroy();
        }}>
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                color: '#000',
                margin: 10,
                fontWeight: 'bold',
                fontSize: 22,
              }}>
              {selectedObj.title}
            </Text>
            <Image
              source={{
                uri: `${mainImage}`,
              }}
              style={{
                width: '90%',
                height: 100,
                // borderRadius: 10,

                alignSelf: 'center',
              }}
              resizeMode="center"
            />
            <Text
              style={{
                color: '#000',
                fontSize: 15,
                margin: 12,
                fontWeight: '700',
              }}>
              {selectedObj.description}
            </Text>
          </ScrollView>
          <View>
            <TouchableOpacity
              onPress={() => {
                togglePlayerback(playbackState);
              }}>
              {/* <LottieView
                source={require('./16752-pause-to-play.json')}
                ref={lottiePlayBtnRef}
                loop={false}
                style={{ height: 200, width: '100%', alignSelf: 'center' }}
                resizeMode="contain"
              /> */}
            </TouchableOpacity>

            {_renderSlider()}
          </View>
        </View>
      </Modal>
    );
  }

  function _renderSlider() {
    return (
      <View
        style={{
          marginBottom: '10%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          padding: 10,
          borderRadius: 15,
          alignSelf: 'center',
          width: '90%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            {progress.duration
              ? new Date(progress.position * 1000).toISOString().substr(14, 5)
              : '00:00'}
          </Text>

          <Slider
            style={{
              // width: '80%',
              height: 50,
              flex: 1,
            }}
            minimumValue={0}
            maximumValue={progress.duration}
            value={progress.position}
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#fff"
            thumbTintColor="#FFD369"
            onSlidingComplete={async val => {
              await TrackPlayer.seekTo(val);

              TrackPlayer.play();
            }}
            onValueChange={value => {
              TrackPlayer.pause();
            }}
          />
          <Text
            style={{
              color: '#fff',
            }}>
            {progress.duration
              ? new Date(progress.duration * 1000).toISOString().substr(14, 5)
              : '00:00'}
          </Text>
        </View>
      </View>
    );
  }

  function _renderBody() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={message}
        keyExtractor={(_, index) => `audio-${index.toString()}`}
        renderItem={({ item, index }) => (
          item.type == "record" ?
            <TouchableOpacity
              onPress={() => {
                _perpareModel(item);
              }}
              style={{
                ...styles.indivAudioContainer,
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    margin: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {item.title}
                </Text>

                <Image
                  source={{
                    uri: `${mainImage}`,
                  }}
                  style={{
                    width: '90%',
                    height: 100,
                    // borderRadius: 10,

                    alignSelf: 'center',
                  }}
                  resizeMode="center"
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    margin: 12,
                    fontWeight: '700',
                  }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
            :


            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Video",
                  {
                    video: item
                  }
                )
                // alert(JSON.stringify(item))
              }}
              style={{
                ...styles.indivAudioContainer,
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <View>
                <Text
                  style={{
                    color: '#000',
                    margin: 10,
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {item.title}
                </Text>

                <Image
                  source={{
                    uri: `${mainImage}`,
                  }}
                  style={{
                    width: '90%',
                    height: 100,
                    // borderRadius: 10,

                    alignSelf: 'center',
                  }}
                  resizeMode="center"
                />

                <Text
                  style={{
                    color: '#000',
                    fontSize: 15,
                    margin: 12,
                    fontWeight: '700',
                  }}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              width: width,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#777',
                alignSelf: 'center',
                marginRight: 20,
              }}>
              No data yet
            </Text>
          </View>
        )}
      />
    );
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#fff',
            flex: 1,
          }}>
          <StatusBar
            backgroundColor={'#3c2365'}
            translucent={true}
            barStyle="light-content"
          />

          <View style={[styles.headerText]}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.goBack();
              }}>
              <AntDesign name={'arrowleft'} size={25} color={'#fff'} />
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: '85%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  // fontFamily: FONTS.fontFamily,
                }}>
                {'Lessons'}
              </Text>
            </View>

            <View
              style={{
                flex: 5,
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}></View>
          </View>
          {/* <ScrollView> */}
          {_renderBody()}
          {/* </ScrollView> */}
        </View>
        {_renderDisplayAudioModal()}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  noInterNet: {
    paddingTop: '80%',
    // flex: 1,
    textAlign: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  headerText: {
    height: 70,
    backgroundColor: '#3c2365',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,

    // alignItems: 'center',
    // justifyContent: 'center',
  },

  indivAudioContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    width: '90%',
  },
});
export default Record;
