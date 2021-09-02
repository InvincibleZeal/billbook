import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import AddItem from "pages/Inventory/AddItem";
import { mockContext } from "setupTests";

describe("AddItem", () => {
    it("should have name amount and description inputs", () => {
        render(mockContext(<AddItem></AddItem>));
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });

    it("should contain correct input values", () => {
        render(mockContext(<AddItem></AddItem>));
        const form = screen.getByTestId("item-form");
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
        };

        const inputs = {
            name: screen.queryByLabelText("name"),
            amount: screen.queryByLabelText("amount"),
            description: screen.queryByLabelText("description"),
        };

        for (const [key, input] of Object.entries(inputs)) {
            fireEvent.change(input, { target: { value: values[key] } });
        }
        fireEvent.click(form.querySelector("button"));

        expect(inputs.description.innerHTML).toEqual(values.description);
        expect(inputs.name).toHaveValue(values.name);
        expect(inputs.amount).toHaveValue(values.amount);
    });

    it("should submit form on button click", () => {
        render(mockContext(<AddItem></AddItem>));
        const form = screen.getByTestId("item-form");
        const func = jest.fn();
        form.onsubmit = func;
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
        };

        const inputs = {
            name: screen.queryByLabelText("name"),
            amount: screen.queryByLabelText("amount"),
            description: screen.queryByLabelText("description"),
        };

        for (const [key, input] of Object.entries(inputs)) {
            fireEvent.change(input, { target: { value: values[key] } });
        }
        fireEvent.click(form.querySelector("button"));
        expect(func).toHaveBeenCalled();
    });
});
