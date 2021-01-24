import { Row } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalFileSubmit } from '../../store/action/system'
import { handleDeleteFile, handleLikeFile } from '../../store/action/file'
import { cancelSubmitFile } from '../../store/action/submit'
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

export default ModalFileSubmitAction = ({ navigation }) => {
    const isOpenModalFileSubmit = useSelector(state => state.system.isOpenModalFileSubmit);
    const selectSubmitFile = useSelector(state => state.submit.selectSubmitFile);
    const dispatch = useDispatch()

    // const editFile = () => {
    //     if (handleFile.type === 'text') {
    //         navigation.push('TextFile', {
    //             fileId: handleFile.id
    //         })
    //     } else if (handleFile.type === 'image') {
    //         navigation.push('ImageFile', {
    //             fileId: handleFile.id
    //         })
    //     }
    //     dispatch(closeModalFileSubmit())
    // }

    // const transferFile = () => {
    //     navigation.push('TransferFolder', {
    //         fileId: handleFile.id
    //     })
    //     dispatch(closeModalFileSubmit())
    // }

    // const submitFile = () => {
    //     dispatch(closeModalFileSubmit())
    //     global.props.showConfirm(
    //         'Trình Duyệt tài liệu',
    //         'Bạn có muốn nộp tệp tin đã chọn?',
    //         () => dispatch(selectSubmitFile())
    //     )
    // }

    // const downloadFile = () => {
    //     dispatch(closeModalFileSubmit())
    //     global.props.showConfirm(
    //         'Tải tài liệu',
    //         'Bạn có muốn tải tài liệu?',
    //         () => { }
    //     )
    // }

    // const likeFile = () => {
    //     dispatch(closeModalFileSubmit())
    //     const message = handleFile.like ? 'Bạn có muốn xóa tài liệu khỏi danh sách yêu thích?' : 'Bạn có muốn thêm tài liệu vào danh sách yêu thích?'
    //     global.props.showConfirm(
    //         'Yêu thích',
    //         message,
    //         () => dispatch(handleLikeFile())
    //     )
    // }

    // const deleteFile = () => {
    //     dispatch(closeModalFileSubmit())
    //     global.props.showConfirm(
    //         'Xóa tệp tin',
    //         'Bạn có muốn xóa tệp tin đã chọn?',
    //         () => dispatch(handleDeleteFile())
    //     )
    // }

    const detailSubmitFile = () => {
        if (selectSubmitFile.fileId.type === 'text') {
            navigation.push('TextFile', {
                fileId: selectSubmitFile.fileId.id
            })
        } else if (selectSubmitFile.fileId.type === 'image') {
            navigation.push('ImageFile', {
                fileId: selectSubmitFile.fileId.id
            })
        } else if (selectSubmitFile.fileId.type === 'form') {
            navigation.push('FillForm', {
                fileId: selectSubmitFile.fileId.id
            })
        }
        dispatch(closeModalFileSubmit())
    }

    const cancleSubmit = () => {
        global.props.showConfirm(
            'Hủy Trình Duyệt',
            'Bạn có muốn hủy nộp tệp tin này?',
            () => dispatch(cancelSubmitFile())
        )
        dispatch(closeModalFileSubmit())
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalFileSubmit}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalFileSubmit())} >
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
                        selectSubmitFile && (
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
                                        }}>{selectSubmitFile.fileId.name}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    <TouchableOpacity onPress={cancleSubmit}>
                                        <FileAction iconName="edit" text="Hủy Trình Duyệt" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={cancleSubmit}>
                                        <FileAction iconName="pushpino" text="Ghim" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={detailSubmitFile}>
                                        <FileAction iconName="filetext1" text="Xem tệp tin" />
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
