import * as types from '../action/types/auth';

const initialState = {
    accessToken: '',
    refreshToken: '',
    employee: null
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_AUTHENTICATION:
            const { employee, accessToken, refreshToken } = action
            return { ...state, employee, accessToken, refreshToken }
        case types.PUSH_CREATED_FILE:
            const { file } = action
            return { ...state, files: [...state.files, file] }
        case types.CHOOSE_CURRENT_FILE:
            const { currentFile } = action
            return { ...state, currentFile }
        case types.RESET_STORE: {
            state = initialState
        }
        default:
            return state;
    }
}