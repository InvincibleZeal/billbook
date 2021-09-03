import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import AddItem from "pages/Inventory/AddItem";
import { mockContext } from "setupTests";
import { useForm } from "customHooks/useForm";
import { ItemDetailsSchema, itemDetails } from "pages/Inventory/FormDetails";

const fillInputs = async (values) => {
    const inputs = {
        name: screen.queryByLabelText("name"),
        amount: screen.queryByLabelText("amount"),
        description: screen.queryByLabelText("description"),
    };
    for (const [key, input] of Object.entries(inputs)) {
        console.log(key, input.value || "None", values[key]);
        await fireEvent.change(input, { target: { value: values[key] } });
    }
    return inputs;
};

describe("AddItem", () => {
    it("should have name amount and description inputs", () => {
        render(mockContext(<AddItem></AddItem>));
        expect(screen.queryAllByRole("textbox")).not.toBeNull();
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("should contain correct input values", () => {
        render(mockContext(<AddItem></AddItem>));
        const form = screen.getByTestId("item-form");
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
        };
        const inputs = fillInputs(values);
        fireEvent.click(form.querySelector("button"));
        screen.debug(inputs.description);
        expect(inputs.description.innerHTML).toEqual(values.description);
        expect(inputs.name).toHaveValue(values.name);
        expect(inputs.amount).toHaveValue(values.amount);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip("should show error on incorrect values", async () => {
        const { result } = renderHook(() =>
            useForm(itemDetails, ItemDetailsSchema)
        );

        render(mockContext(<AddItem></AddItem>));
        const values = {
            name: "Precious Item",
            amount: "23",
            description: "useful",
        };
        await fillInputs(values);
        // const form = screen.getByTestId("item-form");
        // fireEvent.click(form.querySelector("button"));
        act(() => {
            result.current.validate();
        });
        console.log(result.current);
        expect(result.current.error.name).toBeTruthy();
        // expect(result.current.errors.amount).toBe("Invalid input");
    });
});
