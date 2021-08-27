import Nope from "nope-validator";

// Fields for the Add Customers
export const customersDetails = {
    name: "",
    phone: "",
    email: "",
    date: new Date(),
};

// Schema for Add Customers Module
export const CustomersDetailsSchema = Nope.object().shape({
    name: Nope.string()
        .atLeast(5, "Please provide a longer name")
        .atMost(255, "Name is too long!"),
    email: Nope.string().email().required(),
    phone: Nope.number().required(),
});
