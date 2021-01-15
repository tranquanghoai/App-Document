import * as types from './types/share'
import FactoryService from '../../service/FactoryService'
import { setListFile } from './file'

export const handleShareFile = (range, shareWith = []) => {
    return async (dispatch, getState) => {
        try {
            const handleFile = getState().file.handleFile
            if (handleFile) {
                const response = await FactoryService.request('ShareDocumentService').shareFile({ fileId: handleFile.id, range, shareWith })
                const submittedFile = response.data
                console.log(submittedFile, 'submittedFile')
                // dispatch(pushSubmittedFile(submittedFile))
            }
        } catch (error) {
            console.log(error, 'error')
        }

    }
}

export const setListShare = (listShare) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_SHARE_FILE,
            listShare
        })
    }
}


export const getListShareFile = (filterShare) => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const filter = {
                    ...filterShare.filter
                }
                filterShare.filter = filter
                const response = await FactoryService.request('ShareDocumentService').getList({ filter })
                let listShare = []
                console.log(response, 'response')
                if (response?.data?.data) {
                    listShare = response.data.data
                }
                resolve(true)
                dispatch(setListShare(listShare))
            } catch (error) {
                resolve(false)
                console.log(error, 'error')
            }
        })


    }
}

// const pushCreatedFolder = (folder) => {
//     return (dispatch) => {
//         dispatch({
//             type: types.PUSH_CREATED_FOLDER,
//             folder
//         })
//     }
// }

// export const selectHandleFolder = (folder) => {
//     return (dispatch) => {
//         dispatch({
//             type: types.CHOOSE_HANDLE_FOLDER,
//             handleFolder: folder
//         })
//     }
// }

// export const handleUpdateFolder = (folderId, params) => {
//     return (dispatch, getState) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const response = await FactoryService.request('FolderService').update(folderId, params)
//                 const updatedFolder = response.data
//                 const listFolder = [...getState().folder.folders]
//                 const foundFolder = listFolder.find(f => f.id === folderId)
//                 foundFolder.name = updatedFolder.name
//                 foundFolder.description = updatedFolder.description
//                 dispatch(setListFolder(listFolder))
//                 resolve(response.data)
//             } catch (error) {
//                 console.log(error, 'error')
//                 reject()
//             }
//         })
//     }
// }

// export const handleDeleteFolder = () => {
//     return (dispatch, getState) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const handleFolder = getState().folder.handleFolder
//                 if (handleFolder) {
//                     await FactoryService.request('FolderService').deleteFolder(handleFolder.id)
//                     console.log('Toi day khong')
//                     const listFolder = [...getState().folder.folders]
//                     const foundFolderIndex = listFolder.findIndex(f => f.id === handleFolder.id)
//                     if (foundFolderIndex !== -1) {
//                         listFolder.splice(foundFolderIndex, 1)
//                         dispatch(setListFolder(listFolder))
//                     }
//                     resolve()
//                 }
//             } catch (error) {
//                 console.log(error, 'error')
//                 reject()
//             }
//         })
//     }
// }

// export const getFolderById = async (folderId) => {
//     const response = await FactoryService.request('FolderService').getById(folderId)
//     return response.data
// }

// export const chooseParentFolder = (parentFolderId) => {
//     return async (dispatch, getState) => {
//         try {
//             let parentFolder = null
//             if (parentFolderId) {
//                 parentFolder = await getFolderById(parentFolderId)
//                 const folders = parentFolder.childrenIds
//                 const files = parentFolder.fileIds
//                 dispatch(setListFolder(folders))
//                 dispatch(setListFile(files))
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

// export const handleCreateFolder = (name, description) => {
//     return async (dispatch, getState) => {
//         return new Promise(async (resolve, reject) => {
//             try {
//                 const parentFolder = getState().folder.parentFolder
//                 const folder = {
//                     name,
//                     description,
//                     parentId: parentFolder ? parentFolder.id : ''
//                 }
//                 const response = await FactoryService.request('FolderService').create(folder)
//                 const createdFolder = response.data
//                 dispatch(pushCreatedFolder(createdFolder))
//                 resolve(true)
//             } catch (error) {
//                 reject(false)
//             }
//         })
//     }
// }