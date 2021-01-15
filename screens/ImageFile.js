import { Body, Button, Header, Input, Item, Label, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from "react-redux"
import { handleCreateImageFile, handleChooseFile, handleUpdateImageFile } from '../store/action/file'
// import * as ImagePicker from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
let options = {
    title: 'Select Image',
    customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default function ImageFile({ navigation, route }) {
    const [name, setName] = useState('Tên tệp tin')
    const [description, setDescription] = useState()
    const [images, setImages] = useState([])
    const [isNew, setIsNew] = useState(true)
    const [displayAsterisk, setDisplayAsterisk] = useState(false)
    const dispatch = useDispatch()
    const currentFile = useSelector(state => state.file.currentFile)
    const onHandleSaveFile = () => {
        if (!name) return
        if (isNew) {
            dispatch(handleCreateImageFile(name, description, images)).then((result) => {
                navigation.pop()
            })
        } else {
            dispatch(handleUpdateImageFile(name, description, images)).then((result) => {
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
                const { name, description, content, attachFileIds } = currentFile
                console.log({ name, description })
                setName(name)
                setDescription(description)
                setImages([...images, ...attachFileIds])
            }
        }
    }, [isNew]);
    const launchImageLibrary = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(imagesFromLocal => {
            console.log(imagesFromLocal, 'imagesFromLocal')
            try {
                setImages([...images, ...imagesFromLocal])
            } catch (error) {
                console.log(error)
            }
        });
    }
    const onHandleRemoveImage = (index) => {
        const imagesNew = [...images]
        imagesNew.splice(index, 1)
        setImages(imagesNew)
    }
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
                        fontSize: 18,
                        marginBottom: 12
                    }}
                    value={description}
                    multiline
                    placeholder="Nhập thông tin mô tả"
                    onChangeText={(description) => setDescription(description)}
                >

                </TextInput>
                <Label style={{
                    fontSize: 18
                }}>Hình ảnh</Label>
                <TouchableOpacity style={{
                    backgroundColor: '#f57811',
                    width: 120,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    borderRadius: 20,
                    alignSelf: "center",
                    padding: 8
                }}
                    onPress={launchImageLibrary}
                >
                    <Entypo name="upload-to-cloud" color="#fff" size={25} />
                    <Text style={{
                        fontSize: 18,
                        color: '#fff'
                    }}>Tải Lên</Text>
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    width: '100%',
                    marginTop: 10,
                    flexDirection: "row"
                }}>
                    <FlatList
                        data={images}
                        numColumns='2'
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            let source
                            if (item.id) {
                                source = {
                                    uri: `http://192.168.1.11:3000/attach-file/${item.id}`,
                                    headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZUlkIjoiNWY4ODI1ZGNiYmY5MTEzZTA4MDU1Nzg3IiwiZGV2aWNlSWQiOiIyY2FmZWYzZC1lZGJhLTQ3Y2ItYWNhZC1lNWRkYzE4OTliYjkiLCJpYXQiOjE2MDgwMTc4NzYsImV4cCI6MTYxMDYwOTg3Nn0.irLi3pRRO4PlpXMosOYqnLTJTZivxN2KFXFyeQX1L8o" }
                                }
                            } else {
                                source = { uri: item.path }
                            }
                            return (
                                <View style={{
                                    width: '45%',
                                    height: 180,
                                    margin: '2.5%',
                                    borderRadius: 5,
                                    overflow: "hidden"
                                }}>
                                    <ImageBackground
                                        source={source}
                                        style={{
                                            flex: 1
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => onHandleRemoveImage(index)}
                                            style={{
                                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                                alignSelf: "flex-end",
                                                padding: 2
                                            }}>
                                            <Entypo name="cross" color="#fff" size={20} />
                                        </TouchableOpacity>
                                    </ImageBackground>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
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