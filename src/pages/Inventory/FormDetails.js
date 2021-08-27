import Nope from "nope-validator";

// Fields for the Add Items
export const itemDetails = {
    name: "",
    price: "",
    description: "",
    date: new Date(),
    id: Math.floor(Math.random() * 101 + 1),
};

// Schema For Item Details
export const ItemDetailsSchema = Nope.object().shape({
    name: Nope.string().required(),
    description: Nope.string().required(),
    price: Nope.number()
        .atLeast(0, "Please provide some price for the item")
        .required(),
});
