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
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

export default DocumentLike = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const files = useSelector(state => state.file.files)
    const parentFolder = useSelector(state => state.folder.parentFolder)

    const fetchData = async () => {
        try {
            const filterFolder = { like: true }
            setLoading(true)
            await dispatch(getListFolder(filterFolder))
            await dispatch(getListFile(filterFolder))
            setLoading(false)
        } catch (error) {
            setLoading(false)
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
        if (loading) {
            global.props.showLoading()
        } else {
            global.props.hideLoading()
        }
    }, [loading]);

    useEffect(() => {
        if (!parentFolder) {
            fetchData()
        }
    }, [parentFolder])
    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={[styles.scrollViewWrapper, { paddingBottom: 50 }]}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginVertical: 10
                        }}>Tài Liệu Yêu Thích</Text>
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
                                    files && files.length !== 0 && (!folders || !folders.length) && (
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
                </ScrollView>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        marginHorizontal: 20,
        padding: 4
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: "300"
    }
})