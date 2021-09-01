import { ActionTypes } from "../constants/actions-types";

export const itemsList = (state = null, { type, payload }) => {
    switch (type) {
        case ActionTypes.FETCH_ITEMS_LIST:
            return [...payload];
        default:
            return state;
    }
};
