import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import { Right } from 'native-base';
import { login } from '../store/action/auth'
import { useDispatch, useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native';
import { Modal } from 'react-native';

export default function OTP({ navigation, route }) {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()

    const dispatch = useDispatch()

    const onHandleLogin = () => {
        setLoading(true)
        dispatch(login(phoneNumber, password, code)).then((result) => {
            setLoading(false)
            navigation.replace('Home')
        }).catch((err) => {
            setLoading(false)
        });
    }

    useEffect(() => {
        if (code.length === 6) {
            onHandleLogin()
        }
    }, [code])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params?.phoneNumber) {
                const { phoneNumber, password } = route.params
                setPhoneNumber(phoneNumber)
                setPassword(password)
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{
            flex: 1
        }}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loading}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}>
                    <ActivityIndicator size="small" color="#f57811" />
                </View>
            </Modal>

            <React.Fragment>
                <TouchableOpacity style={{
                    width: '100%',
                    height: 60,
                    padding: 30,
                    justifyContent: "center",
                    // backgroundColor: 'red'
                }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="arrowleft" color="#f57811" size={25} />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    margin: 30,
                    justifyContent: "center",
                }}>
                    <Text style={{
                        fontSize: 30,
                        fontWeight: "bold",
                        color: '#f57811',
                        marginBottom: 40
                    }}>Nhập mã OTP</Text>
                    <Text style={{
                        fontSize: 16,
                        // marginVertical: 20
                    }}>
                        Vì mục đích bảo mật, ứng dụng cần xác thực thông tin của bạn
            </Text>
                    <OTPInputView
                        style={{
                            width: '100%',
                            height: 120,
                            color: 'red',
                            alignSelf: "center"
                            // backgroundColor: 'red'
                        }}
                        pinCount={6}
                        // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={code => setCode(code)}
                        editable={true}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />

                    <View style={{
                        flexDirection: "row",
                        // marginVertical: 20
                    }}>
                        <Text style={{
                            fontSize: 16
                        }}>Bạn không nhận được mã?</Text>
                        <TouchableOpacity>
                            <Text style={{
                                fontSize: 16,
                                color: '#f57811',
                                marginHorizontal: 10,
                                // fontWeight: "bold"
                            }}>Gửi lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </React.Fragment>
        </View >
    )
}

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        color: '#000',
        fontSize: 20
    },

    underlineStyleHighLighted: {
        borderColor: "#857d7d",
    },
});