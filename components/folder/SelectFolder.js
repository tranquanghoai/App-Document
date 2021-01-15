import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { openModalFolderAction } from '../../store/action/system'
import { selectHandleFolder, chooseFolderDirectly } from '../../store/action/folder'
import { useSelector, useDispatch } from "react-redux";

export default function SelectFolder({ folders, navigation }) {
    const dispatch = useDispatch()
    const selectFolderTransfer = useSelector(state => state.folder.selectFolderTransfer)

    const onPressFolder = (folder) => {
        navigation.push('TransferFolder', {
            selectFolderTransferId: folder.id
        })
    }

    const handelOpenModalFolderAction = (folder) => {
        dispatch(selectHandleFolder(folder))
        dispatch(openModalFolderAction())
    }

    const selectFolderTransferDirectly = (item) => {
        dispatch(chooseFolderDirectly(item))
    }
    return (
        <FlatList
            data={folders}
            numColumns={2}
            renderItem={({ item, index }) => {
                let selectStyles = {}
                if (selectFolderTransfer?.id === item.id) {
                    selectStyles = {
                        borderColor: '#f57811',
                        borderWidth: 1,
                        borderRadius: 10,
                    }
                }
                return (
                    <TouchableOpacity style={{
                        width: '50%',
                        flexDirection: "row",
                        marginBottom: 16,
                    }}
                        delayLongPress={100}
                        onPress={() => onPressFolder(item)}
                        onLongPress={() => selectFolderTransferDirectly(item)}
                    >
                        <View style={[{
                            alignItems: "center",
                            width: '90%',
                            padding: 8,

                        }, selectStyles]}>
                            <FontAwesome name="folder" color="#ccc" size={100} style={{
                                marginVertical: -6,
                            }} />
                            <View style={{
                                flex: 1,
                                paddingHorizontal: 20,
                                justifyContent: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    textAlign: "center",
                                    lineHeight: 20,
                                }}>{item.name}</Text>
                            </View>

                        </View>
                    </TouchableOpacity >
                )
            }
            }
            keyExtractor={item => item.id}
        />
    )
}
