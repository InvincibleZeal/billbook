import Nope from "nope-validator";

// Fields for the Invoice
export const invoiceDetails = {
    customer: {},
    issueDate: "",
    dueDate: "",
    notes: "",
    invoice_number: "",
    reference_number: "",
    customer_id: "",
    line_items: [],
    type: "invoice",
};

// Schema For Customer Details
export const InvoiceDetailsSchema = Nope.object().shape({
    customer: Nope.object().shape({
        name: Nope.string().required(),
    }),
    issueDate: Nope.string().required(),
    dueDate: Nope.string().required(),
    notes: Nope.string(),
    invoice_number: Nope.string().required(),
    reference_number: Nope.string().required(),
    line_items: Nope.array().minLength(0, "This is a required field"),
});
