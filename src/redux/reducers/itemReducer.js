import { ActionTypes } from "../constants/actions-types";

export const itemsList = (state = [], { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_ITEMS_LIST:
            return [...state, ...payload];
        default:
            return state;
    }
};
