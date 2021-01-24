import { Container, Item, Picker } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

import FolderHorizontal from '../components/folder/FolderHorizontal'
import FolderVertical from '../components/folder/FolderVertical'
import HomeHeader from '../components/header/HomeHeader'
import { getListFolder, chooseParentFolder } from '../store/action/folder'
import { openModalSortDoc } from '../store/action/system'
import { getListFile } from '../store/action/file'
import FileHorizontal from '../components/file/FileHorizontal';
import FileVertical from '../components/file/FileVertical';
import DocumentShared from '../components/DocumentShared';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

export default Document = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [selected, setSelected] = useState('key1')
    const [loadingFolder, setLoadingFolder] = useState(true)
    const [loadingFile, setLoadingFile] = useState(true)
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const files = useSelector(state => state.file.files)
    const parentFolder = useSelector(state => state.folder.parentFolder)
    const { sortBy, sortValue } = useSelector(state => state.overview)

    const [isDocument, setIsDocument] = useState(true)
    const fetchData = () => {
        try {
            const filterFolder = {}
            setLoadingFolder(true)
            dispatch(getListFolder(filterFolder)).then((result) => {
                setLoadingFolder(false)
            }).catch((err) => {
                setLoadingFolder(false)
            });
            setLoadingFile(true)
            dispatch(getListFile(filterFolder)).then((result) => {
                setLoadingFile(false)
            }).catch((err) => {
                setLoadingFile(false)
            });
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
            dispatch(chooseParentFolder(""))
        });
        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        if (loadingFolder || loadingFile) {
            global.props.showLoading()
        } else {
            global.props.hideLoading()
        }
    }, [loadingFolder, loadingFile])

    useEffect(() => {
        if (!parentFolder) {
            fetchData()
        }
    }, [parentFolder])

    const onValueChange = (value) => {
        setSelected(value)
    }

    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={{
                        flex: 1,
                        height: 30,
                        margin: 20,
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity style={[
                            styles.tabDocumentStyle,
                            { marginRight: '1%' },
                            isDocument && {
                                fontWeight: 'bold',
                                borderColor: '#ccc',
                            }
                        ]}
                            onPress={() => setIsDocument(true)}
                        >
                            <Text style={[{
                                fontSize: 15
                            }, isDocument && {
                                fontWeight: 'bold',
                                borderColor: '#ccc',
                            }]}>TÀI LIỆU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[
                            styles.tabDocumentStyle,
                            { marginLeft: '1%' },

                        ]}
                            onPress={() => setIsDocument(false)}
                        >
                            <Text style={[{
                                fontSize: 15
                            }, !isDocument && {
                                fontWeight: 'bold'
                            }]}>CHIA SẺ</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        isDocument ? (
                            <View style={[styles.scrollViewWrapper, { paddingBottom: 50 }]}>

                                <View style={styles.titleArea}>
                                    {
                                        folders && folders.length !== 0 ? (
                                            <Text style={[styles.titleText, { flex: 1 }]}>Thư Mục</Text>
                                        ) : (<View></View>)
                                    }
                                    <View style={{
                                        marginRight: 12,
                                    }}>
                                        <TouchableOpacity style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                            onPress={() => dispatch(openModalSortDoc())}  >
                                            {
                                                sortValue == 1 ? (
                                                    <AntDesign name="arrowup" color="#f57811" size={18} style={{
                                                        padding: 4
                                                    }} />
                                                ) : (
                                                        <AntDesign name="arrowdown" color="#f57811" size={18} style={{
                                                            padding: 4
                                                        }} />
                                                    )
                                            }

                                            <Text style={{
                                                marginLeft: 4
                                            }}>{sortBy == 0 ? 'Tên tài liệu' : (sortBy == 1 ? 'Ngày tạo' : 'Ngày cập nhập')}</Text>
                                        </TouchableOpacity>

                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => {
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
                                    !loadingFolder && (
                                        <React.Fragment>
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
                                        </React.Fragment>
                                    )
                                }

                                {
                                    (!folders || !folders.length) && (!files || !files.length) && (
                                        <View style={{
                                            width: '100%',
                                            height: '100%',
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
                                                Tài Liệu Trống
                            </Text>
                                        </View>
                                    )
                                }

                            </View>
                        ) : (
                                <DocumentShared navigation={navigation} />
                            )
                    }


                </ScrollView>
            </Container>
        </View >
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