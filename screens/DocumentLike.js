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

export default DocumentLike = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const files = useSelector(state => state.file.files)
    const parentFolder = useSelector(state => state.folder.parentFolder)

    const fetchData = () => {
        try {
            const filterFolder = { like: true }
            dispatch(getListFolder(filterFolder))
            dispatch(getListFile(filterFolder))
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
            console.log('Day ak')
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
                    <View style={styles.scrollViewWrapper}>
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
                    </View>
                </ScrollView>
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        margin: 20,
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
        fontWeight: "bold"
    }
})