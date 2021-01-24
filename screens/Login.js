import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux'
import { login, checkLogin } from '../store/action/auth'
export default function Login({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    const [showPassword, setShowPassword] = useState(true)

    const dispatch = useDispatch()
    const onHandleLogin = async () => {
        try {
            await dispatch(checkLogin(phoneNumber, password))
            navigation.navigate('OTP', {
                phoneNumber,
                password
            })
        } catch (error) {

        }
        // navigation.navigate('OTP', {
        //     phoneNumber,
        //     password
        // })
        // dispatch(login(phoneNumber, password, 1)).then((result) => {
        //     navigation.replace('Home')
        // }).catch((err) => {
        // });
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#faf5f5'
        }}>

            <View style={{
                flex: 1,
                margin: 30,
                justifyContent: "center",
                alignItems: "center",
            }}>

                <Image
                    style={{
                        width: 100,
                        height: 100
                    }}
                    source={{
                        uri: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/document-app-icon-or-logo-icon-design-template-7b6cac8de4b9abdd949f7643fe00924e_screen.jpg?ts=1576967977',
                    }}
                />
                <View style={{
                    marginBottom: 20
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: '#f57811',
                        marginBottom: 20
                    }}>BK Document</Text>
                </View>


                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: '100%',
                    height: 60
                }}>
                    <View style={{
                        height: '100%',
                        width: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#fff',
                        borderRadius: 10
                    }}>
                        <Entypo name="phone" color="#a19595" size={25} />
                    </View>
                    <TextInput
                        style={{
                            flex: 1,
                            height: 60,
                            width: '100%',
                            borderBottomColor: '#fff',
                            borderBottomWidth: 1,
                            backgroundColor: '#fff',
                            borderRadius: 10,
                            marginLeft: 3,
                            paddingLeft: 20,
                        }}
                        placeholderTextColor='#a19595'
                        placeholder='Số điện thoại'
                        autoFocus={true}
                        keyboardType={'number-pad'}
                        onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                    />
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    width: '100%',
                    height: 60,
                    marginTop: 4
                }}>
                    <View style={{
                        height: '100%',
                        width: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#fff',
                        borderRadius: 10
                    }}>
                        <Entypo name="key" color="#a19595" size={25} />
                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderBottomColor: '#fff',
                        borderBottomWidth: 1,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        marginLeft: 3,
                    }}>
                        <TextInput
                            style={{
                                flex: 1,
                                height: 60,
                                width: '100%',
                                paddingLeft: 20,
                            }}
                            placeholderTextColor='#a19595'
                            placeholder='Mật khẩu'
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={showPassword}
                        />
                        <TouchableOpacity style={{
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 20
                        }}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {
                                showPassword ? (
                                    <AntDesign name="eye" color="#a19595" size={25} />
                                ) : (
                                        <AntDesign name="eyeo" color="#a19595" size={25} />
                                    )
                            }

                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: "center",
                    justifyContent: 'space-between',
                    marginVertical: 20
                }}>
                    <TouchableOpacity>
                        <Text style={{
                            color: '#f57811'
                        }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%',
                        marginVertical: 20
                    }}
                        onPress={onHandleLogin}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#fa9643', '#f57811']}
                            colors={['#fa9643', '#f57811']}
                            style={{
                                height: 60,
                                borderRadius: 30,
                                justifyContent: "space-around",
                                alignItems: "center",
                                flexDirection: "row"
                            }}>
                            {/* <TouchableOpacity
                                onPress={onHandleLogin}
                            > */}
                            <Text style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>Đăng Nhập</Text>
                            {/* </TouchableOpacity> */}
                            <View>
                                <AntDesign name="arrowright" color="#fff" size={25} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

            </View>

        </View >
    )
}

const styles = StyleSheet.create({

})