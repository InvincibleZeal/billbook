import { ActionTypes } from "../constants/actions-types";

export const setCustomerList = (customers) => {
    return {
        type: ActionTypes.SET_CUSTOMERS_LIST,
        payload: customers,
    };
};

export const setItemsList = (items) => {
    return {
        type: ActionTypes.SET_ITEMS_LIST,
        payload: items,
    };
};
