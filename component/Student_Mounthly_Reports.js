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
  ToastAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

// import Constants from "../constants/Constants";
import Constants from '../constants/Constants';
const { width, height } = Dimensions.get('window');
export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student_id: this.props.navigation.getParam('student_id'),
      Reports: [
        // {
        //     month_name: "2022-01",
        //     "days": [
        //         {
        //             "date": "2022-01-02",
        //             "attendance": "yes",
        //             "report": {
        //                 "follow_up_id": "1",
        //                 "student_id": "2000", "h_w": "7", "dic": "8", "r_sh": "7", "bo": "N", "participate": "8", "points": "4", "unit": "6", "note": "", "qs_1_grammer": "111111", "qs_2_dictation": "22222222", "qs_3_homework": "33333333", "date": "2022-01-02", "teacher_id": "4555"
        //             }
        //         },
        //         { "date": "2022-01-03", "attendance": "no", "report": "" },
        //         { "date": "2022-01-05", "attendance": "no", "report": "" },
        //         {
        //             "date": "2022-01-06", "attendance": "yes",
        //             "report":
        //                 { "follow_up_id": "6", "student_id": "2000", "h_w": "0", "dic": "0", "r_sh": "0", "bo": "", "participate": "0", "points": "0", "unit": "", "note": "", "qs_1_grammer": "", "qs_2_dictation": "", "qs_3_homework": "", "date": "2022-01-06", "teacher_id": "4555" }
        //         }, {
        //             "date": "2022-01-07", "attendance": "yes", "report":
        //                 { "follow_up_id": "9", "student_id": "2000", "h_w": "3", "dic": "2", "r_sh": "2", "bo": "Y", "participate": "2", "points": "6", "unit": "2", "note": "Eryuu", "qs_1_grammer": "Sfghhh", "qs_2_dictation": "Dtyuu", "qs_3_homework": "Cvvhddc", "date": "2022-01-07", "teacher_id": "4555" }
        //         }]
        // }
      ],
    };
  }
  componentDidMount() {
    let student_id = this.props.navigation.getParam('student_id');
    // alert(student_id)
    this.setState({ student_id: student_id });
    this.getStudentReport();
  }

  getStudentReport() {
    let DataToSend = {
      student_id: this.state.student_id,
    };
    axios
      .post(Constants.Domain + 'select_student_reports.php', DataToSend)
      .then(res => {
        if (res.status == 200) {
          console.log(JSON.stringify(res.data))
          if (Array.isArray(res.data)) {
            this.setState({ Reports: res.data });
          } else {
            ToastAndroid.showWithGravityAndOffset(
              'Something Error',
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM,
              20,
              20,
            );
          }
        }
      });
  }

  _renderMounthlyReports = (item, index) => {
    return (
      <>
        <View style={styles.MainView}>
          <View style={{ width: 75 }}>
            <Image
              source={require('../photo/calendar.png')}
              style={styles.ImageStyle}
            />
          </View>
          <TouchableOpacity
            style={styles.ContentView}
            onPress={() => {
              this.props.navigation.navigate('Student_Daily_Reports', {
                days: item.item.days,
              });
            }}>
            <Text style={{ fontSize: 20, alignSelf: 'center', color: '#000' }}>
              {' '}
              {item.item.month_name}
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        {/*///////////////////////////////////////////////////////// Header /////////////////////////////////////////////////////// * */}
        <View style={styles.HeaderView}>
          <View
            style={{
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#F5FCFF', fontSize: 17, fontWeight: 'bold' }}>
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
        {/*////////////////////////////////////////////////////////Contetnt /////////////////////////////////////* */}

        <FlatList
          data={this.state.Reports}
          renderItem={this._renderMounthlyReports}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  HeaderView: {
    // width: '100%',
    height: 60,
    // flexDirection: 'row',
    backgroundColor: '#3c2365',
    elevation: 22,
    alignContent: 'center',
    justifyContent: 'center',
  },
  MainView: {
    // flex: 1,
    // paddingLeft: "2%",
    // paddingTop: "5%",
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    marginVertical: 10,
    // width:"95%",
    // alignSelf:"center",
    // borderRadius:10,
    // borderColor:"#777",
    // borderWidth:1,
    // marginVertical:10,
    // elevation:7
  },
  ContentView: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight:
    marginRight: 10,
  },
  ImageStyle: {
    height: '90%',
    width: '90%',
  },
});
