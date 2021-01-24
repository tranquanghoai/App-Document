import { Body, Button, Form, Header, Input, Item, Label, Left, Picker, Right, Textarea, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, ImageBackground, TextInput, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FactoryService from '../service/FactoryService'
import FileVertical from '../components/file/FileVertical';
import FileHorizontal from '../components/file/FileHorizontal';
import FolderHorizontal from '../components/folder/FolderHorizontal';
import FolderVertical from '../components/folder/FolderVertical';
import { Image } from 'react-native';

export default Search = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [loadingFolder, setLoadingFolder] = useState(true)
    const [loadingFile, setLoadingFile] = useState(true)
    const fetchFiles = async () => {
        try {
            const response = await FactoryService.request('FileService').getList({ search })
            if (response?.data?.data) {
                console.log(response.data.data, 'response.data.data')
                setFiles(response.data.data)
            }
        } catch (error) {

        }
    }

    const fetchFolders = async () => {
        try {
            const response = await FactoryService.request('FolderService').getList({ search })
            if (response?.data?.data) {
                setFolders(response.data.data)
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        if (search) {
            fetchFiles()
            fetchFolders()
        } else {
            setFiles([])
            setFolders([])
        }
    }, [search])
    return (
        <View style={{
            flex: 1
        }}>
            <Header style={{
                backgroundColor: '#fff',
                width: '100%',
            }}>
                <TouchableOpacity
                    transparent
                    onPress={() => navigation.pop()}
                    style={{
                        justifyContent: 'center',
                        padding: 4
                    }}
                >
                    <Feather name="arrow-left" color="#000" size={25} />
                </TouchableOpacity>
                <View style={{
                    flex: 1,
                    margin: 4,
                    flexDirection: 'row'
                }}>
                    <TextInput
                        style={{
                            fontSize: 18,
                            flex: 1,
                            paddingHorizontal: 8
                        }}
                        autoFocus={true}
                        placeholder="Tên Tệp Tin"
                        onChangeText={(keyword) => setSearch(keyword)}
                        value={search}
                    />
                    <TouchableOpacity
                        transparent
                        onPress={() => { }}
                        style={{
                            justifyContent: 'center',
                            padding: 4
                        }}
                    >
                        <AntDesign name="search1" color="#000" size={25} />
                    </TouchableOpacity>
                </View>
            </Header>

            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={[styles.scrollViewWrapper, { paddingBottom: 50, paddingTop: 20 }]}>

                    <View style={styles.titleArea}>
                        {
                            folders && folders.length !== 0 ? (
                                <Text style={styles.titleText}>Thư Mục</Text>
                            ) : (<View></View>)
                        }
                        <TouchableOpacity onPress={() => {
                            setFolderHorizontal(!folderIsHorizontal)
                        }}>
                            {
                                folderIsHorizontal ? (
                                    <React.Fragment>
                                        {
                                            folders && folders.length !== 0 && (
                                                <Entypo name="menu" color="#000" size={24} />
                                            )
                                        }
                                    </React.Fragment>
                                ) : (
                                        <React.Fragment>
                                            {
                                                folders && folders.length !== 0 && (
                                                    <AntDesign name="appstore-o" color="#000" size={24} />
                                                )
                                            }
                                        </React.Fragment>
                                    )
                            }
                        </TouchableOpacity>
                    </View>
                    {
                        folderIsHorizontal ? (
                            <FolderHorizontal folders={folders} navigation={navigation} />
                        ) : (
                                <React.Fragment>
                                    {
                                        folders.map(folder => (
                                            <FolderVertical navigation={navigation} key={folder.id} folder={folder} />
                                        ))
                                    }
                                </React.Fragment>
                            )
                    }
                    <View style={styles.titleArea}>
                        {
                            files && files.length !== 0 && (
                                <Text style={styles.titleText}>Tệp Tin</Text>
                            )
                        }
                        {
                            !folders || folders.length == 0 && (
                                <TouchableOpacity onPress={() => {
                                    setFolderHorizontal(!folderIsHorizontal)
                                }}>
                                    {
                                        folderIsHorizontal ? (
                                            <React.Fragment>
                                                {
                                                    files && files.length !== 0 && (
                                                        <Entypo name="menu" color="#000" size={24} />
                                                    )
                                                }
                                            </React.Fragment>
                                        ) : (
                                                <React.Fragment>
                                                    {
                                                        files && files.length !== 0 && (
                                                            <AntDesign name="appstore-o" color="#000" size={24} />
                                                        )
                                                    }
                                                </React.Fragment>
                                            )
                                    }
                                </TouchableOpacity>
                            )
                        }

                    </View>
                    {
                        folderIsHorizontal ? (
                            <View style={{
                                marginTop: 8
                            }}>
                                <FileHorizontal files={files} navigation={navigation} />
                            </View>
                        ) : (
                                <React.Fragment>
                                    {
                                        files.map(file => (
                                            <FileVertical navigation={navigation} key={file.id} file={file} />
                                        ))
                                    }
                                </React.Fragment>
                            )
                    }

                </View>

                {
                    (!files || !files.length)
                    && (!folders || !folders.length) &&
                    (
                        <View style={{
                            width: '100%',
                            height: '100%',
                            marginTop: 30
                        }}>

                            <Image
                                style={[
                                    {
                                        width: 200,
                                        height: 200,
                                        // borderRadius: 80,
                                        marginTop: 20,
                                        alignSelf: 'center',
                                    }
                                ]}
                                source={require('../assets/document.png')}
                            />
                            <Text style={{
                                fontSize: 22,
                                textAlign: 'center',
                                marginTop: 16,
                                color: '#ccc',
                                // fontStyle: 'italic'
                            }}>
                                Tài Liệu Trống </Text>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        marginHorizontal: 20,
        paddingHorizontal: 4
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
    },
    titleText: {
        fontSize: 18,
        fontWeight: "300"
    },
    tabDocumentStyle: {
        flex: 1,
        width: '49%',
        justifyContent: 'center',
        alignItems: 'center',

        borderColor: '#e8e0df',
        borderWidth: 1,
        borderRadius: 20
    }
})