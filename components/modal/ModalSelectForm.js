import React, { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import { useSelector, useDispatch } from "react-redux";
import { closeModalSelectForm, opneModalSelectForm } from '../../store/action/system'
import { selectHandleFolder } from '../../store/action/folder'
import { Body, Header, Left } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FactoryService from '../../service/FactoryService'

export default ModalSelectForm = ({ navigation }) => {
    const { isOpenModalSelectForm } = useSelector(state => state.system);
    const [listForm, setListForm] = useState([])
    const dispatch = useDispatch()

    // const onHandleOpenCreateFolder = () => {
    //     dispatch(selectHandleFolder(null))
    //     dispatch(openModalCreateFolder())
    //     dispatch(closeModalAddDocument())
    // }

    // const onHandleCreateTextFile = () => {
    //     dispatch(closeModalAddDocument())
    //     navigation.navigate('TextFile')
    // }

    // const onHandleCreateImageFile = () => {
    //     dispatch(closeModalAddDocument())
    //     navigation.navigate('ImageFile')
    // }

    // const onHandleCreateGeneralFile = () => {
    //     dispatch(closeModalAddDocument())
    //     navigation.navigate('GeneralFile')
    // }

    // const onHandleSelectForm = () => {
    //     navigation.navigate('SelectForm')
    // }
    const getListForm = async () => {
        const response = await FactoryService.request('FormService').getList()
        if (response && response.data) {
            setListForm(response.data)
        }
    }
    useEffect(() => {
        if (isOpenModalSelectForm) {
            getListForm()
        }
    }, [isOpenModalSelectForm])

    const handleFillForm = (form) => {
        dispatch(closeModalSelectForm())
        navigation.navigate('FillForm', {
            formId: form.id
        })
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpenModalSelectForm}
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
                <View style={{
                    width: '100%',
                    height: '100%',
                    // borderTopLeftRadius: 20,
                    // borderTopRightRadius: 20,
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
                    <Header style={{
                        backgroundColor: '#fff',
                    }}>
                        <Left>
                            <TouchableOpacity transparent onPress={() => dispatch(closeModalSelectForm())}>
                                <Entypo name="cross" color="#000" size={25} />
                            </TouchableOpacity>
                        </Left>
                        <Body style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}>
                                Chọn Biểu Mẫu
                        </Text>
                        </Body>
                    </Header>
                    <View style={{
                        margin: 20,
                        flex: 1,
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold"
                        }}>Danh Sách Biểu Mẫu</Text>
                        <View style={{
                            flex: 1,
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            marginVertical: 14
                        }}>
                            {
                                listForm.map((form, index) => {
                                    return (
                                        <TouchableOpacity style={{
                                            width: '42%',
                                            height: 120,
                                            margin: '4%',
                                        }}
                                            key={index}
                                            onPress={() => handleFillForm(form)}
                                        >
                                            <View style={{
                                                height: '80%',
                                                borderRadius: 12,
                                                borderWidth: 1,
                                                borderColor: '#ccc',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}>
                                                <Text style={{
                                                    fontSize: 16,
                                                    textAlign: 'center',
                                                    color: '#f57811'
                                                }}>{form.name}</Text>
                                            </View>
                                            <Text style={{
                                                textAlign: 'center',
                                                marginHorizontal: 8,
                                                marginTop: 4,
                                                fontStyle: 'italic'
                                            }}>{form.description}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }




                        </View>

                    </View>

                </View>
            </View>
        </Modal>
    )
}
