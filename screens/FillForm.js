import { Body, Button, Form, Header, Input, Item, Label, Left, Picker, Right, Textarea, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux"
import { handleCreateImageFile, handleChooseFile, handleUpdateImageFile } from '../store/action/file'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { domain } from '../service/BaseService'
// import * as ImagePicker from 'react-native-image-picker'
import FactoryService from '../service/FactoryService'
import { RadioButton } from 'react-native-paper';
import { showMessage, hideMessage } from "react-native-flash-message";


export default function FillForm({ navigation, route }) {
    const [name, setName] = useState('Tên Tệp Tin')
    const [description, setDescription] = useState('')
    const [form, setForm] = useState(null)
    const [fields, setFields] = useState([])
    const parentFolder = useSelector(state => state.folder.parentFolder)
    const [isNew, setIsNew] = useState(true)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const currentFile = useSelector(state => state.file.currentFile)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params?.fileId) {
                setLoading(true)
                await dispatch(handleChooseFile(route.params.fileId))
                setLoading(false)
                setIsNew(false)
            } else if (route.params?.formId) {
                setLoading(true)
                const response = await FactoryService.request('FormService').getFormDetal(route.params.formId)
                setLoading(false)
                if (response && response.data) {
                    const form = response.data
                    const fields = form.fieldIds.map(f => ({ fieldId: f.id, value: '' }))
                    setForm(form)
                    setFields(fields)
                }
            }
        });

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        if (loading) {
            global.props.showLoading()
        } else {
            global.props.hideLoading()
        }
    }, [loading]);

    useEffect(() => {
        if (!isNew) {
            if (currentFile) {
                const { name, description, content, formId, fields } = currentFile
                setName(name)
                setDescription(description)
                setForm(formId)
                setFields(fields)
            }
        }
    }, [isNew]);

    const onChangeText = (fieldId, value) => {
        const handleFields = [...fields]
        const findField = handleFields.find(f => f.fieldId === fieldId)
        if (findField) {
            findField.value = value
            setFields(handleFields)
        }
    }

    const onHandleSave = async () => {
        if (isNew) {
            createForm()
        } else {
            updateForm()
        }
    }

    const createForm = async () => {
        try {
            const filePayload = {
                name,
                description,
                folderId: parentFolder?.id ? parentFolder.id : '',
                formId: form.id,
                fields
            }
            global.props.showLoading()
            const response = await FactoryService.request('FileService').createForm(filePayload)
            showMessage({
                message: "Tạo Biểu Mẫu Thành Công",
                type: "info",
            });
            navigation.pop()
            global.props.hideLoading()
        } catch (error) {
            global.props.hideLoading()
            console.log(error, 'error')
        }
    }

    const updateForm = async () => {
        try {
            const filePayload = {
                name,
                description,
                fields
            }
            global.props.showLoading()
            const response = await FactoryService.request('FileService').updateForm(currentFile.id, filePayload)
            showMessage({
                message: "Cập Nhật Biểu Mẫu Thành Công",
                type: "info",
            });
            navigation.pop()
            global.props.hideLoading()
        } catch (error) {
            global.props.hideLoading()
            console.log(error, 'error')
        }
    }

    const getValue = (fieldId) => {
        const field = fields.find(f => f.fieldId === fieldId)
        return field ? field.value : ''
    }

    console.log(fields, 'fields')
    return (
        <View style={{
            flex: 1
        }}>
            <Header style={{
                backgroundColor: '#fff',
            }}>
                <Left>
                    <TouchableOpacity transparent onPress={() => navigation.pop()}>
                        <Feather name="arrow-left" color="#000" size={25} />
                    </TouchableOpacity>
                </Left>
                <Body style={{
                    flex: 1,
                }}>
                    <TextInput
                        style={{
                            fontSize: 18,
                            width: '100%'
                        }}
                        placeholder="Tên Tệp Tin"
                        onChangeText={(name) => setName(name)}
                        value={name}
                    >
                    </TextInput>
                </Body>

                <Right style={{
                }}>
                    <TouchableOpacity
                        transparent
                        onPress={onHandleSave}>
                        <Entypo name="save" color="#f57811" size={25} />
                    </TouchableOpacity>
                </Right>
            </Header>
            {
                form && (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        <Form style={{
                            margin: 20
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: "bold",
                                marginVertical: 8
                            }}>{form.name}</Text>
                            <Label style={{
                                fontSize: 18,
                                marginTop: 8
                            }}>Mô tả:</Label>
                            <TextInput
                                style={{
                                    height: 34,
                                    width: '80%',
                                    alignSelf: 'center',
                                    paddingBottom: 4,
                                    borderBottomColor: '#ccc',
                                    borderBottomWidth: 1,
                                    fontSize: 18,
                                    marginTop: 8
                                }}
                                multiline
                                // placeholder="Nhập thông tin mô tả"
                                onChangeText={(description) => setDescription(description)}
                                value={description}
                            >

                            </TextInput>
                            {
                                form.fieldIds.map(field => {
                                    const { isRequired, _id, description, type, priority, options, name } = field
                                    if (type === 'text') {
                                        return (
                                            <React.Fragment>
                                                <View style={{
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginVertical: 12
                                                }}>
                                                    <Label style={{
                                                        // marginLeft: -18,
                                                        fontSize: 18
                                                    }}>{name}</Label>
                                                    {
                                                        isRequired && (
                                                            <View style={{
                                                                marginLeft: 4
                                                            }}>
                                                                <FontAwesome name="asterisk" color="red" size={10} />
                                                            </View>
                                                        )
                                                    }
                                                </View>

                                                <TextInput style={{
                                                    height: 34,
                                                    width: '80%',
                                                    alignSelf: 'center',
                                                    paddingBottom: 4,
                                                    borderBottomColor: '#ccc',
                                                    borderBottomWidth: 1,
                                                    fontSize: 18
                                                }}
                                                    onChangeText={value => onChangeText(_id, value)}
                                                    value={getValue(_id)}
                                                />
                                            </React.Fragment>
                                        )
                                    } else if (type === 'select') {
                                        return (
                                            <View style={{
                                                marginVertical: 16
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row'
                                                }}>
                                                    <Label style={{
                                                        fontSize: 18
                                                    }}>{name}</Label>
                                                    {
                                                        isRequired && (
                                                            <View style={{
                                                                marginLeft: 4
                                                            }}>
                                                                <FontAwesome name="asterisk" color="red" size={10} />
                                                            </View>
                                                        )
                                                    }
                                                </View>

                                                <Item picker style={{
                                                    width: '85%',
                                                    alignSelf: 'center'
                                                }}>

                                                    <Picker
                                                        mode="dropdown"
                                                        iosIcon={<Feather name="arrow-left" color="#000" size={25} />}
                                                        style={{ width: undefined }}
                                                        placeholder="Select your SIM"
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={getValue(_id)}
                                                        onValueChange={value => onChangeText(_id, value)}
                                                    >
                                                        <Picker.Item label={'Chọn giá trị'} value={''} />
                                                        {
                                                            options.map((option, index) => {
                                                                return (
                                                                    <Picker.Item label={option} value={option} key={index} />
                                                                )
                                                            })
                                                        }
                                                    </Picker>
                                                </Item>
                                            </View>
                                        )
                                    } else if (type === 'radio') {
                                        return (
                                            <View style={{ marginVertical: 8 }}>
                                                <Label style={{
                                                    fontSize: 18
                                                }}>{name}</Label>
                                                <View style={{
                                                    width: '82%',
                                                    alignSelf: 'center',
                                                    marginTop: 8
                                                }}>
                                                    {
                                                        options.map((option, index) => {
                                                            return (
                                                                <View
                                                                    style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'space-between'
                                                                    }}
                                                                    key={index}
                                                                >
                                                                    <Label style={{
                                                                        fontSize: 18
                                                                    }}>{option}</Label>
                                                                    <RadioButton
                                                                        value={option}
                                                                        // status={checked === 'first' ? 'checked' : 'unchecked'}
                                                                        status={getValue(_id) == option ? 'checked' : 'unchecked'}
                                                                        onPress={() => onChangeText(_id, option)}
                                                                    />
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </View>
                                            </View>
                                        )
                                    } else if (type === 'textarea') {
                                        return (
                                            <View style={{ marginVertical: 8 }}>
                                                <Label style={{
                                                    fontSize: 18
                                                }}>{name}</Label>
                                                <View style={{
                                                    width: '82%',
                                                    alignSelf: 'center',
                                                    marginTop: 8
                                                }}>
                                                    <Textarea
                                                        rowSpan={5}
                                                        bordered
                                                        placeholder="Nội dung"
                                                        onChangeText={(value) => onChangeText(_id, value)}
                                                        value={getValue(_id)}
                                                        fontSize={18}
                                                    />
                                                </View>
                                            </View>
                                        )
                                    }
                                })
                            }
                        </Form>
                    </ScrollView>
                )
            }


        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 50,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 0,
        fontSize: 16
    },
    buttonStyle: {
        alignSelf: "flex-end",
        margin: 4,
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 8
    },
    textButton: {
        fontSize: 18,
        color: '#f57811'
    },

});