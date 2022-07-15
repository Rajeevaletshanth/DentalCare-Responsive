import { ActionTypes } from '../constance/action-types';

export const setAdmin = (admin) => {
    return {
        type : ActionTypes.SET_ADMIN,
        payload : admin
    }
}

export const removeAdmin = () => {
    return {
        type : ActionTypes.REMOVE_ADMIN,
    }
}