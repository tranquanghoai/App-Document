import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalAddDocument, openModalCreateFolder } from '../../store/action/system'
import { selectHandleFolder } from '../../store/action/folder'
const CreateNewDoc = (props) => {
    const { name, onHandlePress } = props
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity onPress={
                () => onHandlePress()
            }>
                <View style={{
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#c4c0b9',
                    marginBottom: 8,
                    width: 50,
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    {props.children}
                </View>
                <Text>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalAddDocument = ({ navigation }) => {
    const { isOpenModalAddDocument } = useSelector(state => state.system);
    const dispatch = useDispatch()

    const onHandleOpenCreateFolder = () => {
        dispatch(selectHandleFolder(null))
        dispatch(openModalCreateFolder())
        dispatch(closeModalAddDocument())
    }

    const onHandleCreateTextFile = () => {
        dispatch(closeModalAddDocument())
        navigation.navigate('TextFile')
    }

    const onHandleCreateImageFile = () => {
        dispatch(closeModalAddDocument())
        navigation.navigate('ImageFile')
    }

    const onHandleCreateGeneralFile = () => {
        dispatch(closeModalAddDocument())
        navigation.navigate('GeneralFile')
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalAddDocument}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalAddDocument())} >
                    <View style={{
                        width: '100%',
                        height: '75%',
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: '100%',
                    height: '25%',
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
                    paddingVertical: 5
                }}>
                    <Text style={{
                        alignSelf: "center",
                        fontSize: 18,
                    }}>Tạo Dữ Liệu</Text>
                    <View style={{
                        flex: 1
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: "row"
                        }}>
                            <CreateNewDoc name="Folder" onHandlePress={onHandleOpenCreateFolder}>
                                <AntDesign name="folder1" color="#f57811" size={20} />
                            </CreateNewDoc>
                            <CreateNewDoc name="Văn Bản" onHandlePress={onHandleCreateTextFile}>
                                <AntDesign name="filetext1" color="#f57811" size={20} />
                            </CreateNewDoc>
                            <CreateNewDoc name="Hình Ảnh" onHandlePress={onHandleCreateImageFile}>
                                <Foundation name="photo" color="#f57811" size={20} />
                            </CreateNewDoc>
                            <CreateNewDoc name="Tệp Tin" onHandlePress={onHandleCreateGeneralFile}>
                                <AntDesign name="upload" color="#f57811" size={20} />
                            </CreateNewDoc>
                            <CreateNewDoc name="Biểu mẫu">
                                <AntDesign name="form" color="#f57811" size={20} />
                            </CreateNewDoc>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}
