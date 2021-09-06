import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import CreateInvoice from "pages/Invoice/CreateInvoice";
import { mockContext } from "setupTests";
import { useForm } from "customHooks/useForm";
import {
    InvoiceDetailsSchema,
    invoiceDetails,
} from "pages/Invoice/FormDetails";

const fillInputs = (values) => {
    const inputs = {
        issueDate: screen.queryByLabelText("issueDate"),
        dueDate: screen.queryByLabelText("dueDate"),
        notes: screen.queryByLabelText("notes"),
        invoice_number: screen.queryByLabelText("invoice_number"),
        reference_number: screen.queryByLabelText("reference_number"),
    };
    for (const [key, input] of Object.entries(inputs)) {
        fireEvent.change(input, { target: { value: values[key] } });
    }
    return inputs;
};

describe("CreateInvoice", () => {
    it("should contain form inputs", () => {
        render(mockContext(<CreateInvoice></CreateInvoice>));
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });

    it("should contain correct input values", () => {
        render(mockContext(<CreateInvoice></CreateInvoice>));
        const values = {
            issueDate: "2021-07-15",
            dueDate: "2021-07-18",
            notes: "something",
            customer: {
                name: "Samanth D",
                contact: "9513489402",
                email: "dasarisamanth@gmail.com",
            },
            customer_id: "cust_Hssv8OCeinT31s",
            invoice_number: "33",
            reference_number: "33322",
            line_items: [{ item_id: "item_HsY28RjdMThK2Y", quantity: 2 }],
            description: "useful",
            type: "invoice",
        };
        const form = screen.getByTestId("invoice-form");
        const inputs = fillInputs(values);
        fireEvent.click(form.querySelector("button"));

        for (const [key, input] of Object.entries(inputs)) {
            expect(input).toHaveValue(values[key]);
        }
    });

    it("should not show error on correct values", () => {
        const values = {
            issueDate: "2021-07-15",
            dueDate: "2021-07-18",
            notes: "something",
            customer: {
                name: "Samanth D",
                contact: "9513489402",
                email: "dasarisamanth@gmail.com",
            },
            customer_id: "cust_Hssv8OCeinT31s",
            invoice_number: "33",
            reference_number: "33322",
            line_items: [{ item_id: "item_HsY28RjdMThK2Y", quantity: 2 }],
            description: "useful",
            type: "invoice",
        };
        const realUseState = React.useState;
        jest.spyOn(React, "useState").mockImplementationOnce(() =>
            realUseState(values)
        );

        const { result } = renderHook(() =>
            useForm(invoiceDetails, InvoiceDetailsSchema)
        );

        render(mockContext(<CreateInvoice></CreateInvoice>));
        act(() => {
            result.current.validate();
        });
        expect(result.current.errors).toBeUndefined();
    });
});
