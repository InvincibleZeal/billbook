const initialData = {
    data: [],
};

const itemReducer = (state = initialData, action) => {
    switch (action.type) {
        case "add_single_item":
        case "add_items":
            console.log(action.payload);
            return {
                ...state,
                data: action.payload,
            };
        default:
            return { state };
    }
};
export default itemReducer;
