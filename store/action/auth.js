import * as types from './types/auth'
import FactoryService from '../../service/FactoryService'
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from "@react-native-community/async-storage";

const setAuthenticaion = (employee, accessToken, refreshToken) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_AUTHENTICATION,
            employee, accessToken, refreshToken
        })
    }
}

export const resetAuth = () => {
    return (dispatch) => {
        dispatch({
            type: types.RESET_STORE
        })
    }
}

export const login = (phoneNumber, password, otp) => {
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                const authenticationInfo = {
                    phoneNumber, password, otp
                }
                const response = await FactoryService.request('AuthService').login(authenticationInfo)
                const employeeInfo = response.data
                const { employee, accessToken, refreshToken } = employeeInfo
                dispatch(setAuthenticaion(employee, accessToken, refreshToken))
                saveAuthInfoToStorage(employee, accessToken, refreshToken)
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }

        })
    }
}

const saveAuthInfoToStorage = async (employee, accessToken, refreshToken) => {
    try {
        await AsyncStorage.setItem('employee', JSON.stringify(employee))
        await AsyncStorage.setItem('accessToken', accessToken)
        await AsyncStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
        console.log(error)
    }

}

export const checkAutoLogin = () => {
    console.log('Vo day')
    return (dispatch) => {
        return new Promise(async (resolve, reject) => {
            try {
                let employee = await AsyncStorage.getItem('employee')
                employee = JSON.parse(employee)
                const accessToken = await AsyncStorage.getItem('accessToken')
                const refreshToken = await AsyncStorage.getItem('refreshToken')
                console.log({ employee, accessToken, refreshToken }, 'HOAI')
                if (accessToken) {
                    dispatch(setAuthenticaion(employee, accessToken, refreshToken))
                    resolve(true)
                } else {
                    console.log('vo day')
                    reject(false)
                }
            } catch (error) {
                console.log(error, 'error')
                reject(false)
            }
        })
    }
}