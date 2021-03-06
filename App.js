/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider, useDispatch, useSelector } from 'react-redux'
import ModalCreateFolder from './components/modal/ModalCreateFolder'
import { ConfirmationProvider, ConfirmationConsumer } from "./context/Confirmation"
import TextFile from './screens/TextFile'
import ImageFile from './screens/ImageFile'
import GeneralFile from './screens/GeneralFile'
import TransferFolder from './screens/TransferFolder'
import Approvement from './screens/Approvement'
import PersonalInfo from './screens/PersonalInfo'
import OTP from './screens/OTP'
import FillForm from './screens/FillForm'
import ShareFile from './screens/ShareFile'
import Search from './screens/Search'

import store from './store'

const Drawer = createDrawerNavigator()

import TabNavigator from './navigation/TabNavigator'
import DrawerNavigation from './navigation/DrawerNavigation'
import ButtonAddDocument from './components/button/ButtonAddDocument'
import ModalAddDocument from './components/modal/ModalAddDocument'
import { SafeAreaProvider, SafeAreaConsumer } from 'react-native-safe-area-context';
import Login from './screens/Login'
import { checkAutoLogin } from './store/action/auth'
import FlashMessage from "react-native-flash-message";

const StackHome = createStackNavigator();
const StackHomeNavigator = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAutoLogin()).then((result) => {
    }).catch((err) => {
      try {
        navigation.navigate('Login')
      } catch (error) {
        console.log(error, 'eror')
      }
    });
  }, [])
  return (
    <StackHome.Navigator
      initialRouteName={'Home'}
      headerMode={'none'}
    >
      <StackHome.Screen name="Login" component={Login} />
      <StackHome.Screen name="Home" component={TabNavigator} />
      <StackHome.Screen name="TextFile" component={TextFile} />
      <StackHome.Screen name="ImageFile" component={ImageFile} />
      <StackHome.Screen name="GeneralFile" component={GeneralFile} />
      <StackHome.Screen name="TransferFolder" component={TransferFolder} />
      <StackHome.Screen name="ShareFile" component={ShareFile} />
      <StackHome.Screen name="Approvement" component={Approvement} />
      <StackHome.Screen name="PersonalInfo" component={PersonalInfo} />
      <StackHome.Screen name="OTP" component={OTP} />
      <StackHome.Screen name="FillForm" component={FillForm} />
      <StackHome.Screen name="Search" component={Search} />
      <StackHome.Screen name="DocumentList" component={DocumentList} />

    </StackHome.Navigator>
  )
}

const App = (props) => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ConfirmationProvider {...props}>
          <ConfirmationConsumer>
            {
              confirmFuncs =>
                <SafeAreaConsumer>
                  {insets => {
                    global.props = { ...confirmFuncs, insets: insets };
                    return (
                      <React.Fragment>
                        <FlashMessage position="top"
                          style={{
                            borderBottomRightRadius: 20,
                            borderBottomLeftRadius: 20,
                          }}
                          titleStyle={{
                            textAlign: 'center',
                            fontSize: 16
                          }}
                        />
                        <NavigationContainer  {...confirmFuncs}>
                          <Drawer.Navigator drawerContent={props => <DrawerNavigation {...props} />}>
                            <Drawer.Screen name="StackHomeNavigator" component={StackHomeNavigator} />
                          </Drawer.Navigator>
                        </NavigationContainer>
                      </React.Fragment>
                    )
                  }}
                </SafeAreaConsumer>
            }
          </ConfirmationConsumer>
        </ConfirmationProvider >
      </Provider >
    </SafeAreaProvider>

  );
};

const styles = StyleSheet.create({

});

export default App;
