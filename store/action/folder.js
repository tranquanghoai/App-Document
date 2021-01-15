import * as types from './types/folder'
import FactoryService from '../../service/FactoryService'
import { setListFile } from './file'

export const setListFolder = (folders) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LIST_FOLDER,
            folders
        })
    }
}

const pushCreatedFolder = (folder) => {
    return (dispatch) => {
        dispatch({
            type: types.PUSH_CREATED_FOLDER,
            folder
        })
    }
}

export const selectHandleFolder = (folder) => {
    return (dispatch) => {
        dispatch({
            type: types.CHOOSE_HANDLE_FOLDER,
            handleFolder: folder
        })
    }
}

export const handleLikeFolder = () => {
    return async (dispatch, getState) => {
        try {
            const handleFolder = getState().folder.handleFolder
            if (!handleFolder) return
            const payload = { like: handleFolder.like ? false : true }
            const response = await FactoryService.request('FolderService').update(handleFolder.id, payload)
            const updatedFolder = response.data
            const folders = [...getState().folder.folders]
            const foundFolder = folders.find(f => f.id === updatedFolder.id)
            if (foundFolder) {
                foundFolder.like = updatedFolder.like
            }
            dispatch(setListFolder(folders))
        } catch (error) {
            console.log(error, 'error')
        }
    }
}

export const handleUpdateFolder = (folderId, params) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('FolderService').update(folderId, params)
                const updatedFolder = response.data
                const listFolder = [...getState().folder.folders]
                const foundFolder = listFolder.find(f => f.id === folderId)
                foundFolder.name = updatedFolder.name
                foundFolder.description = updatedFolder.description
                dispatch(setListFolder(listFolder))
                resolve(response.data)
            } catch (error) {
                console.log(error, 'error')
                reject()
            }
        })
    }
}

export const handleDeleteFolder = () => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const handleFolder = getState().folder.handleFolder
                if (handleFolder) {
                    await FactoryService.request('FolderService').deleteFolder(handleFolder.id)
                    console.log('Toi day khong')
                    const listFolder = [...getState().folder.folders]
                    const foundFolderIndex = listFolder.findIndex(f => f.id === handleFolder.id)
                    if (foundFolderIndex !== -1) {
                        listFolder.splice(foundFolderIndex, 1)
                        dispatch(setListFolder(listFolder))
                    }
                    resolve()
                }
            } catch (error) {
                console.log(error, 'error')
                reject()
            }
        })
    }
}

export const getFolderById = async (folderId) => {
    const response = await FactoryService.request('FolderService').getById(folderId)
    return response.data
}

export const chooseParentFolder = (parentFolderId) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                let parentFolder = null
                if (parentFolderId) {
                    parentFolder = await getFolderById(parentFolderId)
                    const folders = parentFolder.childrenIds
                    const files = parentFolder.fileIds
                    dispatch(setListFolder(folders))
                    dispatch(setListFile(files))
                }
                dispatch({
                    type: types.CHOOSE_PARENT_FOLDER,
                    parentFolder
                })
                resolve(true)
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })
    }
}


export const chooseFolderTransfer = (folderId) => {
    return async (dispatch, getState) => {
        try {
            let selectFolderTransfer = null
            if (folderId) {
                selectFolderTransfer = await getFolderById(folderId)
                const folders = selectFolderTransfer.childrenIds
                dispatch(setListFolder(folders))
            } else {
                dispatch(getListFolder())
            }
            dispatch({
                type: types.SELECT_FOLDER_TRANSFER,
                selectFolderTransfer: selectFolderTransfer
            })

        } catch (error) {
            console.log(error, 'error')
        }

    }
}

export const chooseFolderDirectly = (folder) => {
    return async (dispatch, getState) => {

        dispatch({
            type: types.SELECT_FOLDER_TRANSFER,
            selectFolderTransfer: folder
        })
    }
}




export const getListFolder = (filterFolder = {}) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const parentFolder = getState().folder.parentFolder
                const filter = {
                    ...filterFolder
                }
                if (parentFolder && parentFolder.id) {
                    const parentFolderId = parentFolder.id
                    filter.parentId = parentFolderId
                }
                console.log(filterFolder, 'filterFolder')
                const response = await FactoryService.request('FolderService').getList({ filter: filterFolder })
                let folders = []
                if (response?.data?.data) {
                    folders = response.data.data
                }
                resolve(true)
                dispatch(setListFolder(folders))
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })


    }
}

export const handleCreateFolder = (name, description) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const parentFolder = getState().folder.parentFolder
                const folder = {
                    name,
                    description,
                    parentId: parentFolder ? parentFolder.id : ''
                }
                const response = await FactoryService.request('FolderService').create(folder)
                const createdFolder = response.data
                dispatch(pushCreatedFolder(createdFolder))
                resolve(true)
            } catch (error) {
                reject(false)
            }
        })
    }
}