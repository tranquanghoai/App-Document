import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import FactoryService from '../../service/FactoryService'
import { useSelector, useDispatch } from "react-redux";
import { getListFolder, chooseParentFolder, directChooseParentFolder } from '../../store/action/folder'
import { openModalFolderAction } from '../../store/action/system'
import { selectHandleFolder } from '../../store/action/folder'

import moment from 'moment';
export default function FolderVertical({ navigation, folder }) {
    const formatDate = (date) => {
        return moment(date).format("DD-MM-YYYY")
    }
    const onPressFolder = () => {
        navigation.push('DocumentList', {
            parentFolderId: folder.id
        })
    }
    const dispatch = useDispatch()

    const handelOpenModalFolderAction = () => {
        dispatch(selectHandleFolder(folder))
        dispatch(openModalFolderAction())
    }
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={onPressFolder}
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
                    height: 80,
                    width: '30%',
                    padding: 0,
                    margin: 0,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: 'red'
                }}>
                    {
                        folder.like && (
                            <View style={{
                                position: 'absolute',
                                left: 20,
                                top: 12,
                                elevation: 1
                            }}>
                                <Entypo name="star" color="#f57811" size={15} />
                            </View>
                        )
                    }
                    <FontAwesome name="folder" color="#ccc" size={75} style={{
                        marginVertical: -6,
                    }}>
                    </FontAwesome>
                </View>
                <View style={{
                    flex: 1,
                    height: '100%',
                    marginLeft: 8
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        marginBottom: 12
                    }}>{folder.name}</Text>
                    <Text style={{
                        color: '#969490',
                        marginBottom: 4
                    }}>{folder.description}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: "center"
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                        }}>
                            <FontAwesome name="folder-open-o" color="#fa9643" size={15} />
                            <Text style={{
                                marginLeft: 8
                            }}>{folder.childrenIds.length}</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center",
                            marginLeft: 16,
                        }}>
                            <FontAwesome name="file-o" color="#fa9643" size={15} />
                            <Text style={{
                                marginLeft: 8
                            }}>{folder.fileIds.length}</Text>
                        </View>
                        {/* <View style={{
                            flexDirection: 'row',
                            marginLeft: 16,
                            alignItems: "center"
                        }}>
                            <AntDesign name="calendar" color="#fa9643" size={15} />
                            <Text style={{
                                marginLeft: 8
                            }}>{formatDate(folder.updatedAt)}</Text>
                        </View> */}
                    </View>
                </View>
                <TouchableOpacity style={{
                    width: '5%',
                    justifyContent: "center",
                    alignItems: "flex-end",
                    padding: 4,
                }}
                    onPress={() => handelOpenModalFolderAction()}
                >
                    <Fontisto name="more-v-a" color="#000" size={20} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}
