import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const {width, height} = Dimensions.get('window');
export default class Student_Daily_Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: '',
      days: this.props.navigation.getParam('days'),
    };
  }
  componentDidMount() {
    // alert(JSON.stringify(this.state.days))
  }

  _renderDailyReports = (item, index) => {
    return (
      <>
        {/* {alert(JSON.stringify(item.item.attendance))} */}
        {item.item.attendance == 'no' ? (
          <View style={styles.MainView}>
            <View style={styles.ContentView}>
              <View
                style={{
                  backgroundColor: '#c52904',
                  width: 15,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  marginRight: 15,
                }}></View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#000',
                }}>
                {item.item.date}
              </Text>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.MainView}
            onPress={() => {
              this.props.navigation.navigate('Student_Report', {
                Report: item.item.report,
              });
            }}>
            <View style={styles.ContentView}>
              <View
                style={{
                  backgroundColor: '#346805',
                  width: 15,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  marginRight: 15,
                }}></View>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#000',
                }}>
                {item.item.date}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </>
    );
  };

  render() {
    return (
      <>
        {/*///////////////////////////////////////////////////////// Header /////////////////////////////////////////////////////// * */}
        <View style={styles.HeaderView}>
          <View
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#F5FCFF', fontSize: 17, fontWeight: 'bold'}}>
              Student Daily Reports
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}></View>
        </View>
        {/*////////////////////////////////////////////////////////Contetnt /////////////////////////////////////* */}

        {this.state.days.length == 0 ? (
          <View
            style={{
              width: width,
              height: height - 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                // fontSize: 18,
                color: '#777',
              }}>
              No Reports Yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.days}
            renderItem={this._renderDailyReports}
          />
        )}
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
    alignContent: 'center',
    justifyContent: 'center',
  },
  MainView: {
    flex: 1,
    // paddingLeft: "2%",
    // paddingRight: "2%",
    // paddingTop: "5%",
    // backgroundColor: "#ff0",
    // flexDirection: "row"
    alignItems: 'center',
    justifyContent: 'center',
  },
  ContentView: {
    height: 50,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#fff',
    // paddingRight: "10%",
    width: '90%',
    flexDirection: 'row',
    marginVertical: 10,
  },
  // ImageStyle: {
  //     height: "100%",
  //     width: "100%"
  // }
});
