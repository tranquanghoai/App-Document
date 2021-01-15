import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { openModalFolderAction } from '../../store/action/system'
import { selectHandleFolder } from '../../store/action/folder'
import { useSelector, useDispatch } from "react-redux";

export default function FolderHorizontal({ folders, navigation }) {
    const dispatch = useDispatch()

    const onPressFolder = (folder) => {
        navigation.push('DocumentList', {
            parentFolderId: folder.id
        })
    }

    const handelOpenModalFolderAction = (folder) => {
        dispatch(selectHandleFolder(folder))
        dispatch(openModalFolderAction())
    }
    return (
        <FlatList
            data={folders}
            numColumns={2}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity style={{
                        width: '50%',
                        flexDirection: "row",
                        marginBottom: 16,
                        // backgroundColor: 'green'
                    }}
                        onPress={() => onPressFolder(item)}
                    >
                        <View style={{
                            alignItems: "center",
                            width: '90%',
                        }}>
                            <FontAwesome name="folder" color="#ccc" size={100} style={{
                                marginVertical: -6,
                            }} />
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
                                }}>{item.name}</Text>
                            </View>

                        </View>
                        <View style={{
                            width: '10%',
                            justifyContent: "flex-end"
                        }}>
                            <TouchableOpacity style={{
                                width: '100%',
                                height: 40,
                                justifyContent: "center",
                                alignItems: 'center'
                            }}
                                onPress={() => handelOpenModalFolderAction(item)}
                            >
                                <Fontisto name="more-v-a" color="#000" size={18} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )
            }
            }
            keyExtractor={item => item.id}
        />
    )
}
