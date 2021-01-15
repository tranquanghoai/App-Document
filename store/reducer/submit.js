import * as types from '../action/types/submit';

const initialState = {
    listSubmitFile: [],
    selectSubmitFile: null
}

export default submit = (state = initialState, action) => {
    switch (action.type) {
        case types.SUBMIT_FILE_SUCCESS:
            const { submit } = action
            const listSubmitFile = [...state.listSubmitFile]
            listSubmitFile.push(submit)
            return { ...state, listSubmitFile }
        case types.SELECT_SUBMIT_FILE:
            return {
                ...state,
                selectSubmitFile: action.selectSubmitFile
            }
        case types.SET_LIST_SUBMIT_FILE:
            return {
                ...state,
                listSubmitFile: action.listSubmitFile
            }
        default:
            return state;
    }
}
