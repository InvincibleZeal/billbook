import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "components/Button";

describe("Button", () => {
    it("should not be an empty DOM element", () => {
        const { container } = render(<Button></Button>);
        expect(container).not.toBeNull();
    });

    it("should contain a button element", () => {
        render(<Button></Button>);
        expect(screen.queryByRole("button")).not.toBeNull();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should render child text", () => {
        const text = "Click me";
        render(<Button>{text}</Button>);
        expect(screen.getByRole("button")).toHaveTextContent(text);
    });

    it("should contain 'btn' class", () => {
        render(<Button></Button>);
        expect(screen.getByRole("button")).not.toHaveClass("undefined");
        expect(screen.getByRole("button")).toHaveClass("btn");
    });

    it("should have correct type attribute", () => {
        const type = "button";
        render(<Button type="button"></Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", type);
    });

    it("should have correct 'icon' attribute", () => {
        render(<Button icon="save"></Button>);
        expect(screen.getByTestId("button-icon")).toHaveClass("fa", "fa-save");
    });

    it("should have correct custom attribute", () => {
        const value = "value";
        render(<Button icon="save" some={value}></Button>);
        expect(screen.getByRole("button")).toHaveAttribute("some", value);
    });

    it("should run onClick handler", () => {
        const func = jest.fn();
        render(<Button onClick={func}></Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(func).toHaveBeenCalled();
    });

    it("should not run onClick handler when disabled", () => {
        const func = jest.fn();
        render(<Button icon="save" disabled={true} onClick={func}></Button>);
        expect(screen.getByRole("button")).toHaveAttribute("disabled");
        fireEvent.click(screen.getByRole("button"));
        expect(func).not.toHaveBeenCalled();
    });
});
