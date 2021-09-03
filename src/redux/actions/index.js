import { ActionTypes } from "redux/constants/actions-types";
import { razorpay } from "api";

export const fetchCustomersList = () => async (dispatch) => {
    const { response } = await razorpay.fetchCustomers();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: ActionTypes.FETCH_CUSTOMERS_LIST,
            payload: response.items,
        });
};

export const fetchItemsList = () => async (dispatch) => {
    const { response } = await razorpay.fetchItems();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: ActionTypes.FETCH_ITEMS_LIST,
            payload: response.items,
        });
};

export const fetchInvoiceList = () => async (dispatch) => {
    const { response } = await razorpay.fetchInvoices();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: ActionTypes.FETCH_INVOICE_LIST,
            payload: response.items,
        });
};
