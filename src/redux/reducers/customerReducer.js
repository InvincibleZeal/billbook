const initialData = {
    data: [],
};
const customerReducer = (state = initialData, action) => {
    switch (action.type) {
        case "add_single_customer":
        case "add_customers":
            console.log(action.payload);
            return {
                ...state,
                data: action.payload,
            };
        default:
            return { state };
    }
};
export default customerReducer;
