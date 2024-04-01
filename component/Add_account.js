import React from "react";
import {
    View, Text, TouchableOpacity, Image, AsyncStorage, Modal, StatusBar,
    Dimensions,
    TextInput,
    ActivityIndicator,
    ToastAndroid,
    TouchableWithoutFeedback
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import axios from "axios";
import Constants from "../constants/Constants";
// import ModalInjection from "react-native/Libraries/Modal/ModalInjection";
const { width, height } = Dimensions.get('window');
export default class Add_account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            all_student: [],
            modal_login: false,
            student_code: '',
            national_id: '',
            borderstudent_code: '#bdc1c6',
            bordernational_id: '#bdc1c6',
            secure: true,
            // modalVisible: false,
            // text_wrong: "",
            connection_Status: 'Online',
            loading_buttom: false,
            check: false,
            switch_account: {},
            modal_switch: false,
            student_id: "",
            modalVisible1: false,
            index: ""
        }
    }

    async componentDidMount() {
        let data = JSON.parse(await AsyncStorage.getItem('student_arr'));

        // await AsyncStorage.setItem('student_arr', JSON.stringify(data))
        // alert(JSON.stringify(data[0].student_id))
        this.setState({ all_student: data })

        // alert(await AsyncStorage.getItem('student_arr'))
        this.getcheck()
    }
    async getcheck() {
        let student_login = JSON.parse(await AsyncStorage.getItem("AllData"))
        let data = this.state.all_student
        for (let i = 0; i < data.length; i++) {
            if (data[i].student_id == student_login.student_id) {
                data[i].check = true
            } else {
                data[i].check = false
            }
        }
        await AsyncStorage.setItem("student_arr", JSON.stringify(data))
        console.log(JSON.stringify(data))
        this.setState({ all_student: data })
    }
    async componentDidUpdate() {
        let data = JSON.parse(await AsyncStorage.getItem('student_arr'));
        this.setState({ all_student: data })
    }

    async setDate(data) {
        let new_Student_data = data
        let Student_arr = JSON.parse(await AsyncStorage.getItem("student_arr"));
        Student_arr.push(new_Student_data)
        await AsyncStorage.setItem("student_arr", JSON.stringify(Student_arr))
        this.setState({ modal_login: false })
    }

    function_national_id(pass) {
        if (this.state.national_id.length <= 4 && pass.length < 4) {
            this.setState({ bordernational_id: 'red' });
            if (pass == '') {
                this.setState({ bordernational_id: '#bdc1c6' });
            }
        } else {
            this.setState({ bordernational_id: '#bdc1c6' });
        }
    }
    function_student_code(text_student_code) {
        if (this.state.student_code <= 5 && text_student_code != '') {
            this.setState({ borderstudent_code: 'red' });
            if (text_student_code == '') {
                this.setState({ borderstudent_code: '#bdc1c6' });
            }
        } else {
            this.setState({ borderstudent_code: '#bdc1c6' });
        }
    }


    async mark_fun(index) {

        let arr = JSON.parse(await AsyncStorage.getItem("student_arr"))
        for (let i = 0; i <= arr.length; i++) {
            if (i == index) {
                if (arr[i].check == false) {
                    arr[i].check = true
                }
                if (arr[i].check == true)
                    arr[i].check = false
            } else {
                // arr[i].check = false
                continue;
            }

        }
        this.getcheck()
        // await AsyncStorage.setItem('student_arr', JSON.stringify(arr))
        this.setState({ all_student: arr })
    }



    async switch_account() {
        let switch_account = this.state.switch_account
        await AsyncStorage.setItem('AllData', JSON.stringify(switch_account));
        this.setState({ modal_switch: false })
    }


    async logOut() {
        let Student_arr = JSON.parse(await AsyncStorage.getItem("student_arr"))
        let student_id = this.state.student_id
        let student_login = JSON.parse(await AsyncStorage.getItem("AllData"))
        // alert(JSON.stringify(student_login.student_id))
        for (let i = 0; i <= Student_arr.length; i++) {
            if (Student_arr[i].student_id == student_login.student_id) {
                Student_arr.splice(i, 1)
                if (Student_arr.length == 0) {

                    await AsyncStorage.setItem('switch', 'Auth');
                    this.props.navigation.navigate('Auth');

                } else {
                    await AsyncStorage.setItem('AllData', JSON.stringify(Student_arr[0]));
                    // this.getcheck()
                    await AsyncStorage.setItem("student_arr", JSON.stringify(Student_arr))
                    this.setState({ modalVisible1: false })

                }

            } else if (Student_arr[i].student_id == student_id) {
                Student_arr.splice(i, 1)
                this.setState({ modalVisible1: false })
                await AsyncStorage.setItem("student_arr", JSON.stringify(Student_arr))
            }

        }

        // alert(JSON.stringify(student_id))
        // this.setState({ modalVisible1: false })
        // this.switch_account()


    }









    check() {
        if (this.state.connection_Status == 'Online') {
            this.setState({ loading_buttom: true });
            let DataToSend = {
                student_id: this.state.student_code,
                N_id: this.state.national_id,
            };

            axios
                .post(Constants.Domain + 'signin.php', DataToSend)
                .then(res => {
                    // console.log(res.data)
                    if (res.status == 200) {
                        if (res.data == 'data_is_not_correct') {
                            ToastAndroid.showWithGravityAndOffset(
                                'You Must Enter Correct Data',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                20,
                                20,
                            );
                        } else if (res.data == 'can_not_login') {
                            // this.setState({ text_wrong: "لا تستطيع الدخول حاليا", modalVisible: true })
                            ToastAndroid.showWithGravityAndOffset(
                                "You Can't Login Right Now",
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                20,
                                20,
                            );
                        } else if (res.data == 'error') {
                            // this.setState({ text_wrong: "حدث خطأ ما ", modalVisible: true })
                            ToastAndroid.showWithGravityAndOffset(
                                'Something Error',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                20,
                                20,
                            );
                        } else {
                            this.setDate(res.data);

                        }
                    }
                    this.setState({ loading_buttom: false });
                })
                .catch(function (error) {
                    console.log(error);
                });
            // }
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'No Internet Connection',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                20,
                20,
            );
        }
    }





    render() {
        return (
            <>
                <View style={{
                    width: '100%',
                    height: 60,
                    flexDirection: 'row',
                    backgroundColor: '#3c2365',
                    // elevation: 22,
                }}>

                    <TouchableOpacity
                        style={{
                            width: "30%", justifyContent: 'center', alignItems: 'center',

                        }}
                        onPress={() => {
                            this.setState({ modal_login: true })
                        }}>
                        <View
                            style={{
                                height: 35,
                                width: 35,
                                backgroundColor: '#f8bb08',
                                borderRadius: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <FontAwesome5
                                name={'plus'}
                                size={20}
                                style={{
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    color: '#fff',
                                    elevation: 10,
                                }}
                            />
                        </View>
                    </TouchableOpacity>



                    <View
                        style={{ alignItems: 'center', justifyContent: 'center', width: "50%", }}>
                        <Text style={{ color: '#F5FCFF', fontSize: 17, fontWeight: 'bold' }}>
                            Your Accounts
                        </Text>
                    </View>
                </View>




                <View style={{ height: "100%", width: "95%", alignSelf: "center" }}>
                    {
                        this.state.all_student.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => {

                                    this.setState({
                                        switch_account: item, modal_switch: true,
                                        index: index
                                    })
                                }}
                                style={{
                                    marginVertical: 10,
                                    width: '100%',
                                    alignSelf: 'center',
                                    backgroundColor: 'white',
                                    borderTopEndRadius: 20,
                                    borderBottomLeftRadius: 20,
                                    // marginBottom: 20,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,

                                    elevation: 5,
                                    padding: 10,
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            modalVisible1: true,
                                            student_id: item.student_id,
                                            // switch_account: item
                                        })
                                        // alert(JSON.stringify(this.state.student_id))
                                    }}
                                    style={{
                                        height: 30, width: 30, backgroundColor: "#f00", borderRadius: 25, alignItems: 'center',
                                        justifyContent: "center"
                                    }}>
                                    <FontAwesome5 name="times" style={{ color: "#fff", fontSize: 18 }} />
                                </TouchableOpacity>
                                <View
                                    style={{
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                    }}>

                                    {item.gender == "male" ?
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={require('../photo/boy.png')}
                                        />

                                        :
                                        <Image
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={require('../photo/girl.png')}
                                        />
                                    }

                                    <View
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                alignSelf: 'center',
                                                fontSize: 18,
                                                fontWeight: '600',

                                                color: '#000',
                                            }}>
                                            {item.student_name}
                                        </Text>
                                        {item.check ?
                                            <Icon
                                                name="check-circle"
                                                style={{
                                                    fontSize: 20,
                                                    fontWeight: '500',
                                                    color: '#357606',
                                                    marginVertical: 20
                                                }}
                                            />
                                            : null}


                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <Modal visible={this.state.modal_login}
                    onRequestClose={() => {
                        this.setState({ modal_login: false })
                    }}
                >

                    <View style={{ flex: 1, backgroundColor: '#fff' }}>
                        <StatusBar
                            backgroundColor="#3c2365"
                            barStyle="light-content"></StatusBar>

                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                // backgroundColor: '#255'
                            }}>
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    height: height / 3,
                                    alignSelf: 'center',
                                    width: '95%',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                }}>
                                <Image
                                    source={require('../photo/AppLogoPurple.png')}
                                    style={{ height: height, width: '90%', resizeMode: 'contain' }}
                                />
                            </View>

                            <View
                                style={{
                                    height: height / 3,
                                    width: '100%',
                                    // backgroundColor:'#528'
                                }}>
                                <TextInput
                                    style={{
                                        backgroundColor: '#fff',
                                        height: 70,
                                        width: '90%',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        margin: 10,
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: this.state.borderstudent_code,
                                        color: '#000',
                                    }}
                                    placeholder="Student ID"
                                    placeholderTextColor="#777"
                                    keyboardType="number-pad"
                                    value={this.state.student_code}
                                    onChangeText={value => {
                                        this.setState({ student_code: value });
                                        this.function_student_code(value);
                                    }}
                                />

                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        height: 70,
                                        width: '90%',
                                        alignSelf: 'center',
                                        borderRadius: 10,
                                        margin: 10,
                                        padding: 10,
                                        borderColor: this.state.bordernational_id,
                                        borderWidth: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>

                                    <TextInput
                                        style={{
                                            backgroundColor: '#fff',
                                            height: '100%',
                                            width: '90%',
                                            borderRadius: 10,
                                            // alignItems: "flex-end",
                                            color: '#000',
                                        }}
                                        secureTextEntry={this.state.secure ? true : false}
                                        placeholder="Password"
                                        placeholderTextColor="#777"
                                        keyboardType="number-pad"
                                        value={this.state.national_id}
                                        onChangeText={value => {
                                            this.setState({ national_id: value });
                                            this.function_national_id(value);
                                        }}
                                    />

                                    {this.state.secure ? (
                                        <TouchableOpacity
                                            style={{
                                                width: '10%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            onPress={() => {
                                                this.setState({ secure: false });
                                            }}>
                                            <Icon
                                                name="eye-slash"
                                                style={{ fontSize: 20, color: '#777' }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity
                                            style={{
                                                width: '10%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                            onPress={() => {
                                                this.setState({ secure: true });
                                            }}>
                                            <Icon name="eye" style={{ fontSize: 20, color: '#777' }} />
                                        </TouchableOpacity>
                                    )}




                                </View>

                                <View
                                    style={{
                                        height: 100,
                                        // backgroundColor: '#ff1',
                                        width: '95%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.check();
                                        }}
                                        style={{
                                            backgroundColor: '#3c2365',
                                            height: 70,
                                            width: '40%',
                                            // alignSelf: 'flex-end',
                                            borderRadius: 10,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        {this.state.loading_buttom ? (
                                            <ActivityIndicator size={30} color={'#fff'} />
                                        ) : (
                                            <Text
                                                style={{ fontSize: 18, fontWeight: '500', color: '#fff' }}>
                                                Submit
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        height: 50,
                                        // width: '95%',
                                        // backgroundColor: '#845',
                                        alignSelf: 'center',
                                    }}>
                                    {/* <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('Camp_coding');
                                        }}
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderBottomWidth: 1,
                                        }}>
                                        <Icon
                                            name="share-square"
                                            style={{ fontSize: 15, color: '#000' }}
                                        />
                                        <Text style={{ color: '#000', fontSize: 18 }}>
                                            Developed By Camp Coding {''}
                                        </Text>
                                    </TouchableOpacity> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>











                <Modal
                    visible={this.state.modal_switch}
                    onRequestClose={() => {
                        this.setState({ modal_switch: false });
                    }}
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}>
                    <View
                        style={{
                            // opacity:0.7,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_switch: false });
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        // backgroundColor: '#525',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}>
                                        are you sure you want to switch account?
                                    </Text>
                                </View>


                                <View
                                    style={{
                                        height: 100,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // backgroundColor: "#eee",
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // this.sign_in_accounting();
                                            this.switch_account()
                                            this.mark_fun(this.state.index)
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: '#3c2365',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modal_switch: false });
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: '#f8bb08',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modal_switch: false });
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>









                <Modal
                    visible={this.state.modalVisible1}
                    onRequestClose={() => {
                        this.setState({ modalVisible1: false });
                    }}
                    animationType="slide"
                    // presentationStyle="formSheet"s
                    transparent={true}>
                    <View
                        style={{
                            // opacity:0.7,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            flex: 1,
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modalVisible1: false });
                            }}>
                            <View
                                style={{
                                    position: 'absolute',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                        <View
                            style={{
                                height: height,
                                // width: width,
                                flex: 1,
                                // alignContent: 'center',
                                justifyContent: 'space-around',
                            }}>
                            <View
                                style={{
                                    // height:height,
                                    alignSelf: 'center',
                                    justifyContent: 'space-around',
                                    width: '90%',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    elevation: 5,
                                    paddingVertical: 15,
                                    marginBottom: 10,
                                }}>
                                <View
                                    style={{
                                        height: 50,
                                        width: '100%',
                                        // backgroundColor: '#525',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}>
                                        are you sure you want to delete account?
                                    </Text>
                                </View>


                                <View
                                    style={{
                                        height: 100,
                                        width: '100%',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        // backgroundColor: "#eee",
                                        alignItems: 'center',
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // this.sign_in_accounting();
                                            this.logOut()
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: '#3c2365',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            Confirm
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ modalVisible1: false });
                                        }}
                                        style={{
                                            height: 50,
                                            width: '40%',
                                            backgroundColor: '#f8bb08',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 25,
                                        }}>
                                        <Text
                                            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <TouchableWithoutFeedback
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.setState({ modalVisible1: false });
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>













            </>
        )
    }
}
