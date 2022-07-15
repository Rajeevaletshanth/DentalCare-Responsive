import { ActionTypes } from "../constance/action-types";

const initialState = {
    sidebar: "show"
};

export const sidebarReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SHOW_SIDEBAR:
            return {
                ...state,
                sidebar: payload,
              };
        case ActionTypes.HIDE_SIDEBAR:
            return {
                ...state,
                sidebar: payload,
              };
        default:
            return state;
    }
}