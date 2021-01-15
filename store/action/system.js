import * as types from './types/system'

export const openModalAddDocument = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_ADD_DOCUMENT
        })
    }
}

export const closeModalAddDocument = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_ADD_DOCUMENT
        })
    }
}

export const openModalFileAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_FILE_ACTION
        })
    }
}

export const closeModalFileAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_FILE_ACTION
        })
    }
}

export const openModalFolderAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_FOLDER_ACTION
        })
    }
}

export const closeModalFolderAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_FOLDER_ACTION
        })
    }
}

export const openModalCreateFolder = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_CREATE_FOLDER
        })
    }
}

export const closeModalCreateFolder = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_CREATE_FOLDER
        })
    }
}

export const openModalAddFileInfo = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_ADD_FILE_INFO
        })
    }
}

export const closeModalAddFileInfo = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_ADD_FILE_INFO
        })
    }
}

export const openModalFileSubmit = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_FILE_SUBMIT
        })
    }
}

export const closeModalFileSubmit = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_FILE_SUBMIT
        })
    }
}