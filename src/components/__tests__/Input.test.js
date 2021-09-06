import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "components/Input";

describe("Card", () => {
    it("should not be an empty DOM element", () => {
        const { container } = render(<Input></Input>);
        expect(container).not.toBeNull();
        expect(screen.queryByRole("textbox")).toBeInTheDocument();
    });

    it("should have correct custom value", () => {
        const value = "typing";
        render(<Input value={value} readOnly></Input>);
        expect(screen.getByRole("textbox")).toHaveValue(value);
    });

    it("should have default 'input-md' class", () => {
        const { getByRole } = render(<Input></Input>);
        expect(getByRole("textbox")).toHaveClass("input-md");
    });

    it("should have input-md class on md size", () => {
        const { getByRole } = render(<Input size="sm"></Input>);
        expect(getByRole("textbox")).toHaveClass("input-sm");
    });
});
