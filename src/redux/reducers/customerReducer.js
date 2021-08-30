import { ActionTypes } from "../constants/actions-types";

export const customersList = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_CUSTOMERS_LIST:
            return [...state, ...payload];
        default:
            return state;
    }
};
