import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FactoryService from '../../service/FactoryService'
import { useSelector, useDispatch } from "react-redux";
import { chooseHandleFile } from '../../store/action/file'
import { openModalFileAction, isFromHome, isNotFromHome } from '../../store/action/system'
import moment from 'moment';
import { domain } from '../../service/BaseService';

export default function FileVertical({ navigation, file, type }) {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }

    const onHandlePress = () => {
        if (file.type === 'text') {
            navigation.push('TextFile', {
                fileId: file.id
            })
        } else if (file.type === 'image') {
            navigation.push('ImageFile', {
                fileId: file.id
            })
        } else if (file.type === 'form') {
            navigation.push('FillForm', {
                fileId: file.id
            })
        }
    }

    const handleOpenHandleFileAction = () => {
        dispatch(chooseHandleFile(file))
        dispatch(openModalFileAction())
        console.log(type, 'type')
        console.log(type == 'home', 'type')
        if (type == 'home') {
            console.log('Vo home')
            dispatch(isFromHome())
        } else {
            dispatch(isNotFromHome())
        }
    }
    if (file.attachFileIds && file.attachFileIds.length) {
        console.log(`${domain}attach-file/${file.attachFileIds[0].id}`)
    }
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onHandlePress}
        >
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: "center",
                marginVertical: 15,
                borderRadius: 30,
                overflow: "hidden",
                padding: 8,
            }}>
                {
                    file.type === 'image' && (
                        <View style={[styles.folderIcon, { justifyContent: "center", alignItems: "center" }]}>
                            <ImageBackground
                                style={{ flex: 1, width: '90%', marginLeft: 8 }}
                                source={{
                                    uri: file.attachFileIds && file.attachFileIds.length ? `${domain}attach-file/${file.attachFileIds[0].id}` : '',
                                    headers: { Authorization: `Bearer ${accessToken}` }
                                }}
                            >
                                {

                                    file.like && (
                                        <View style={{
                                            width: 20,
                                            height: 20,
                                            // backgroundColor: 'red',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Entypo name="star" color="#f57811" size={15} />
                                        </View>
                                    )
                                }
                            </ImageBackground>
                        </View>
                    )
                }
                {
                    file.type === 'text' && (
                        <View style={styles.folderIcon}>
                            <View style={{
                                padding: 4,
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}>
                                {
                                    file.like ? (
                                        <Entypo name="star" color="#f57811" size={15} />
                                    ) : (
                                            <View style={{ height: 15 }}></View>
                                        )
                                }
                                <Entypo name="text" color="#ccc" size={50} />
                            </View>
                        </View>
                    )
                }

                {
                    file.type === 'form' && (
                        <View style={styles.folderIcon}>
                            <View style={{
                                padding: 4,
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}>
                                {
                                    file.like ? (
                                        <Entypo name="star" color="#f57811" size={15} />
                                    ) : (
                                            <View style={{ height: 15 }}></View>
                                        )
                                }
                                <AntDesign name="profile" color="#ccc" size={50} />
                            </View>
                        </View>
                    )
                }

                <View style={{
                    flex: 1,
                    height: '100%',
                    marginLeft: 8,
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 12
                    }}>{file.name?.length > 20 ? `${file.name.substring(0, 20)}...` : file.name}</Text>
                    <Text style={{
                        color: '#969490',
                        marginBottom: 4
                    }}>{file.description}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center"
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <AntDesign name="calendar" color="#fa9643" size={15} />
                            <Text style={{
                                marginLeft: 8
                            }}>{formatDate(file.updatedAt)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{
                    width: '5%',
                    justifyContent: "center",
                    alignItems: "flex-end",
                    padding: 4,
                }}
                    onPress={handleOpenHandleFileAction}
                >
                    <Fontisto name="more-v-a" color="#000" size={20} />
                </TouchableOpacity>
            </View>
        </ TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    folderIcon: {
        height: 80,
        width: '30%',
        padding: 0,
        margin: 0,
        justifyContent: "center",
        justifyContent: "center",
        alignItems: "center",

    }
})
