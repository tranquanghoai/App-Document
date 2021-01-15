import * as types from '../action/types/share';

const initialState = {
    listShare: [],
}

export default share = (state = initialState, action) => {
    switch (action.type) {
        case types.SHARE_FILE_SUCCESS:
            const { shareFile } = action
            const currentListShare = [...state.listShare]
            currentListShare.push(shareFile)
            return { ...state, listShare: currentListShare }

        case types.SET_SHARE_FILE:
            const { listShare } = action
            return { ...state, listShare }
        default:
            return state;
    }
}