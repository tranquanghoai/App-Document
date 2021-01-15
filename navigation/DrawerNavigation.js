import React from 'react'
import { View, Text } from 'react-native'
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'
import Animated from 'react-native-reanimated'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { Body, Button, Container, Content, Footer, H3, Header, Icon, Left, ListItem, Right, Thumbnail } from 'native-base'

export default function DrawerNavigation({ progress, ...props }) {
    const translateX = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [-100, 0]
    })
    return (
        <Container style={{ margin: 18 }}>
            <View style={{
                marginLeft: 4
            }}>
                <Thumbnail large source={{
                    uri: "https://upload.wikimedia.org/wikipedia/vi/thumb/c/cd/Logo-hcmut.svg/1004px-Logo-hcmut.svg.png"
                }}
                    style={{ marginBottom: 14 }}
                />
                <Text style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 14,
                    color: '#000'
                }}>
                    Công ty TNHH Bách Khoa TP.HCM
                </Text>
            </View>

            <DrawerItem
                label="Thông tin"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <AntDesign name="infocirlceo" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Cài đặt"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <AntDesign name="setting" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Chế độ ban đêm"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <Fontisto name="night-clear" color="#f57811" size={20} />
                }
            />
            <DrawerItem
                label="Chính sách"
                style={{ backgroundColor: '#000000' }}
                labelStyle={{
                    color: '#000',
                    fontSize: 15
                }}
                onPress={() => { }}
                style={{
                    width: '100%',
                    marginLeft: 0,
                    padding: 0,
                }}
                icon={
                    ({ focused, color, size }) => <Entypo name="star-outlined" color="#f57811" size={20} />
                }
            />
        </Container >

    )
}
