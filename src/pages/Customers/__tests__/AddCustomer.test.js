import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import AddCustomer from "pages/Customers/AddCustomer";
import { mockContext } from "setupTests";
import { useForm } from "customHooks/useForm";
import {
    CustomersDetailsSchema,
    customersDetails,
} from "pages/Customers/FormDetails";

const fillInputs = (values) => {
    const inputs = {
        name: screen.queryByLabelText("name"),
        contact: screen.queryByLabelText("contact"),
        email: screen.queryByLabelText("email"),
    };
    for (const [key, input] of Object.entries(inputs)) {
        fireEvent.change(input, { target: { value: values[key] } });
    }
    return inputs;
};

describe("AddCustomer", () => {
    it("should have name amount and description inputs", () => {
        render(mockContext(<AddCustomer></AddCustomer>));
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });

    it("should contain correct input values", () => {
        render(mockContext(<AddCustomer></AddCustomer>));
        const values = {
            name: "Tim Matthew",
            contact: "9090909090",
            email: "tim@matthew.com",
        };
        const form = screen.getByTestId("customer-form");
        const inputs = fillInputs(values);
        fireEvent.click(form.querySelector("button"));

        expect(inputs.name).toHaveValue(values.name);
        expect(inputs.contact).toHaveValue(values.contact);
        expect(inputs.email).toHaveValue(values.email);
    });

    it("should not show error on correct values", () => {
        const values = {
            name: "Tim Matthew",
            contact: "9090909090",
            email: "tim@matthew.com",
        };
        const realUseState = React.useState;
        jest.spyOn(React, "useState").mockImplementationOnce(() =>
            realUseState(values)
        );

        const { result } = renderHook(() =>
            useForm(customersDetails, CustomersDetailsSchema)
        );
        render(mockContext(<AddCustomer></AddCustomer>));

        const form = screen.getByTestId("customer-form");
        fireEvent.click(form.querySelector("button"));
        act(() => {
            result.current.validate();
        });
        expect(result.current.errors).toBeUndefined();
    });
});
