import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import itemReducer from "./itemReducer";
import invoiceReducer from "./invoiceReducer";
const allReducers = combineReducers({
    customerReducer,
    itemReducer,
    invoiceReducer,
});
export default allReducers;
