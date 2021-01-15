import { Container } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import FolderHorizontal from '../components/folder/FolderHorizontal'
import FolderVertical from '../components/folder/FolderVertical'
import HomeHeader from '../components/header/HomeHeader'
import { getListFolder, chooseParentFolder } from '../store/action/folder'
import { getListFile } from '../store/action/file'
import FileHorizontal from '../components/file/FileHorizontal';
import FileVertical from '../components/file/FileVertical';
import DocumentShared from '../components/DocumentShared';
import { ActivityIndicator } from 'react-native';

export default Document = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [loadingFolder, setLoadingFolder] = useState(true)
    const [loadingFile, setLoadingFile] = useState(true)
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const files = useSelector(state => state.file.files)
    const parentFolder = useSelector(state => state.folder.parentFolder)

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
        if (!parentFolder) {
            fetchData()
        }
    }, [parentFolder])
    console.log(loadingFolder, 'loading folder')
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
                            <View style={styles.scrollViewWrapper}>
                                {
                                    loadingFolder ? (
                                        <ActivityIndicator size="small" color="#f57811" />
                                    ) : (
                                            <React.Fragment>
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
                                                            folderIsHorizontal ? (<Entypo name="menu" color="#000" size={24} />)
                                                                :
                                                                (<AntDesign name="appstore-o" color="#000" size={24} />)
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

                                                {
                                                    files && files.length !== 0 && (
                                                        <Text style={styles.titleText}>Tệp Tin</Text>
                                                    )
                                                }
                                                {
                                                    !loadingFolder && (
                                                        <React.Fragment>
                                                            {
                                                                folderIsHorizontal ? (
                                                                    <FileHorizontal files={files} navigation={navigation} />
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
                                            </React.Fragment>
                                        )
                                }

                            </View>
                        ) : (
                                <DocumentShared />
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
        fontWeight: "bold"
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