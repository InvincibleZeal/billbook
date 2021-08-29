import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import itemReducer from "./itemReducer";

const allReducers = combineReducers({ customerReducer, itemReducer });
export default allReducers;
