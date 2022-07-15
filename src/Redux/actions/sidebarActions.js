import { ActionTypes } from '../constance/action-types';

export const showSidebar = (sidebar) => {
    return {
        type : ActionTypes.SHOW_SIDEBAR,
        payload : sidebar
    }
}

export const hideSidebar = (sidebar) => {
    return {
        type : ActionTypes.HIDE_SIDEBAR,
        payload : sidebar
    }
}