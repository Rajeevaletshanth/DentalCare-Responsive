import { ActionTypes } from "../constance/action-types";

const initialState = "it";

export const languageReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.SET_LANG:
            return payload;
        default:
            return state;
    }
}