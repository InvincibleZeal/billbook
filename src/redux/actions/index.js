import { ActionTypes } from "../constants/actions-types";
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

export const setItemsList = (items) => {
    return {
        type: ActionTypes.SET_ITEMS_LIST,
        payload: items,
    };
};
