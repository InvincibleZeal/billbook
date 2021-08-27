import Nope from "nope-validator";

// Fields for the Invoice
export const invoiceDetails = {
    issueDate: "",
    dueDate: "",
    notes: "",
    customer: {},
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
    invoiceNumber: Nope.string().required(),
    referenceNumber: Nope.string().required(),
    items: Nope.array().minLength(0, "This is a required field"),
    notes: Nope.string(),
});
