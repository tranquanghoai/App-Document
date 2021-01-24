import * as types from '../action/types/overview';

const initialState = {
    latestFolder: [],
    latestFile: [],
    latestFavouriteFolder: [],
    latestFavouriteFile: [],
    latestSubmit: [],
    sortBy: 0, // 0: name, 1: createdDate, 2: updatedDate
    sortValue: -1
}

export default auth = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LATEST_FOLDER:
            return { ...state, latestFolder: action.latestFolder }
        case types.SET_LATEST_FILE:
            return { ...state, latestFile: action.latestFile }
        case types.SET_LATEST_FAVOURITE_FOLDER:
            return { ...state, latestFavouriteFolder: action.latestFavouriteFolder }
        case types.SET_LATEST_FAVOURITE_FILE:
            return { ...state, latestFavouriteFile: action.latestFavouriteFile }
        case types.SET_LATEST_SUBMIT:
            return { ...state, latestSubmit: action.latestSubmit }
        case types.SET_SORT_TYPE:
            return { ...state, sortBy: action.sortBy }
        case types.SET_SORT_VALUE:
            return { ...state, sortValue: action.sortValue }
        default:
            return state;
    }
}