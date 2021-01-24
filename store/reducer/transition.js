import * as types from '../action/types/transition';

const initialState = {
    transitions: []
}

export default transition = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIST_TRANSITION:
            const { transitions } = action
            return {
                ...state,
                transitions
            }
        default:
            return state;
    }
}