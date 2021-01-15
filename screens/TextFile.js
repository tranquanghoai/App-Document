import { Body, Button, Header, Input, Item, Label, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { TextInput } from 'react-native-gesture-handler';
import ModalAddFileInfo from '../components/modal/ModalAddFileInfo'
import { useSelector, useDispatch } from "react-redux"
import { openModalAddFileInfo } from '../store/action/system'
import { handleCreateTextFile, handleChooseFile, handleUpdateTextFile } from '../store/action/file'

export default function TextFile({ navigation, route }) {
    const [name, setName] = useState('Tên tệp tin')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [isNew, setIsNew] = useState(true)
    const currentFile = useSelector(state => state.file.currentFile)
    const [displayAsterisk, setDisplayAsterisk] = useState(false)
    const dispatch = useDispatch()

    const onHandleSaveFile = () => {
        if (!name) return
        if (isNew) {
            dispatch(handleCreateTextFile(name, description, content)).then((result) => {
                navigation.pop()
            })
        } else {
            dispatch(handleUpdateTextFile(name, description, content)).then((result) => {
                navigation.pop()
            })
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params?.fileId) {
                await dispatch(handleChooseFile(route.params.fileId))
                setIsNew(false)
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (!isNew) {
            if (currentFile) {
                const { name, description, content } = currentFile
                console.log({ name, description, content })
                setName(name)
                setDescription(description)
                setContent(content)
            }
        }
    }, [isNew]);
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
                            fontSize: 18
                        }}
                        placeholder="Nhập tên tệp tin"
                        onChangeText={(name) => setName(name)}
                        value={name}
                    >

                    </TextInput>
                </Body>

                <Right style={{
                }}>
                    <TouchableOpacity
                        transparent
                        onPress={onHandleSaveFile}>
                        <Entypo name="save" color="#f57811" size={25} />
                    </TouchableOpacity>
                </Right>
            </Header>
            <View style={{
                flex: 1,
                margin: 16,
                justifyContent: "flex-start",
            }}>
                <Label style={{
                    fontSize: 18
                }}>Mô tả</Label>
                <TextInput
                    style={{
                        fontSize: 18
                    }}
                    multiline
                    placeholder="Nhập thông tin mô tả"
                    onChangeText={(description) => setDescription(description)}
                    value={description}
                >

                </TextInput>
                <Label style={{
                    fontSize: 18
                }}>Nội dung</Label>
                <TextInput
                    style={{
                        fontSize: 18
                    }}
                    multiline
                    placeholder="Nhập nội dung"
                    autoFocus={true}
                    onChangeText={(content) => setContent(content)}
                    value={content}
                >

                </TextInput>
            </View>
        </View >
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
    }
});