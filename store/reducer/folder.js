import * as types from '../action/types/folder';

const initialState = {
    folders: [],
    parentFolder: null,
    handleFolder: null,
    selectFolderTransfer: null
}

export default folder = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIST_FOLDER:
            const { folders } = action
            return { ...state, folders: folders }
        case types.PUSH_CREATED_FOLDER:
            const { folder } = action
            return { ...state, folders: [...state.folders, folder] }
        case types.CHOOSE_PARENT_FOLDER:
            return { ...state, parentFolder: action.parentFolder }
        case types.CHOOSE_HANDLE_FOLDER:
            return { ...state, handleFolder: action.handleFolder }
        case types.SELECT_FOLDER_TRANSFER:
            return { ...state, selectFolderTransfer: action.selectFolderTransfer }
        default:
            return state;
    }
}