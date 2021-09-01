import { itemsList } from "redux/reducers/itemReducer";
import { customersList } from "redux/reducers/customerReducer";
import { invoiceList } from "redux/reducers/invoiceReducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    allCustomers: customersList,
    allItems: itemsList,
    allInvoices: invoiceList,
});

export default reducers;
