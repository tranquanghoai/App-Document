import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Modal, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, StatusBar } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Body, Button, Container, Content, Header, Input, Left, Right, Row, Thumbnail, Title } from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import FolderVertical from '../components/folder/FolderVertical';
import FileVerticalSubmit from '../components/file/FileVerticalSubmit';
import FolderHorizontal from '../components/folder/FolderHorizontal';
import ButtonAddDocument from '../components/button/ButtonAddDocument';
import ModalAddDocument from '../components/modal/ModalAddDocument';
import HomeHeader from '../components/header/HomeHeader';
import FileVertical from '../components/file/FileVertical';
import { getLastestFile, getLastestFolder, getLastestFavouriteFolder, getLastestFavouriteFile, getLastestSubmit } from '../store/action/overview'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage, hideMessage } from "react-native-flash-message";

export default Home = ({ navigation }) => {
    const latestFolder = useSelector(state => state.overview.latestFolder)
    const latestFile = useSelector(state => state.overview.latestFile)
    const latestFavouriteFolder = useSelector(state => state.overview.latestFavouriteFolder)
    const latestFavouriteFile = useSelector(state => state.overview.latestFavouriteFile)
    const latestSubmit = useSelector(state => state.overview.latestSubmit)
    const dispatch = useDispatch()

    const [loadingFile, setLoadingFile] = useState(false)
    const [loadingFolder, setLoadingFolder] = useState(false)
    const [loadingFavouriteFile, setLoadingFavouriteFile] = useState(false)
    const [loadingFavouriteFolder, setLoadingFavouriteFolder] = useState(false)
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                setLoading(true)
                await dispatch(getLastestFile())
                await dispatch(getLastestFolder())
                await dispatch(getLastestFavouriteFolder())
                await dispatch(getLastestFavouriteFile())
                await dispatch(getLastestSubmit())
                setLoading(false)
            } catch (error) {
                console.log(error, 'error')
                setLoading(false)
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

    console.log(latestFolder, 'latestFolder')
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <Container >
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    {
                        latestFolder && latestFolder.length !== 0 && (
                            <View style={styles.scrollViewWrapper}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Thư Mục Gần Đây</Text>
                                </View>
                                {
                                    latestFolder.map(folder => (
                                        <FolderVertical navigation={navigation} key={folder.id} folder={folder} type={'home'} />
                                    ))
                                }

                            </View>
                        )
                    }

                    {
                        latestFile && latestFile.length !== 0 && (
                            <View style={styles.scrollViewWrapper}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Tệp Tin Gần Đây</Text>
                                </View>
                                {
                                    latestFile.map(file => (
                                        <FileVertical navigation={navigation} key={file.id} file={file} type={'home'} />
                                    ))
                                }
                            </View>
                        )
                    }

                    {
                        ((latestFavouriteFolder && latestFavouriteFolder.length !== 0) || (latestFavouriteFile && latestFavouriteFile.length !== 0)) && (
                            <View style={styles.scrollViewWrapper}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Tài Liệu Yêu Thích Gầy Đây</Text>
                                </View>
                                {
                                    latestFavouriteFolder.map(folder => (
                                        <FolderVertical navigation={navigation} key={folder.id} folder={folder} type={'home'} />
                                    ))
                                }
                                {
                                    latestFavouriteFile.map(file => (
                                        <FileVertical navigation={navigation} key={file.id} file={file} type={'home'} />
                                    ))
                                }
                            </View>
                        )
                    }

                    {
                        latestSubmit && latestSubmit.length !== 0 && (
                            <View style={[styles.scrollViewWrapper, { paddingBottom: 50 }]}>
                                <View style={styles.titleArea}>
                                    <Text style={styles.titleText}>Tài Liệu Đã Trình Duyệt Gần Đây</Text>
                                </View>
                                {
                                    latestSubmit.map(file => (
                                        <FileVerticalSubmit navigation={navigation} key={file.id} file={file} type={'home'} />
                                    ))
                                }
                            </View>
                        )
                    }

                    {
                        (!latestFolder || !latestFolder.length)
                        && (!latestFile || !latestFile.length)
                        && (!latestFavouriteFolder || !latestFavouriteFolder.length)
                        && (!latestFavouriteFile || !latestFavouriteFile.length)
                        && (!latestSubmit || !latestSubmit.length)
                        && (
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
            </Container>
        </View >
    )
}

const styles = StyleSheet.create({
    scrollViewWrapper: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 20,
        padding: 4,
    },
    titleArea: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        // marginBottom: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})