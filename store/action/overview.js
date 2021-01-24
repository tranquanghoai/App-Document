import * as types from './types/overview'
import FactoryService from '../../service/FactoryService'

export const setLatestFile = (latestFile) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LATEST_FILE,
            latestFile
        })
    }
}

export const getLastestFile = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('FileService').getLatestFile()
                if (response?.data?.data) {
                    dispatch(setLatestFile(response.data.data))
                }
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}

export const setLatestFolder = (latestFolder) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LATEST_FOLDER,
            latestFolder
        })
    }
}

export const getLastestFolder = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('FolderService').getLatestFolder()
                if (response?.data && response.data.length !== undefined) {
                    dispatch(setLatestFolder(response.data))
                }
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}

export const setLatestFavouriteFolder = (latestFavouriteFolder) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LATEST_FAVOURITE_FOLDER,
            latestFavouriteFolder
        })
    }
}

export const getLastestFavouriteFolder = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('FolderService').getLatestFolder({ like: true })
                console.log(response, 'response')
                if (response.data && response.data.length !== undefined) {
                    dispatch(setLatestFavouriteFolder(response.data))
                }
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}

export const setLatestFavouriteFile = (latestFavouriteFile) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LATEST_FAVOURITE_FILE,
            latestFavouriteFile
        })
    }
}

export const getLastestFavouriteFile = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('FileService').getLatestFile({ like: true })
                if (response.data && response.data.length !== undefined) {
                    dispatch(setLatestFavouriteFile(response.data))
                }
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}

export const setLatestSubmit = (latestSubmit) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LATEST_SUBMIT,
            latestSubmit
        })
    }
}

export const getLastestSubmit = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('SubmitService').getLatestSubmit()
                if (response.data && response.data.length !== undefined) {
                    dispatch(setLatestSubmit(response.data))
                }
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}

export const onSelectSortBy = (sortByCurrent) => {
    return (dispatch, getState) => {
        const { sortBy, sortValue } = getState().overview
        if (sortBy == sortByCurrent) {
            dispatch({
                type: types.SET_SORT_VALUE,
                sortValue: -sortValue
            })
        } else {
            dispatch({
                type: types.SET_SORT_TYPE,
                sortBy: sortByCurrent
            })
            dispatch({
                type: types.SET_SORT_VALUE,
                sortValue: 1
            })
        }

    }
}