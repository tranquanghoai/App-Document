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
import { openModalShareAction } from '../../store/action/system'
import { chooseHandleShare } from '../../store/action/share'
import moment from 'moment';
import { domain } from '../../service/BaseService'
export default function FileVerticalShared({ navigation, file }) {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const employee = useSelector(state => state.auth.employee)
    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }

    const onHandlePress = () => {
        if (file.fileId.type === 'text') {
            navigation.push('TextFile', {
                fileId: file.fileId.id,
                shareId: file.id
            })
        } else if (file.fileId.type === 'image') {
            navigation.push('ImageFile', {
                fileId: file.fileId.id,
                shareId: file.id
            })
        } else if (file.fileId.type === 'form') {
            navigation.push('FillForm', {
                fileId: file.fileId.id,
                shareId: file.id
            })
        }
    }

    const handleOpenHandleFileShareAction = () => {
        dispatch(chooseHandleShare(file))
        dispatch(openModalShareAction())
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
                <View style={{
                    width: 40,
                    height: 40,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 40,
                    marginRight: -10
                }}>
                    <Text>{file.ownerId?.username ? file.ownerId?.username[0] : '?'}</Text>
                </View>
                {
                    file.fileId.type === 'image' && (
                        <View style={[styles.folderIcon]}>
                            <ImageBackground
                                style={{
                                    flex: 1, width: '100%', maxWidth: 60, justifyContent: "center", alignItems: "center", alignSelf: 'center',
                                }}
                                source={{
                                    uri: `${domain}attach-file/${file.fileId.attachFileIds[0]}`,
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
                            {
                                file.fileId.type === 'text' && (
                                    <View style={{
                                        padding: 4,
                                        borderColor: '#ccc',
                                        borderWidth: 1
                                    }}>
                                        {
                                            // file.fileId.like ? (
                                            //     <Entypo name="star" color="#f57811" size={15} />
                                            // ) : (
                                            //     )
                                            <View style={{ height: 15 }}></View>
                                        }
                                        <Entypo name="text" color="#ccc" size={50} />
                                    </View>
                                )
                            }
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
                    <Text style={{
                        color: '#969490',
                        marginBottom: 4
                    }}>{file.fileId.description}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center"
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <AntDesign name="adduser" color="#f57811" size={15} />
                            <Text style={{
                                marginLeft: 8
                            }}>{file.ownerId.username}</Text>
                        </View>
                    </View>
                </View>
                {
                    employee && employee._id === file.ownerId.id && (
                        <TouchableOpacity style={{
                            width: '5%',
                            justifyContent: "center",
                            alignItems: "flex-end",
                            padding: 4
                        }}
                            onPress={handleOpenHandleFileShareAction}
                        >
                            <Fontisto name="more-v-a" color="#000" size={20} />
                        </TouchableOpacity>
                    )
                }

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
