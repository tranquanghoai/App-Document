import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FactoryService from '../../service/FactoryService'
import { useSelector, useDispatch } from "react-redux";
import { selectHandleSubmitFile } from '../../store/action/submit'
import { openModalFileSubmit, isFromHome, isNotFromHome } from '../../store/action/system'
import moment from 'moment';
import { getListTransition } from '../../store/action/transition'
import { domain } from '../../service/BaseService'

export default function FileVertical({ navigation, file, type }) {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const transitions = useSelector(state => state.transition.transitions)
    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }
    useEffect(() => {
        dispatch(getListTransition())
    }, []);

    const onHandlePress = () => {
        // dispatch(handleChooseFile(file.id))
        // if (file.type === 'text') {
        navigation.push('Approvement', {
            submitId: file.id,
            type
        })
        // } else if (file.type === 'image') {
        //     navigation.push('Approvement', {
        //         fileId: file.id
        //     })
        // }
    }

    const handleOpenHandleFileAction = () => {
        dispatch(selectHandleSubmitFile(file))
        dispatch(openModalFileSubmit())
        if (type === 'home') {
            dispatch(isFromHome())
        } else {
            dispatch(isNotFromHome())
        }
    }
    const statusName = file?.approved?.length ? file.approved.length < transitions.length ? 'Đang duyệt' : 'Hoàn thành' : 'Đang chờ'
    const color = file?.approved?.length ? file.approved.length < transitions.length ? 'blue' : 'green' : '#f57811'
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
                    file.fileId.type === 'image' && (
                        <View style={[styles.folderIcon, { justifyContent: "center", alignItems: "center" }]}>
                            <ImageBackground
                                style={{ flex: 1, width: '90%', marginLeft: 8 }}
                                source={{
                                    uri: file.fileId.attachFileIds && file.fileId.attachFileIds.length ? `${domain}attach-file/${file.fileId.attachFileIds[0].id}` : '',
                                    headers: { Authorization: `Bearer ${accessToken}` }
                                }}
                            >
                            </ImageBackground>
                        </View>
                    )
                }
                {
                    file.fileId.type === 'text' && (
                        <View style={styles.folderIcon}>
                            <View style={{
                                padding: 4,
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}>
                                <View style={{ height: 15 }}></View>
                                <Entypo name="text" color="#ccc" size={50} />
                            </View>
                        </View>
                    )
                }

                {
                    file.fileId.type === 'form' && (
                        <View style={styles.folderIcon}>
                            <View style={{
                                padding: 4,
                                borderColor: '#ccc',
                                borderWidth: 1
                            }}>
                                <View style={{ height: 15 }}></View>
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
                    }}>{file.fileId.name?.length > 20 ? `${file.fileId.name.substring(0, 20)}...` : file.fileId.name}</Text>
                    {/* <Text style={{
                        color: '#969490',
                        marginBottom: 4
                    }}>{file.fileId.description}</Text> */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center",
                        marginBottom: 4
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <Text>Tình trạng:</Text>
                            <Text style={{
                                marginLeft: 8,
                                color
                            }}>{statusName}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center"
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <Text>Ngày nộp:</Text>
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
                    padding: 4
                }}
                    onPress={handleOpenHandleFileAction}
                >
                    <Fontisto name="more-v-a" color="#000" size={20} />
                </TouchableOpacity>
            </View>
        </ TouchableOpacity>
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
