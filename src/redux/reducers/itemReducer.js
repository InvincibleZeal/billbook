const itemReducer = (state, action) => {
    switch (action.type) {
        case "add_single_item":
            return {
                ...state,
            };
        case "add_items":
            return { ...state };
        default:
            return { state };
    }
};
export default itemReducer;
