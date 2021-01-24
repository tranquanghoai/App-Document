import React from 'react'
import { View } from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../screens/Home'
import Login from '../screens/Login'
import Like from '../screens/Like'
import Document from '../screens/Document'
import DocumentLike from '../screens/DocumentLike'
import DocumentList from '../screens/DocumentList'
import DocumentSubmit from '../screens/DocumentSubmit'
import TextFile from '../screens/TextFile'
import ButtonAddDocument from '../components/button/ButtonAddDocument'
import ModalAddDocument from '../components/modal/ModalAddDocument'
import ModalCreateFolder from '../components/modal/ModalCreateFolder'
import ModalFolderAction from '../components/modal/ModalFolderAction'
import ModalFileAction from '../components/modal/ModalFileAction'
import ModalSelectForm from '../components/modal/ModalSelectForm'
import ModalFileSubmitAction from '../components/modal/ModalFileSubmitAction'
import ModalShareAction from '../components/modal/ModalShareAction'
import ModalSortBy from '../components/modal/ModalSortBy'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const HomeStack = createStackNavigator();

function HomeStackTab() {
    return (
        <HomeStack.Navigator>
            {/* <HomeStack.Screen name="Login" component={Login} options={{ headerShown: false }} /> */}
            <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <HomeStack.Screen name="DocumentList" component={DocumentList} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

function DocumentStackTab() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Document" component={Document} options={{ headerShown: false }} />
            <HomeStack.Screen name="DocumentList" component={DocumentList} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}


function LikeStackTab() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="DocumentLike" component={DocumentLike} options={{ headerShown: false }} />
            <HomeStack.Screen name="DocumentList" component={DocumentList} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

function SubmitStackTab() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="DocumentSubmit" component={DocumentSubmit} options={{ headerShown: false }} />
            <HomeStack.Screen name="DocumentList" component={DocumentList} options={{ headerShown: false }} />
        </HomeStack.Navigator>
    );
}

const TabNavigator = ({ navigation }) => {
    return (
        <React.Fragment>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let icon
                        sdize = focused ? 26 : size
                        if (route.name === 'Trang Chủ') {
                            icon = focused
                                ? <Entypo name="home" size={size} color={color} />
                                : <AntDesign name="home" size={size} color={color} />
                        } else if (route.name === 'Tài liệu') {
                            icon = focused
                                ? <FontAwesome name="file" size={size} color={color} />
                                : <FontAwesome name="file-o" size={size} color={color} />
                        } else if (route.name === 'Đã Trình Duyệt') {
                            icon = focused
                                ? <FontAwesome name="send" size={size} color={color} />
                                : <FontAwesome name="send-o" size={size} color={color} />
                        } else {
                            icon = focused
                                ? <Entypo name="star" size={size} color={color} />
                                : <Entypo name="star-outlined" size={size} color={color} />
                        }
                        return icon
                    },
                })}
                tabBarOptions={{
                    tabStyle: {
                        width: 'auto',
                        height: 'auto'
                    },
                    activeTintColor: '#f57811',
                    inactiveTintColor: 'gray',
                    labelStyle: {
                        fontSize: 13,
                    },
                    style: { height: 55, padding: 4 }
                }}
            >
                <Tab.Screen name="Trang Chủ" component={HomeStackTab} />
                <Tab.Screen name="Tài liệu" component={DocumentStackTab} />
                <Tab.Screen name="Yêu Thích" component={LikeStackTab} />
                <Tab.Screen name="Đã Trình Duyệt" component={SubmitStackTab} />
            </Tab.Navigator >
            <ButtonAddDocument />
            <ModalCreateFolder />
            <ModalFolderAction />
            <ModalSortBy />
            <ModalShareAction navigation={navigation} />
            <ModalFileAction navigation={navigation} />
            <ModalSelectForm navigation={navigation} />
            <ModalAddDocument navigation={navigation} />
            <ModalFileSubmitAction navigation={navigation} />
        </React.Fragment>
    )
}

export default TabNavigator