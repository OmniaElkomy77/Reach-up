// import {StatusBar} from 'native-base';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Linking,
  ScrollView,
  StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default class Camp_coding extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="#3c2365"
          barStyle="light-content"></StatusBar>
        <View
          style={{
            height: 70,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3c2365',
          }}>
          <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
            About us
          </Text>
        </View>
        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              width: 150,
              // borderColor: color,
              // borderWidth: 3,
              borderRadius: 100,
              height: 150,
              alignSelf: 'center',
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:"#3c2365"
            }}>
            <Image
              source={require('../photo/reach_up.png')}
              style={{
                width: '100%',
                height: '100%',
                // borderRadius: 100,
              }}
            />
          </View>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 15,
            }}>
            <View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                }}
                onPress={() => {
                  Linking.openURL(
                    'https://www.facebook.com/reachupacademyforcourses',
                  );
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 21,
                    textDecorationLine: 'underline',
                    color: '#3b5998',
                  }}>
                  Reach Up
                </Text>
                <Icon
                  name="facebook"
                  size={27}
                  color={'#3b5998'}
                  style={{ marginLeft: 10 }}></Icon>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 0,
              // alignItems:'center'
            }}>
            <Text
              style={{
                // fontWeight: 'bold',
                fontSize: 20,
                // color: '#8B008B',
                // fontFamily: fontFamily,
                marginTop: 10,
                // marginRight: 5,
              }}>
              Connect Us from these numbers
            </Text>
          </View>
          {/*

contacts style
*/}
          <View
            style={{
              width: '95%',
              marginTop: 10,
              alignSelf: 'center',
              marginTop: 10,
              // backgroundColor: "#254"
            }}>


            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 6,
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 21, marginLeft: 10 }}>
                  01224592989
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('tel:01224592989');
                }}>
                <Icon
                  name="phone"
                  size={27}
                  color={'#582'}
                  style={{ marginLeft: 10 }}></Icon>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('https://wa.me/+201224592989');
                }}>
                <Icon
                  name="whatsapp"
                  size={30}
                  color="#49c858"
                  style={{ marginLeft: 10 }}></Icon>
              </TouchableOpacity>
            </View>




            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 6,
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 21, marginRight: 18 }}>
                  01554940118
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('tel: 01554940118');
                }}>
                <Icon
                  name="phone"
                  size={27}
                  color={'#582'}
                  style={{ marginRight: 18 }}></Icon>
              </TouchableOpacity>
              {/* <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+2 01554940118');
                  }}>
                  <Icon
                    name="whatsapp"
                    size={30}
                    color="#49c858"
                    style={{marginLeft: 10}}></Icon>
                </TouchableOpacity> */}
            </View>










            <View
              style={{
                width: '100%',

                // height: 60,
                // backgroundColor: "#0f0",
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 6,
                  justifyContent: 'center',
                }}>
                <View>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 21, marginRight: 18 }}>
                    01010240043
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('tel:01010240043');
                  }}>
                  <Icon
                    name="phone"
                    size={27}
                    color={'#582'}
                    style={{ marginRight: 18 }}></Icon>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+201010240043');
                  }}>
                  <Icon
                    name="whatsapp"
                    size={30}
                    color="#49c858"
                    style={{ marginLeft: 10 }}></Icon>
                </TouchableOpacity> */}
              </View>

            </View>



            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 6,
                justifyContent: 'center',
              }}>
              <View>
                <Text
                  style={{ fontWeight: 'bold', fontSize: 21, marginRight: 18 }}>
                  01090320327
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  Linking.openURL('tel: 01090320327');
                }}>
                <Icon
                  name="phone"
                  size={27}
                  color={'#582'}
                  style={{ marginRight: 18 }}></Icon>
              </TouchableOpacity>
              {/* <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+2 01554940118');
                  }}>
                  <Icon
                    name="whatsapp"
                    size={30}
                    color="#49c858"
                    style={{marginLeft: 10}}></Icon>
                </TouchableOpacity> */}
            </View>



































          </View>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 20,
              // alignItems:'center'
              // backgroundColor:"#f00"
            }}>
            <Text
              style={{
                // fontWeight: 'bold',
                // fontFamily: fontFamily,
                fontSize: 20,
                // color: '#8B008B',

                marginRight: 5,
              }}>
              Mail Us From
            </Text>

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: 15,
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('mailto:reachup2019@gmail.com');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 21,
                      textDecorationLine: 'underline',
                      color: "#3c2365",
                    }}>
                    reachup2019@gmail.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 80, justifyContent: "center" }}>
              <Text style={{ fontSize: 20 }}> Our Address </Text>

              <Text style={{ color: "#000", marginHorizontal: 30, fontSize: 18 }}>20 asman ebn affan st</Text>
            </View>



          </View>
        </ScrollView>
      </View>
    );
  }
}
