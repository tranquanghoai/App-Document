import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from "react-redux"
import { resetAuth } from '../store/action/auth'


const UserInfo = ({ title, value, icon }) => {
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <AntDesign name={icon} color="#000" size={20} />
                <Text style={{
                    fontSize: 16,
                    marginLeft: 8,
                    fontWeight: 'bold'
                }}>{title}</Text>
            </View>

            <View style={{
                // flex: 1
            }}>
                <Text style={{
                    fontSize: 16
                }}>{value}</Text>
            </View>
        </View>
    )
}

const HandleUser = ({ name, icon, color }) => {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10
        }}>
            <AntDesign name={icon} color={color ? color : '#000'} size={25} />
            <Text style={{
                marginLeft: 20,
                fontSize: 16
            }}>{name}</Text>
        </View>
    )
}

export default function PersonalInfo({ navigation }) {
    const dispatch = useDispatch()
    const onHanldeLogout = async () => {
        await AsyncStorage.clear()
        navigation.navigate('Login')
        dispatch(resetAuth())
    }
    return (
        <View style={{
            flex: 1
        }}>
            <Container style={{
                flex: 1
            }}>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => navigation.pop()}>
                            <Feather name="arrow-left" color="#000" size={25} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{
                        flex: 1,
                        // backgroundColor: 'green'
                    }}>
                        {/* <Title style={{
                            color: '#000'
                        }}>Thông Tin Cá Nhân</Title> */}
                        <Text style={{
                            fontSize: 18,
                            // backgroundColor: 'red'
                            fontWeight: 'bold'
                        }}>
                            Thông Tin Cá Nhân
                        </Text>
                    </Body>
                    {/* <Right>
                        <TouchableOpacity onPress={() => { }}>
                            <Button transparent>
                                <Entypo name="save" color="#f57811" size={25} />
                            </Button>
                        </TouchableOpacity>
                    </Right> */}
                </Header>
                <View style={{
                    margin: 20
                }}>
                    <View style={{
                        marginVertical: 20
                    }}>
                        <Image
                            style={[
                                {
                                    width: 80,
                                    height: 80,
                                    borderRadius: 80,
                                    alignSelf: 'center',
                                }
                            ]}
                            source={{ uri: "https://www.bridgestorecovery.com/wp-content/uploads/2017/10/Understanding-BPD-Emotional-Manipulation-Techniques-and-How-Treatment-Can-Help-1280x720.jpg" }}
                        />
                        <Text style={{
                            alignSelf: 'center',
                            fontSize: 18,
                            fontWeight: '400',
                            marginTop: 8
                        }}>Tran Quang Hoai</Text>
                    </View>
                    <View style={{
                        marginVertical: 10
                    }}>
                        <UserInfo title="Số điện thoại" value="0372781039" icon="phone" />
                        <UserInfo title="Email" value="tranquanghoai@gmail.com" icon="mail" />
                        <UserInfo title="Địa chỉ" value="Thành phố Hà Nội" icon="home" />
                        <View style={{
                            width: 250,
                            height: 1,
                            backgroundColor: '#ccc',
                            alignSelf: 'center',
                            marginVertical: 20
                        }} />
                    </View>

                    <HandleUser name="Thiết Lập" icon="setting" />
                    <HandleUser name="Thông Tin" icon="infocirlceo" color="green" />
                    <TouchableOpacity onPress={onHanldeLogout}>
                        <HandleUser name="Đăng Xuất" icon="logout" color="red" />
                    </TouchableOpacity>

                </View>

            </Container>
        </View>
        // <View>
        //     <View style={styles.formContainer}>
        //         <Image
        //             source={{ uri: 'ic_logo_content' }}
        //             resizeMode="stretch"
        //             style={[
        //                 styles.logo,
        //                 {
        //                     alignSelf: 'center',
        //                 },
        //             ]}
        //         />
        //     </View>
        //     <View style={styles.rowInfo}>
        //         <View style={{ ...styles.headerRowInfo }}>
        //             <View style={{ ...styles.titleHeaderRowInfo }}>
        //                 <IconAntDesign
        //                     style={{ ...styles.iconSearch, fontWeight: 'bold' }}
        //                     name="infocirlce"
        //                     color={'red'}
        //                     size={25}
        //                 />
        //                 <TouchableOpacity>
        //                     <Text style={styles.txtTitleHeaderRowInfo}>
        //                         about us
        //                         </Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </View>
        //     <View style={styles.rowInfo}>
        //         <View style={{ ...styles.titleHeaderRowInfo }}>
        //             <IconAntDesign
        //                 style={{ ...styles.iconSearch, fontWeight: 'bold' }}
        //                 name="infocirlce"
        //                 color={'red'}
        //                 size={25}
        //             />
        //             <TouchableOpacity>
        //                 <Text style={styles.txtTitleHeaderRowInfo}>
        //                     about us
        //                     </Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     <View style={styles.rowInfo}>
        //         <View style={{ ...styles.titleHeaderRowInfo }}>
        //             <IconAntDesign
        //                 style={{ ...styles.iconSearch, fontWeight: 'bold' }}
        //                 name="infocirlce"
        //                 color={'red'}
        //                 size={25}
        //             />
        //             <TouchableOpacity>
        //                 <Text style={styles.txtTitleHeaderRowInfo}>
        //                     about us
        //                     </Text>
        //             </TouchableOpacity>
        //         </View>
        //     </View>
        //     {/* <View
        //             style={{
        //                 flex: 1,
        //                 justifyContent: 'flex-end',
        //                 alignItems: 'center',
        //                 marginBottom: Mixins.scale(10),
        //             }}>
        //             <MyText
        //                 about us
        //                 addSize={2}
        //                 style={{
        //                     color: '#A0A0A0',
        //                 }}
        //             />
        //         </View> */}
        // </View>
    );
}
const styles = StyleSheet.create({
    logo: {},
    formContainer: {
        flex: 3 / 4,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: 'white',
        paddingBottom: 30,
    },
    titleHeader: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    rowInfo: {
        width: '100%',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    headerRowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleHeaderRowInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtTitleHeaderRowInfo: {
        fontSize: 18,
        color: '#000',
        marginLeft: 16,
    },
    txtContent: {
        fontSize: 18,
        color: '#000',
    },
});
