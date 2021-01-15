import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import AntDesign from 'react-native-vector-icons/AntDesign';
export default function OTP() {
    return (
        <View style={{
            flex: 1
        }}>
            <View style={{
                // backgroundColor: 'red',
                width: '100%',
                height: 60,
                padding: 30,
                justifyContent: "center",
                // flexDirection: "row"
            }}>
                <AntDesign name="arrowleft" color="#f57811" size={25} />
                {/* <Text>Xác Thực</Text> */}
            </View>
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
                    // onCodeChanged={code => { this.setState({ code }) }}
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
        </View>
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