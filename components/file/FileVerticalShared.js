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
import { openModalFileSubmit } from '../../store/action/system'
import moment from 'moment';

export default function FileVertical({ navigation, file }) {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }

    const onHandlePress = () => {
        // dispatch(handleChooseFile(file.id))
        // if (file.type === 'text') {
        navigation.push('Approvement', {
            fileId: file.id
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
                    file.fileId.type === 'image' && file.fileId.attachFileIds.length ? (
                        <View style={[styles.folderIcon, { justifyContent: "center", alignItems: "center" }]}>
                            <ImageBackground
                                style={{ flex: 1, width: '100%', padding: 4, justifyContent: "center", alignItems: "center" }}
                                source={{
                                    uri: `http://192.168.1.11:3000/attach-file/${file.fileId.attachFileIds[0].id}`,
                                    headers: { Authorization: `Bearer ${accessToken}` }
                                }}
                            >
                                {/* {
                                    file.type === 'text' ? (<Entypo name="text" color="#ccc" size={50} />)
                                        : (<Entypo name="image" color="#ccc" size={50} />)
                                } */}
                            </ImageBackground>
                        </View>
                    ) : (
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
