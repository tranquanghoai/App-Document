import { Container } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'

import FolderHorizontal from './folder/FolderHorizontal'
import FolderVertical from './folder/FolderVertical'
import HomeHeader from './header/HomeHeader'
import { getListShareFile } from '../store/action/share'
import { getListFile } from '../store/action/file'
import FileHorizontalSubmit from './file/FileHorizontalSubmit';
import FileVerticalSubmit from './file/FileVerticalSubmit';
import FileVerticalShared from './file/FileVerticalShared';
import FileHorizontalShare from './file/FileHorizontalShare';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native';

export default DocumentShared = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    const listShare = useSelector(state => state.share.listShare)

    const fetchData = () => {
        try {
            const filterFile = {}
            setLoading(false)
            dispatch(getListShareFile(filterFile)).then((result) => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
            });
        } catch (error) {
            console.log(error, 'error')
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.scrollViewWrapper}>
                    {
                        loading ? (
                            <ActivityIndicator size="small" color="#f57811" />
                        ) : (
                                <React.Fragment>
                                    <View style={styles.titleArea}>
                                        {
                                            listShare && listShare.length !== 0 ? (
                                                <Text style={styles.titleText}>Tệp Tin Chia Sẻ</Text>
                                            ) : (
                                                    <View></View>
                                                )
                                        }

                                        <TouchableOpacity onPress={() => {
                                            setFolderHorizontal(!folderIsHorizontal)
                                        }}>
                                            {
                                                folderIsHorizontal ? (
                                                    <React.Fragment>
                                                        {
                                                            listShare && listShare.length !== 0 && (
                                                                <Entypo name="menu" color="#000" size={24} />
                                                            )
                                                        }
                                                    </React.Fragment>
                                                ) : (
                                                        <React.Fragment>
                                                            {
                                                                listShare && listShare.length !== 0 && (
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
                                            <FileHorizontalShare listShare={listShare} navigation={navigation} />
                                        ) : (
                                                <React.Fragment>
                                                    {
                                                        listShare.map(file => (
                                                            <FileVerticalShared navigation={navigation} key={file.id} file={file} />
                                                        ))
                                                    }
                                                </React.Fragment>
                                            )
                                    }

                                    {
                                        (!listShare || !listShare.length) && (
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
                                                    Tài Liệu Trống </Text>
                                            </View>
                                        )
                                    }
                                </React.Fragment>
                            )
                    }

                </View>
            </ScrollView>
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
        fontWeight: "bold"
    }
})