import { Row } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalFileSubmit, closeModalShareAction } from '../../store/action/system'
import { handleDeleteFile, handleLikeFile } from '../../store/action/file'
import { cancelSubmitFile } from '../../store/action/submit'
import { handleOwnerDeleteShare } from '../../store/action/share'
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

export default ModalShareAction = ({ navigation }) => {
    const isOpenModalShareAction = useSelector(state => state.system.isOpenModalShareAction);
    const employee = useSelector(state => state.auth.employee);
    const handleShare = useSelector(state => state.share.handleShare);
    const dispatch = useDispatch()

    const ownerDeleteShare = () => {
        global.props.showConfirm(
            'Ngừng chia sẽ',
            'Bạn có muốn ngừng chia sẽ tập tin đã chọn?',
            () => dispatch(handleOwnerDeleteShare())
        )
        dispatch(closeModalShareAction())
    }

    const shareStatus = () => {
        navigation.push('ShareFile', { edit: true })
        dispatch(closeModalShareAction())
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalShareAction}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalShareAction())} >
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
                        handleShare && (
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
                                        }}>{handleShare.fileId.name}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1,
                                }}>
                                    {
                                        employee && employee._id === handleShare.ownerId.id && (
                                            <React.Fragment>
                                                <TouchableOpacity onPress={ownerDeleteShare}>
                                                    <FileAction iconName="edit" text="Ngừng chia sẽ" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={shareStatus}>
                                                    <FileAction iconName="pushpino" text="Xem tình trạng chia sẽ" />
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        )

                                    }

                                    {
                                        employee && employee._id !== handleShare.ownerId.id && (
                                            <React.Fragment>
                                                <TouchableOpacity onPress={() => { }}>
                                                    <FileAction iconName="edit" text="Bỏ tệp tin được chia sẽ" />
                                                </TouchableOpacity>
                                            </React.Fragment>
                                        )

                                    }

                                </View>
                            </React.Fragment>
                        )
                    }

                </View>
            </View>
        </Modal>
    )
}
