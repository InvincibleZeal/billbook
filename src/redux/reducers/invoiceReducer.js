import { ActionTypes } from "../constants/actions-types";

export const invoiceList = (state = null, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_INVOICE_LIST:
            return [...payload];
        default:
            return state;
    }
};
