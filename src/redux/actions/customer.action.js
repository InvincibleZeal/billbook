// will be used later if required
// import { ActionTypes } from "../constants/actions-types";
import { razorpay } from "api";

export const fetchCustomersList = () => async (dispatch) => {
    const { response } = await razorpay.fetchCustomers();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: "add_customers",
            payload: response.items,
        });
};

export const fetchItemsList = () => async (dispatch) => {
    const { response } = await razorpay.fetchItems();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: "add_items",
            payload: response.items,
        });
};

export const fetchInvoiceList = () => async (dispatch) => {
    const { response } = await razorpay.fetchInvoices();
    if (response.error) console.error(response.error);
    else
        dispatch({
            type: "add_invoices",
            payload: response.items,
        });
};
