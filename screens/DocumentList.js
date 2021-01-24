import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from "react-redux"


import FolderVertical from '../components/folder/FolderVertical';
import FolderHorizontal from '../components/folder/FolderHorizontal';
import FileHorizontal from '../components/file/FileHorizontal';
import FileVertical from '../components/file/FileVertical';
import { getListFolder, chooseParentFolder } from '../store/action/folder'
import { ActivityIndicator } from 'react-native';

export default DocumentList = ({ navigation, route }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const files = useSelector(state => state.file.files)
    const parentFolder = useSelector(state => state.folder.parentFolder)
    const fetchDocumentOfParentId = async () => {
        try {
            const filterFolder = {}
            dispatch(getListFolder(filterFolder))
        } catch (error) {
            console.log(error, 'error')
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            if (route.params?.parentFolderId) {
                setLoading(true)
                await dispatch(chooseParentFolder(route.params.parentFolderId))
                setLoading(false)
            }
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (loading) {
            global.props.showLoading()
        } else {
            global.props.hideLoading()
        }
    }, [loading]);

    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => navigation.pop()}>
                            <Feather name="arrow-left" color="#000" size={25} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{
                        flex: 1
                    }}>
                        <Title style={{
                            color: '#000'
                        }}>{parentFolder?.name ? parentFolder.name : ''}</Title>
                    </Body>
                    {/* <Right>
                        <Button transparent>
                            <Fontisto name="more-v-a" color="#000" size={20} />
                        </Button>
                    </Right> */}
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        {
                            folders && folders.length !== 0 && (
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Thư Mục</Text>
                                    <TouchableOpacity onPress={() => {
                                        setFolderHorizontal(!folderIsHorizontal)
                                    }}
                                        style={{
                                            alignSelf: "flex-end",

                                        }}>
                                        {
                                            folderIsHorizontal ? (<Entypo name="menu" color="#000" size={24} />)
                                                :
                                                (<AntDesign name="appstore-o" color="#000" size={24} />)
                                        }
                                    </TouchableOpacity>
                                </View>

                            )
                        }

                        {
                            folderIsHorizontal ? (
                                <FolderHorizontal folders={folders} />
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
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Tệp Tin</Text>
                                    {
                                        !folders || folders.length == 0 && (
                                            <TouchableOpacity onPress={() => {
                                                setFolderHorizontal(!folderIsHorizontal)
                                            }}
                                                style={{
                                                    alignSelf: "flex-end",

                                                }}>
                                                {
                                                    folderIsHorizontal ? (<Entypo name="menu" color="#000" size={24} />)
                                                        :
                                                        (<AntDesign name="appstore-o" color="#000" size={24} />)
                                                }
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>

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
            {/* <Container style={{
                flex: 1
            }}>
                <Header style={{
                    backgroundColor: '#fff',
                }}>
                    <Left>
                        <TouchableOpacity transparent onPress={() => navigation.goBack()}>
                            <Feather name="arrow-left" color="#000" size={25} />
                        </TouchableOpacity>
                    </Left>
                    <Body style={{
                        flex: 1
                    }}>
                        <Title style={{
                            color: '#000'
                        }}>Bóng đá</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Fontisto name="more-v-a" color="#000" size={20} />
                        </Button>
                    </Right>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        <View style={styles.titleArea}>
                            <Text style={styles.titleText}>Tệp tin</Text>
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
                                <FileHorizontal />
                            ) : (
                                    <React.Fragment>
                                        <FileVertical navigation={navigation} />
                                        <FileVertical navigation={navigation} />
                                        <FileVertical navigation={navigation} />
                                    </React.Fragment>
                                )
                        }

                    </View>
                </ScrollView>
            </Container> */}
        </View>
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        margin: 20,
        padding: 4,
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold"
    }
});