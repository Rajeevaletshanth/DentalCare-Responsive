import { ActionTypes } from '../constance/action-types';

export const setLang = (lang) => {
    return {
        type : ActionTypes.SET_LANG,
        payload : lang
    }
}