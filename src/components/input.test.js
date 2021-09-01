import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Input from "components/Input";

describe("input component test cases", () => {
    it("renders properly:without errors", () => {
        render(<Input></Input>);
    });
    it("should contain something", () => {
        const { container } = render(<Input></Input>);
        expect(container).not.toBeNull();
    });
    it("check for textarea/input-box", () => {
        const { queryByTestId } = render(<Input type="textarea"></Input>);

        expect(queryByTestId("textarea")).toBeInTheDocument();
        expect(queryByTestId("input-box")).not.toBeInTheDocument();
    });
    it("check for textarea/input-box", () => {
        const { queryByTestId } = render(<Input type="input-box"></Input>);

        expect(queryByTestId("textarea")).not.toBeInTheDocument();
        expect(queryByTestId("input-box")).toBeInTheDocument();
    });
    it("check for icon in input box", () => {
        const { queryByTestId, debug } = render(<Input icon="hashtag"></Input>);
        debug();
        expect(queryByTestId("input-text-icon")).toBeInTheDocument();
    });
    it("check for textarea", () => {
        const { queryByTestId, debug, container } = render(
            <Input size="sm"></Input>
        );
        debug();
    });
});
