import React from 'react'
import { View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector, useDispatch } from "react-redux";
import { chooseHandleFile } from '../../store/action/file'
import { openModalFileAction } from '../../store/action/system'
import { domain } from '../../service/BaseService'

export default function FileHorizontalShare({ listShare, navigation }) {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)

    const handleOpenHandleFileAction = (file) => {
        dispatch(chooseHandleFile(file))
        dispatch(openModalFileAction())
    }

    const onHandlePress = (file) => {
        if (file.fileId.type === 'text') {
            navigation.push('TextFile', {
                fileId: file.fileId.id
            })
        } else if (file.fileId.type === 'image') {
            navigation.push('ImageFile', {
                fileId: file.fileId.id
            })
        } else if (file.fileId.type === 'form') {
            navigation.push('FillForm', {
                fileId: file.fileId.id
            })
        }
    }
    return (
        <FlatList
            data={listShare}
            numColumns={2}
            renderItem={({ item, index }) => {
                console.log(item, 'item')
                return (
                    <TouchableOpacity style={{
                        width: '40%',
                        flexDirection: "row",
                        marginBottom: 16,
                        marginHorizontal: '5%',
                        // backgroundColor: 'red'
                    }}
                        onPress={() => onHandlePress(item)}
                    >
                        <View style={{
                            alignItems: "center",
                            width: '90%',
                            height: 140
                        }}>
                            <View style={{
                                width: '100%',
                                height: '70%',
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                {
                                    item.fileId.type === 'image' && item.fileId.attachFileIds.length && (
                                        <ImageBackground
                                            style={{
                                                flex: 1,
                                                width: '100%',
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: 5,
                                                overflow: "hidden",
                                            }}
                                            source={{
                                                uri: `${domain}attach-file/${item.fileId.attachFileIds[0]}`,
                                                headers: { Authorization: `Bearer ${accessToken}` }
                                            }}>
                                        </ImageBackground>
                                    )
                                }
                                {
                                    item.fileId.type === 'text' && (
                                        <View style={{
                                            padding: 8,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 5
                                        }}>
                                            <Entypo name="text" color="#ccc" size={50} />
                                        </View>

                                    )
                                }

                                {
                                    item.fileId.type === 'form' && (
                                        <View style={{
                                            padding: 8,
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 5
                                        }}>
                                            <AntDesign name="profile" color="#ccc" size={50} />
                                        </View>

                                    )
                                }
                            </View>
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                justifyContent: 'center',
                                height: 40
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    lineHeight: 20,
                                }}>{item.fileId.name}</Text>
                            </View>

                        </View>
                        {/* <View style={{
                            width: '10%',
                            justifyContent: "flex-end"
                        }}>
                            <TouchableOpacity style={{
                                width: '100%',
                                height: 40,
                                justifyContent: "center",
                                alignItems: 'center'
                            }}
                                onPress={() => handleOpenHandleFileAction(item.fileId)}
                            >
                                <Fontisto name="more-v-a" color="#000" size={18} />
                            </TouchableOpacity>
                        </View> */}
                    </TouchableOpacity>
                )
            }
            }
            keyExtractor={item => item.id}
        />
    )
}
