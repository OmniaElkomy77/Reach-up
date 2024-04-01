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
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            About The Development Company
          </Text>
        </View>
        <ScrollView style={{ marginBottom: 20 }}>
          <View
            style={{
              width: 150,
              // borderColor: color,
              borderWidth: 3,
              borderRadius: 100,
              height: 150,
              alignSelf: 'center',
              marginTop: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../photo/logoCamp.jpeg')}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 100,
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
                    'https://www.facebook.com/campcoding/',
                  );
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 21,
                    textDecorationLine: 'underline',
                    color: '#3b5998',
                  }}>
                  Camp Coding
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
            }}>
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
                    style={{ fontWeight: 'bold', fontSize: 21, marginLeft: 10 }}>
                    01066184717
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('tel:01066184717');
                  }}>
                  <Icon
                    name="phone"
                    size={27}
                    color={'#582'}
                    style={{ marginLeft: 10 }}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+201066184717');
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
                    style={{ fontWeight: 'bold', fontSize: 21, marginLeft: 10 }}>
                    01555449098
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('tel:01555449098');
                  }}>
                  <Icon
                    name="phone"
                    size={27}
                    color={'#582'}
                    style={{ marginLeft: 10 }}></Icon>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+201555449098');
                  }}>
                  <Icon
                    name="whatsapp"
                    size={30}
                    color="#49c858"
                    style={{ marginLeft: 10 }}></Icon>
                </TouchableOpacity>
              </View>

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
                    Linking.openURL('mailto:info@camp-coding.com');
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 21,
                      textDecorationLine: 'underline',
                      color: '#3b5998',
                    }}>
                    info@camp-coding.com
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
