import React, { useState } from 'react'
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
import FolderHorizontal from '../components/folder/FolderHorizontal';
import ButtonAddDocument from '../components/button/ButtonAddDocument';
import ModalAddDocument from '../components/modal/ModalAddDocument';
import HomeHeader from '../components/header/HomeHeader';

export default Home = ({ navigation }) => {
    const [folderIsHorizontal, setFolderHorizontal] = useState(false)
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff'
        }}>
            <Container >
                <HomeHeader navigation={navigation} />
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.scrollViewWrapper}>
                        <View style={styles.titleArea}>
                            <Text style={styles.titleText}>Thư Mục</Text>
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
                                <FolderHorizontal />
                            ) : (
                                    <React.Fragment>
                                        <FolderVertical navigation={navigation} />
                                        <FolderVertical navigation={navigation} />
                                        <FolderVertical navigation={navigation} />
                                    </React.Fragment>
                                )
                        }

                    </View>
                </ScrollView>
            </Container>
            <ButtonAddDocument />
            <ModalAddDocument />
        </View >
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