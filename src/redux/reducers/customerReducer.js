import { ActionTypes } from "../constants/actions-types";

export const customersList = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_CUSTOMERS_LIST:
            return [...state, ...payload];
        default:
            return state;
    }
};
