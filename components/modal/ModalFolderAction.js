import { Row } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalFolderAction, openModalCreateFolder } from '../../store/action/system'
import { handleDeleteFolder, handleLikeFolder } from '../../store/action/folder'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

export const FileAction = ({ iconName, text }) => {
    return (
        <View style={{
            marginVertical: 4,
            width: '100%',
            height: 30,
            flexDirection: "row",
            alignItems: "center"
        }}>
            <AntDesign name={iconName} color="#fa9643" size={22} />
            <Text style={{
                marginLeft: 22,
                fontSize: 16
            }}>{text}</Text>
        </View>
    )
}

export default ModalFolderAction = () => {
    const isOpenModalFolderAction = useSelector(state => state.system.isOpenModalFolderAction);
    const folder = useSelector(state => state.folder.handleFolder)

    const dispatch = useDispatch()

    const updateFolder = () => {
        dispatch(closeModalFolderAction())
        dispatch(openModalCreateFolder())
    }


    const deleteFolder = () => {
        dispatch(closeModalFolderAction())
        global.props.showConfirm(
            'Xóa thư mục',
            'Bạn có muốn xóa thư mục đã chọn?',
            () => dispatch(handleDeleteFolder())
        )
    }


    const addFavouriteFolder = () => {
        dispatch(closeModalFolderAction())
        const message = folder.like ? 'Bạn có muốn xóa thư mục khỏi danh sách yêu thích?' : 'Bạn có muốn thêm thư mục vào danh sách yêu thích?'
        global.props.showConfirm(
            'Xác nhận',
            message,
            () => dispatch(handleLikeFolder())
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalFolderAction}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
            }}
        >

            <View style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
                backgroundColor: 'rgba(0, 0, 0, 0.4)'
            }}>
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalFolderAction())} >
                    <View style={{
                        width: '100%',
                        height: '70%',
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: '100%',
                    height: '30%',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: '#fff',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 1,
                    paddingVertical: 5,
                    paddingHorizontal: 30,
                }}>
                    {
                        folder && (
                            <React.Fragment>
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 8,
                                    borderBottomColor: '#ccc',
                                    borderBottomWidth: 1,
                                    marginBottom: 16,
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: "space-around",
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: "bold"
                                        }}>{folder.name}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <TouchableOpacity onPress={updateFolder}>
                                        <FileAction iconName="edit" text="Chỉnh sửa" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={deleteFolder}>
                                        <FileAction iconName="delete" text="Xóa" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={addFavouriteFolder}>
                                        <FileAction iconName="like2" text={folder.like ? "Xóa thư mục khỏi danh sách yêu thích" : "Thêm vào danh sách yêu thích"} />
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )
                    }

                </View>
            </View>
        </Modal>
    )
}
