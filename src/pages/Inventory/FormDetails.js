import Nope from "nope-validator";

// Fields for the Add Items
export const itemDetails = {
    name: "",
    amount: "",
    description: "",
    currency: "INR",
};

// Schema For Item Details
export const ItemDetailsSchema = Nope.object().shape({
    name: Nope.string().required(),
    description: Nope.string().required(),
    amount: Nope.number()
        .atLeast(0, "Please provide some price for the item")
        .required(),
});
