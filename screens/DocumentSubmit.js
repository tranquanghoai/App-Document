import { Container } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import FolderHorizontal from '../components/folder/FolderHorizontal'
import FolderVertical from '../components/folder/FolderVertical'
import HomeHeader from '../components/header/HomeHeader'
import { getListSubmitFile } from '../store/action/submit'
import { getListFile } from '../store/action/file'
import FileHorizontalSubmit from '../components/file/FileHorizontalSubmit';
import FileVerticalSubmit from '../components/file/FileVerticalSubmit';
import { Image } from 'react-native';

export default DocumentLike = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const dispatch = useDispatch()
    const listSubmitFile = useSelector(state => state.submit.listSubmitFile)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        try {
            const filterFile = {}
            setLoading(true)
            await dispatch(getListSubmitFile(filterFile))
            setLoading(false)
        } catch (error) {
            console.log(error, 'error')
        }
    }

    useEffect(() => {
        if (loading) {
            global.props.showLoading()
        } else {
            global.props.hideLoading()
        }
    }, [loading]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData()
        });
        return unsubscribe;
    }, [navigation])
    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        <View style={styles.titleArea}>
                            <Text style={styles.titleText}>Tệp Tin Đã Trình Duyệt</Text>
                            <TouchableOpacity onPress={() => {
                                setFolderHorizontal(!folderIsHorizontal)
                            }}>
                                {
                                    folderIsHorizontal ? (
                                        <React.Fragment>
                                            {
                                                listSubmitFile && listSubmitFile.length !== 0 && (
                                                    <Entypo name="menu" color="#000" size={24} />
                                                )
                                            }
                                        </React.Fragment>
                                    ) : (
                                            <React.Fragment>
                                                {
                                                    listSubmitFile && listSubmitFile.length !== 0 && (
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
                                <FileHorizontalSubmit listSubmitFile={listSubmitFile} navigation={navigation} />
                            ) : (
                                    <React.Fragment>
                                        {
                                            listSubmitFile.map(file => (
                                                <FileVerticalSubmit navigation={navigation} key={file.id} file={file} />
                                            ))
                                        }
                                    </React.Fragment>
                                )
                        }

                        {
                            (!listSubmitFile || !listSubmitFile.length) && (
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