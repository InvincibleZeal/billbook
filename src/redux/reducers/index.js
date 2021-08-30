import { itemsList } from "./itemReducer";
import { customersList } from "./customerReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    allCustomers: customersList,
    allItems: itemsList,
});

export default reducers;
