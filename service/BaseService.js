import axios from 'axios'
import AsyncStorage from "@react-native-community/async-storage";

const domain = 'https://api.bk.document.bentrinh.asia/'
import RNFetchBlob from 'rn-fetch-blob';
import store from '../store'
export default class BaseService {
    constructor(auth = 'employee') {
        if (auth) {
            this.setAuth(auth)
        }
    }

    async setAuth(auth) {
        axios.interceptors.request.use(async (config) => {
            // const user = JSON.parse(localStorage.getItem(auth))

            // if (user) {
            // }
            const accessToken = await AsyncStorage.getItem('accessToken')
            config.headers.Authorization = `Bearer ${accessToken}`
            return config
        })
    }

    fetchBlob({ method, url, data }) {
        return new Promise(async (resolve, reject) => {
            const accessToken = await AsyncStorage.getItem('accessToken')
            const headers = {
                Authorization: `Bearer ${accessToken}`
            }
            RNFetchBlob.fetch(method, domain + url, headers, data).then(response => {
                const status = response.info().status
                const data = JSON.parse(response.data)
                if (status !== 200 && status !== 201) {
                    reject(data)
                }
                resolve(data)
            }).catch(error => {
                console.log(error, 'erorr')
                reject(error)
            })
        })
    }

    async get(uri, params = {}) {
        try {
            return await axios.get(domain + uri, { params: params })
        } catch (e) {
            return this.errorMsg(e)
        }
    }

    async post(uri, params = {}) {
        // try {
        return axios.post(domain + uri, params)
        // } catch (e) {
        //     console.log('xuong day khong')
        //     return this.errorMsg(e)
        // }
    }

    async put(uri, params = {}) {
        try {
            return await axios.put(domain + uri, params)
        } catch (e) {
            return this.errorMsg(e)
        }
    }

    async patch(uri, params = {}) {
        try {
            return await axios.patch(domain + uri, params)
        } catch (e) {
            return this.errorMsg(e)
        }
    }

    async show(uri) {
        try {
            return await axios.get(domain + uri)
        } catch (e) {
            return this.errorMsg(e)
        }
    }

    async delete(uri) {
        try {
            return await axios.delete(domain + uri)
        } catch (e) {
            return this.errorMsg(e)
        }
    }

    url(uri) {
        return domain + uri
    }

    errorMsg(e) {
        console.log(e)
        if (e.response === undefined) {
            e.status = 0
            e.statusText = e.message
            return { data: e }
        }

        let validationErrors = ''
        if (e.response.status === 422) {
            const errors = e.response.data.errors
            for (let key in errors) {
                validationErrors += errors[key] + '. '
            }
        }

        if (e.response.status !== 422) {
            validationErrors = e.response.data
        }

        // Vue.$notify('error', e.response.statusText, validationErrors, { duration: 5000, permanent: false })

        return { data: e.response }
    }
}