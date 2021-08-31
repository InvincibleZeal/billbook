import { ActionTypes } from "../constants/actions-types";
import { razorpay } from "api";

export const fetchCustomersList = () => async (dispatch) => {
    const { error, response } = await razorpay.fetchCustomers();
    if (error) console.error(error);
    else
        dispatch({
            type: ActionTypes.FETCH_CUSTOMERS_LIST,
            payload: response.items,
        });
};

export const setItemsList = (items) => {
    return {
        type: ActionTypes.SET_ITEMS_LIST,
        payload: items,
    };
};
