import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
  StyleSheet,
  ScrollView
} from 'react-native';

// import NetInfo from '@react-native-community/netinfo';
const { width, height } = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {

    return (
      <>
        <StatusBar
          backgroundColor={'#3c2365'}
          barStyle="light-content"></StatusBar>
        <ScrollView>
          <View style={{ height: height }}>

            <ImageBackground
              source={require('../assets/images/BG.png')}
              style={{ height: "100%" }}>

              <ImageBackground
                source={require('../assets/images/Header.png')}
                style={{
                  height: height / 2,
                  // backgroundColor: "#FF0"
                  // alignItems: "center",
                  // justifyContent: "center"
                }}

              >




              </ImageBackground>

              <View
                style={{
                  // alignSelf: "center",
                  height: height * 0.4,
                  // padding: 10,
                  width: "90%",
                  // backgroundColor: "#f80",
                  alignItems: "center",
                  width: width,
                  justifyContent: 'space-around',
                  flexDirection: "row"

                }}>

                <TouchableOpacity
                  style={{
                    backgroundColor: "#fff",
                    elevation: 10,
                    borderRadius: 20,
                    height: "50%",
                    width: "40%",
                    alignContent: "center",
                    justifyContent: "center"

                  }}

                  onPress={
                    () => {
                      this.props.navigation.navigate('Student_Profile')
                    }

                  }

                >
                  <Image source={require('../assets/images/father.png')}
                    style={{ height: 120, width: 120, alignSelf: "center" }} />
                  <Text style={{ fontSize: 20, color: "#01185b", fontFamily: 'Hacen-Sahara-TX', alignSelf: "center" }}>parent</Text>
                </TouchableOpacity>
                <TouchableOpacity

                  style={{
                    backgroundColor: "#fff",
                    elevation: 10,
                    borderRadius: 20,
                    height: "50%",
                    width: "40%",
                    alignContent: "center",
                    justifyContent: "center"
                  }}


                  onPress={
                    () => {
                      this.props.navigation.navigate("Children_Services")
                    }

                  }

                >
                  <Image source={require('../assets/images/children1.png')}
                    style={{ height: 120, width: 120, alignSelf: "center" }} />
                  <Text style={{ fontSize: 20, color: "#01185b", fontFamily: 'Hacen-Sahara-TX', alignSelf: "center" }}>student</Text>


                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Add_account")
                }}
                style={{
                  height: 50,
                  width: "50%", backgroundColor: "#fff",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15,
                  // marginBottom: 50
                }}>
                <Text style={{ fontSize: 18, color: "#01185b" }}>Your Accounts </Text>
              </TouchableOpacity>


            </ImageBackground>
          </View>
        </ScrollView>
      </>
    )
  }

}

