import { combineReducers } from "redux";
import { adminReducer } from "./adminReducer";
import { sidebarReducer } from "./sidebarReducer";
import { languageReducer } from './languageReducer'

const reducers = combineReducers({
    // admin: adminReducer,
    sidebar: sidebarReducer,
    lang: languageReducer
});

export default reducers;