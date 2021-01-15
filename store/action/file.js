import * as types from './types/file'
import FactoryService from '../../service/FactoryService'
import RNFetchBlob from 'rn-fetch-blob';
import { asin } from 'react-native-reanimated';

export const setListFile = (files) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LIST_FILE,
            files
        })
    }
}

export const handleLikeFile = () => {
    return async (dispatch, getState) => {
        try {
            const handleFile = getState().file.handleFile
            const files = [...getState().file.files]
            const like = handleFile.like ? false : true
            const response = await FactoryService.request('FileService').updateFile(handleFile.id, { like })
            const foundFile = files.find(f => f.id === handleFile.id)
            if (foundFile) {
                foundFile.like = like
                dispatch(setListFile(files))
            }
            return response.data
        } catch (error) {
            console.log(error, 'hoai')
        }

    }
}

export const getFileById = async (fileId) => {
    const response = await FactoryService.request('FileService').getById(fileId)
    return response.data
}

export const handleChooseFile = (fileId) => {
    return async (dispatch) => {
        try {
            const foundFile = await getFileById(fileId)
            dispatch({
                type: types.CHOOSE_CURRENT_FILE,
                currentFile: foundFile
            })
        } catch (error) {
            console.log(error, 'error')
        }

    }
}

export const chooseHandleFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: types.CHOOSE_HANDLE_FILE,
            handleFile: file
        })
    }
}

const pushCreatedFile = (file) => {
    return (dispatch) => {
        dispatch({
            type: types.PUSH_CREATED_FILE,
            file
        })
    }
}

export const handleTransferFolder = () => {
    return async (dispatch, getState) => {
        try {
            const handleFile = getState().file.handleFile
            const selectFolderTransfer = getState().folder.selectFolderTransfer
            if (!handleFile) return
            const tranferObj = {
                fileId: handleFile.id,
                folderId: selectFolderTransfer ? selectFolderTransfer.id : undefined
            }
            await FactoryService.request('FileService').transferFile(tranferObj)
        } catch (error) {
            console.log(error)
        }
    }
}

export const getListFile = (filterFile) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const parentFolder = getState().folder.parentFolder
                const filter = {
                    ...filterFile
                }
                if (parentFolder && parentFolder.id) {
                    const parentFolderId = parentFolder.id
                    filter.folderId = parentFolderId
                }
                const response = await FactoryService.request('FileService').getList({ filter })
                let files = []
                if (response?.data?.data) {
                    files = response.data.data
                }
                resolve(true)
                dispatch(setListFile(files))
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })


    }
}

export const handleDeleteFile = () => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const handleFile = getState().file.handleFile
                if (handleFile) {
                    await FactoryService.request('FileService').deleteFile(handleFile.id)
                    const listFile = [...getState().file.files]
                    const foundFileIndex = listFile.findIndex(f => f.id === handleFile.id)
                    if (foundFileIndex !== -1) {
                        listFile.splice(foundFileIndex, 1)
                        dispatch(setListFile(listFile))
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

export const handleCreateTextFile = (name, description, content) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const parentFolder = getState().folder.parentFolder
                const file = {
                    name,
                    description,
                    content,
                    folderId: parentFolder ? parentFolder.id : ''
                }
                const response = await FactoryService.request('FileService').createTextFile(file)
                console.log(response, 'response')
                const createdFile = response.data
                dispatch(pushCreatedFile(createdFile))
                resolve(true)
            } catch (error) {
                console.log(error, 'error')
                reject(false)
            }
        })
    }
}

export const handleUpdateTextFile = (name, description, content) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const currentFile = getState().file.currentFile
                const file = {
                    name, description, content
                }
                const response = await FactoryService.request('FileService').updateById(currentFile.id, file)
                console.log(response, 'response')
                const updatedFile = response.data
                // dispatch(pushCreatedFile(createdFile))
                resolve(true)
            } catch (error) {
                console.log(error, 'error')
                reject(false)
            }
        })
    }
}


export const handleUpdateImageFile = (name, description, images) => {
    console.log(name, description, images, 'name, description, images')
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const currentFile = getState().file.currentFile
                let data = [
                    { name: 'name', data: name },
                    { name: 'description', data: description ? description : '' },
                ]
                let attachFileIds = []
                for (let image of images) {
                    if (image.id) {
                        attachFileIds.push(image.id)
                    } else {
                        const fileName = image.path.split('/')[image.path.split('/').length - 1]
                        data.push({ name: 'images', filename: fileName, type: image.mime, data: RNFetchBlob.wrap(image.path) })
                    }
                }
                // for(){}
                // data.unshift({ name: 'attachFileIds', data: attachFileIds })
                // for (let file of attachFileIds) {
                // }
                const response = await FactoryService.request('FileService').updateImageFile(data, currentFile.id)
                resolve(true)
            } catch (error) {
                console.log(error, 'error')
                reject(false)
            }
        })
    }
}

export const handleCreateImageFile = (name, description, images) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const parentFolder = getState().folder.parentFolder
                let data = [
                    { name: 'name', data: name },
                    { name: 'description', data: description ? description : '' },
                    { name: 'folderId', data: parentFolder ? parentFolder.id : '' }
                ]
                for (let image of images) {
                    const fileName = image.path.split('/')[image.path.split('/').length - 1]
                    data.push({ name: 'images', filename: fileName, type: image.mime, data: RNFetchBlob.wrap(image.path) })
                }
                const response = await FactoryService.request('FileService').createImageFile(data)
                const createdFile = response.data
                dispatch(pushCreatedFile(createdFile))
                resolve(true)
            } catch (error) {
                console.log(error, 'error hoai')
                reject(false)
            }
        })
    }
}
// export const getFolderById = async (folderId) => {
//     try {
//         const response = await FactoryService.request('FolderService').getById(folderId)
//         return response.data
//     } catch (error) {

//     }
// }

// export const chooseParentFolder = (parentFolderId) => {
//     return async (dispatch, getState) => {
//         try {
//             let parentFolder = null
//             if (parentFolderId) {
//                 parentFolder = await getFolderById(parentFolderId)
//             }
//             dispatch({
//                 type: types.CHOOSE_PARENT_FOLDER,
//                 parentFolder
//             })
//         } catch (error) {
//             console.log(error, 'error')
//         }

//     }
// }

// export const getListFolder = (filterFolder) => {
//     return async (dispatch, getState) => {
//         try {
//             const parentFolder = getState().folder.parentFolder
//             const filter = {
//                 ...filterFolder.filter
//             }
//             if (parentFolder && parentFolder.id) {
//                 const parentFolderId = parentFolder.id
//                 filter.parentId = parentFolderId
//             }
//             filterFolder.filter = filter
//             const response = await FactoryService.request('FolderService').getList(filterFolder)
//             let folders = []
//             if (response?.data?.data) {
//                 folders = response.data.data
//             }
//             dispatch(setListFolder(folders))
//         } catch (error) {
//             console.log(error, 'error')
//         }
//     }
// }

