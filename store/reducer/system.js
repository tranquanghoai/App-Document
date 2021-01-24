import * as types from '../action/types/system';

const initialState = {
    isOpenModalAddDocument: false,
    isOpenModalFileAction: false,
    isOpenModalFolderAction: false,
    isOpenModalCreateFolder: false,
    isOpenModalAddFileInfo: false,
    isOpenModalTransferFolder: false,
    isOpenModalFileSubmit: false,
    isOpenModalSelectForm: false,
    isOpenModalShareAction: false,
    isFromHome: false,
    isOpenSort: true
}

export default system = (state = initialState, action) => {
    switch (action.type) {
        case types.OPEN_MODAL_ADD_DOCUMENT:
            return { ...state, isOpenModalAddDocument: true }
        case types.CLOSE_MODAL_ADD_DOCUMENT:
            return { ...state, isOpenModalAddDocument: false }

        case types.OPEN_MODAL_FILE_ACTION:
            return { ...state, isOpenModalFileAction: true }
        case types.CLOSE_MODAL_FILE_ACTION:
            return { ...state, isOpenModalFileAction: false }

        case types.OPEN_MODAL_FOLDER_ACTION:
            return { ...state, isOpenModalFolderAction: true }
        case types.CLOSE_MODAL_FOLDER_ACTION:
            return { ...state, isOpenModalFolderAction: false }

        case types.OPEN_MODAL_CREATE_FOLDER:
            return { ...state, isOpenModalCreateFolder: true }
        case types.CLOSE_MODAL_CREATE_FOLDER:
            return { ...state, isOpenModalCreateFolder: false }

        case types.OPEN_MODAL_ADD_FILE_INFO:
            return { ...state, isOpenModalAddFileInfo: true }
        case types.CLOSE_MODAL_ADD_FILE_INFO:
            return { ...state, isOpenModalAddFileInfo: false }

        case types.OPEN_MODAL_TRANSFER_FOLDER:
            return { ...state, isOpenModalTransferFolder: true }
        case types.CLOSE_MODAL_TRANSFER_FOLDER:
            return { ...state, isOpenModalTransferFolder: false }

        case types.OPEN_MODAL_FILE_SUBMIT:
            return { ...state, isOpenModalFileSubmit: true }
        case types.CLOSE_MODAL_FILE_SUBMIT:
            return { ...state, isOpenModalFileSubmit: false }

        case types.OPEN_MODAL_SELECT_FORM:
            return { ...state, isOpenModalSelectForm: true }
        case types.CLOSE_MODAL_SELECT_FORM:
            return { ...state, isOpenModalSelectForm: false }

        case types.OPEN_MODAL_SHARE_ACTION:
            return { ...state, isOpenModalShareAction: true }
        case types.CLOSE_MODAL_SHARE_ACTION:
            return { ...state, isOpenModalShareAction: false }

        case types.IS_FROM_HOME:
            return { ...state, isFromHome: true }
        case types.IS_NOT_FROM_HOME:
            return { ...state, isFromHome: false }

        case types.OPEN_MODAL_SORT:
            return { ...state, isOpenSort: true }
        case types.CLOSE_MODAL_SORT:
            return { ...state, isOpenSort: false }

        default:
            return state;
    }
}