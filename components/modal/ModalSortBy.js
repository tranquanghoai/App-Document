import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalAddDocument, openModalCreateFolder, openModalSelectForm } from '../../store/action/system'
import { onSelectSortBy } from '../../store/action/overview'
import { closeModalSortDoc } from '../../store/action/system'
// }

export const SelectAction = ({ sortBy, sortValue, text, value }) => {
    return (
        <View style={{
            marginVertical: 4,
            width: '100%',
            height: 30,
            flexDirection: "row",
            alignItems: "center"
        }}>
            {
                sortBy === value ? (
                    <View style={{
                        width: 30,
                        height: '100%',
                        justifyContent: 'center'
                    }}>
                        {
                            sortValue === 1 ? (
                                <AntDesign name="arrowup" color="#fa9643" size={22} />
                            ) : (
                                    <AntDesign name="arrowdown" color="#fa9643" size={22} />
                                )
                        }
                    </View>
                ) : (
                        <View style={{
                            width: 30,
                        }}></View>
                    )
            }
            <Text style={{
                marginLeft: 22,
                fontSize: 16
            }}>{text}</Text>
        </View>
    )
}

export default ModalSortBy = ({ navigation }) => {
    const { isOpenSort } = useSelector(state => state.system)
    const { sortBy, sortValue } = useSelector(state => state.overview)
    const dispatch = useDispatch()

    const onSelectName = () => {
        dispatch(onSelectSortBy(0))
        dispatch(closeModalSortDoc())
    }
    const onSelectCreatedDate = () => {
        dispatch(onSelectSortBy(1))
        dispatch(closeModalSortDoc())
    }
    const onSelectUpdatedDate = () => {
        dispatch(onSelectSortBy(2))
        dispatch(closeModalSortDoc())
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenSort}
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
                <TouchableWithoutFeedback onPress={() => dispatch(closeModalSortDoc())} >
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
                    paddingHorizontal: 16
                }}>
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
                            }}>Sắp Xếp Tài Liệu</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <TouchableOpacity onPress={onSelectName}>
                            <SelectAction text="Tên tài liệu" sortBy={sortBy} sortValue={sortValue} value={0} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSelectCreatedDate}>
                            <SelectAction text="Ngày tạo" sortBy={sortBy} sortValue={sortValue} value={1} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onSelectUpdatedDate}>
                            <SelectAction text="Ngày cập nhật" sortBy={sortBy} sortValue={sortValue} value={2} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}
