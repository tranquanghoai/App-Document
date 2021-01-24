import { Row } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalFileAction } from '../../store/action/system'
import { handleDeleteFile, handleLikeFile } from '../../store/action/file'
import { handleSubmitFile } from '../../store/action/submit'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';


// const CreateNewDoc = (props) => {
//     return (
//         <View style={{
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center"
//         }}>
//             <TouchableOpacity>
//                 <View style={{
//                     borderRadius: 30,
//                     borderWidth: 1,
//                     borderColor: '#c4c0b9',
//                     marginBottom: 8,
//                     width: 50,
//                     height: 50,
//                     justifyContent: "center",
//                     alignItems: "center"
//                 }}>
//                     {props.children}
//                 </View>
//                 <Text>{props.name}</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

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

export default ModalFileAction = ({ navigation }) => {
    const isOpenModalFileAction = useSelector(state => state.system.isOpenModalFileAction);
    const handleFile = useSelector(state => state.file.handleFile);
    const dispatch = useDispatch()

    const editFile = () => {
        if (handleFile.type === 'text') {
            navigation.push('TextFile', {
                fileId: handleFile.id
            })
        } else if (handleFile.type === 'image') {
            navigation.push('ImageFile', {
                fileId: handleFile.id
            })
        }
        dispatch(closeModalFileAction())
    }

    const transferFile = () => {
        navigation.push('TransferFolder', {
            fileId: handleFile.id
        })
        dispatch(closeModalFileAction())
    }

    const submitFile = () => {
        dispatch(closeModalFileAction())
        global.props.showConfirm(
            'Trình duyệt tài liệu',
            'Bạn có muốn trình duyệt tệp tin đã chọn?',
            () => dispatch(handleSubmitFile())
        )
    }

    const downloadFile = () => {
        dispatch(closeModalFileAction())
        global.props.showConfirm(
            'Tải tài liệu',
            'Bạn có muốn tải tài liệu?',
            () => { }
        )
    }

    const likeFile = () => {
        dispatch(closeModalFileAction())
        const message = handleFile.like ? 'Bạn có muốn xóa tài liệu khỏi danh sách yêu thích?' : 'Bạn có muốn thêm tài liệu vào danh sách yêu thích?'
        global.props.showConfirm(
            'Yêu thích',
            message,
            () => dispatch(handleLikeFile())
        )
    }

    const deleteFile = () => {
        dispatch(closeModalFileAction())
        global.props.showConfirm(
            'Xóa tệp tin',
            'Bạn có muốn xóa tệp tin đã chọn?',
            () => dispatch(handleDeleteFile())
        )
    }

    const shareFile = () => {
        navigation.push('ShareFile')
        dispatch(closeModalFileAction())
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalFileAction}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalFileAction())} >
                    <View style={{
                        width: '100%',
                        height: '45%',
                    }}>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{
                    width: '100%',
                    height: '55%',
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
                        handleFile && (
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
                                        }}>{handleFile.name}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <TouchableOpacity onPress={shareFile}>
                                        <FileAction iconName="sharealt" text="Chia sẻ" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={submitFile}>
                                        <FileAction iconName="upload" text="Trình duyệt tệp tin" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={transferFile}>
                                        <FileAction iconName="swap" text="Chuyển thư mục" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={editFile}>
                                        <FileAction iconName="edit" text="Chỉnh sửa" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={likeFile}>
                                        <FileAction iconName="like2" text={handleFile.like ? 'Xóa tệp tin khỏi danh mục yêu thích' : "Thêm vào danh sách yêu thích"} />
                                    </TouchableOpacity>
                                    {/* <TouchableOpacity onPress={downloadFile}>
                                        <FileAction iconName="download" text="Tải xuống" />
                                    </TouchableOpacity> */}
                                    <TouchableOpacity onPress={deleteFile}>
                                        <FileAction iconName="delete" text="Xóa" />
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
