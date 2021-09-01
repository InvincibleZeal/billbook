import { ActionTypes } from "redux/constants/actions-types";

export const customersList = (state = null, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_CUSTOMERS_LIST:
            return [...payload];
        default:
            return state;
    }
};
