const initialData = {
    data: [],
};
const invoiceReducer = (state = initialData, action) => {
    switch (action.type) {
        case "add_invoices":
            console.log(action.payload);
            return {
                ...state,
                data: action.payload,
            };
        default:
            return { state };
    }
};
export default invoiceReducer;
