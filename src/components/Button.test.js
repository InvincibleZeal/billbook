import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Button from "components/Button";

describe("Button", () => {
    it("should render without errors", () => {
        render(<Button></Button>);
    });

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
        const classnames = "external alpha charlie";
        render(<Button className="external alpha charlie"></Button>);
        expect(screen.getByRole("button")).not.toHaveClass("undefined");
        expect(screen.getByRole("button")).toHaveClass("btn ", classnames);
    });

    it("should have correct type attribute:button", () => {
        const type = "button";
        render(<Button type="button"></Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", type);
    });
    it("should have correct type attribute :submit", () => {
        const type = "submit";
        render(<Button type="submit"></Button>);
        expect(screen.getByRole("button")).toHaveAttribute("type", type);
    });
    it("should have correct ICON attribute:save", () => {
        const { getByTestId } = render(<Button icon="save"></Button>);
        expect(getByTestId("font-icon")).toHaveClass("fa", "fa-save");
    });
    it("should have correct ICON attribute:plus", () => {
        const { getByTestId } = render(<Button icon="plus"></Button>);

        expect(getByTestId("font-icon")).toHaveClass("fa", "fa-plus");
    });
    it("should have correct ICON attribute:none", () => {
        const { queryByTestId } = render(<Button icon=""></Button>);

        expect(queryByTestId("font-icon")).not.toBeInTheDocument();
    });
});
