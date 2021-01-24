import * as types from './types/transition'
import FactoryService from '../../service/FactoryService'

export const setListTransition = (transitions) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_LIST_TRANSITION,
            transitions
        })
    }
}

export const getListTransition = () => {
    return async (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await FactoryService.request('TransitionService').getList()
                if (response?.data?.length) {
                    dispatch(setListTransition(response.data))
                }
            } catch (error) {
                reject(false)
                console.log(error, 'error')
            }
        })


    }
}

