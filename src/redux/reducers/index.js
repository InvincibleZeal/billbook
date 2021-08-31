import { itemsList } from "./itemReducer";
import { customersList } from "./customerReducer";
import { invoiceList } from "./invoiceReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    allCustomers: customersList,
    allItems: itemsList,
    allInvoices: invoiceList,
});

export default reducers;
