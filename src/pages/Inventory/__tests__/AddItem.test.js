/* eslint-disable jest/no-disabled-tests */
import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import AddItem from "pages/Inventory/AddItem";
import { mockContext } from "setupTests";
import { useForm } from "customHooks/useForm";
import { ItemDetailsSchema, itemDetails } from "pages/Inventory/FormDetails";

const fillInputs = (values) => {
    const inputs = {
        name: screen.queryByLabelText("name"),
        amount: screen.queryByLabelText("amount"),
        description: screen.queryByLabelText("description"),
    };
    for (const [key, input] of Object.entries(inputs)) {
        fireEvent.change(input, { target: { value: values[key] } });
    }
    return inputs;
};

describe("AddItem", () => {
    it("should have name amount and description inputs", () => {
        render(mockContext(<AddItem></AddItem>));
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });

    it("should contain correct input values", () => {
        render(mockContext(<AddItem></AddItem>));
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
        };
        const form = screen.getByTestId("item-form");
        const inputs = fillInputs(values);
        fireEvent.click(form.querySelector("button"));
        expect(inputs.description.innerHTML).toEqual(values.description);
        expect(inputs.name).toHaveValue(values.name);
        expect(inputs.amount).toHaveValue(values.amount);
    });

    it("should not show error on correct values", () => {
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
            currency: "INR",
        };
        const realUseState = React.useState;
        jest.spyOn(React, "useState").mockImplementationOnce(() =>
            realUseState(values)
        );

        const { result } = renderHook(() =>
            useForm(itemDetails, ItemDetailsSchema)
        );

        render(mockContext(<AddItem></AddItem>));
        act(() => {
            result.current.validate();
        });
        expect(result.current.error).toBeUndefined();
    });
});
