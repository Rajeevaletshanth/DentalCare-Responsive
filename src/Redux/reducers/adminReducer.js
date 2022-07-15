import { ActionTypes } from "../constance/action-types";

const initialState = {};

export const adminReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SET_ADMIN:
            return {
                ...state,
                isLoggedIn: true,
                admin: payload,
              };
        case ActionTypes.REMOVE_ADMIN:
            return {
                ...state,
                isLoggedIn: false,
                admin: null,
              };
        default:
            return state;
    }
}