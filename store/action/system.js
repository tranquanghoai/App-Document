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

export const openModalSelectForm = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_SELECT_FORM
        })
    }
}

export const closeModalSelectForm = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_SELECT_FORM
        })
    }
}

export const openModalShareAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_SHARE_ACTION
        })
    }
}

export const closeModalShareAction = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_SHARE_ACTION
        })
    }
}

export const isFromHome = () => {
    return (dispatch) => {
        dispatch({
            type: types.IS_FROM_HOME
        })
    }
}

export const isNotFromHome = () => {
    return (dispatch) => {
        dispatch({
            type: types.IS_NOT_FROM_HOME
        })
    }
}

export const openModalSortDoc = () => {
    return (dispatch) => {
        dispatch({
            type: types.OPEN_MODAL_SORT
        })
    }
}

export const closeModalSortDoc = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLOSE_MODAL_SORT
        })
    }
}