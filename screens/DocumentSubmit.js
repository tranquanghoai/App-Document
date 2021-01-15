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

export default DocumentLike = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    const dispatch = useDispatch()
    const listSubmitFile = useSelector(state => state.submit.listSubmitFile)

    const fetchData = () => {
        try {
            const filterFile = {}
            dispatch(getListSubmitFile(filterFile))
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
            <Container>
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        <View style={styles.titleArea}>
                            {
                                listSubmitFile && listSubmitFile.length !== 0 ? (
                                    <Text style={styles.titleText}>Tệp Tin Đã Nộp</Text>
                                ) : (
                                        <View></View>
                                    )
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