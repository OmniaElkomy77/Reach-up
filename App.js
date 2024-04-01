import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SwitchControls from './component/SwitchControls';
import Login from './component/Login';
import Student_Daily_Reports from './component/Student_Daily_Reports';
import Student_Profile from './component/Student_Profile';
import Student_Mounthly_Reports from './component/Student_Mounthly_Reports';
import Student_Report from './component/Student_Report';
import Accounts from './component/Accounts';
import Camp_coding from './component/Camp_coding';
import Reach_up from "./component/Reach_up"
import Home from "./component/Home"
import Children_Services from "./component/Children_Services"
import Lesson_type from "./component/Lesson_type"
import Add_account from "./component/Add_account"
import Videos_lessons from "./component/Videos_lessons"
import Voices_lessons from "./component/Voices_lessons"
import Video from "./component/Video"
import Record from './component/Record';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
const Auth = createStackNavigator(
  {
    Login: Login,
    Camp_coding: Camp_coding,
    Reach_up: Reach_up
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
  {
    initialRouteName: Login,
  },
);
const HomePages = createStackNavigator(
  {
    Home: Home,
    Student_Profile: Student_Profile,
    Student_Mounthly_Reports: Student_Mounthly_Reports,
    Student_Daily_Reports: Student_Daily_Reports,
    Student_Report: Student_Report,
    Accounts: Accounts,
    Camp_coding: Camp_coding,
    Reach_up: Reach_up,
    Children_Services: Children_Services,
    Lesson_type: Lesson_type,
    Videos_lessons: Videos_lessons,
    Video: Video,
    Voices_lessons: Voices_lessons,
    Record: Record,
    Add_account: Add_account
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
  {
    initialRouteName: Home,
  },
);
const AppSwitch = createSwitchNavigator({
  SwitchControls: { screen: SwitchControls },
});
const All = createSwitchNavigator(
  {
    AppSwitch: AppSwitch,
    Auth: Auth,
    HomePages: HomePages,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
const App = createAppContainer(All);

export default App;
