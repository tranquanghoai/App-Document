import { Body, Button, Container, Header, Left, Right, Title } from 'native-base';
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from "react-redux"


import FolderVertical from '../components/folder/FolderVertical';
import FolderHorizontal from '../components/folder/FolderHorizontal';
import SelectFolder from '../components/folder/SelectFolder';
import FileHorizontal from '../components/file/FileHorizontal';
import FileVertical from '../components/file/FileVertical';
import { getListFolder, chooseFolderTransfer } from '../store/action/folder'
import { handleTransferFolder } from '../store/action/file'

export default TransferFolder = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const folders = useSelector(state => state.folder.folders)
    const selectFolderTransfer = useSelector(state => state.folder.selectFolderTransfer)


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            await dispatch(chooseFolderTransfer(route.params.selectFolderTransferId))
        });

        return unsubscribe;
    }, [navigation]);

    const saveTransferFolder = () => {
        const message = selectFolderTransfer ? selectFolderTransfer.name : 'Thư mục gốc'
        global.props.showConfirm(
            'Chuyển thư mục',
            `Bạn có muốn chuyển tệp tin đến thư mục ${message}?`,
            () => dispatch(handleTransferFolder())
        )
    }

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
                        }}>{selectFolderTransfer ? selectFolderTransfer.name : 'Thư mục gốc'}</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity onPress={saveTransferFolder}>
                            <Button transparent>
                                <Entypo name="save" color="#f57811" size={25} />
                            </Button>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        <View style={styles.titleArea}>
                            {
                                folders && folders.length !== 0 ? (
                                    <Text style={styles.titleText}>Chọn Thư Mục</Text>
                                ) : (
                                        <Text></Text>
                                    )
                            }

                        </View>
                        <SelectFolder folders={folders} navigation={navigation} />
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
        padding: 4,
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
});