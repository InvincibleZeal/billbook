const initialData = {
    data: [],
};
const customerReducer = (state = initialData, action) => {
    switch (action.type) {
        case "add_single_customer":
            return {
                ...state,
                data: action.payload,
            };
        case "add_customers":
            return { ...state, data: action.payload };
        default:
            return { state };
    }
};
export default customerReducer;
