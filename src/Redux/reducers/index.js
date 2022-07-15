import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { sidebarReducer } from "./sidebarReducer";

const reducers = combineReducers({
    // admin: adminReducer,
    sidebar: sidebarReducer
});

export default reducers;