const initialData = {
    data: [],
};

const itemReducer = (state = initialData, action) => {
    switch (action.type) {
        //     case "add_single_item":
        // we need not to create another separate dispatch for single customer ,
        // as we are redirectingt to listCustomers after which takes alll customers
        // which will include newly added as well

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
