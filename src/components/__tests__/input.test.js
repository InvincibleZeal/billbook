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
        expect(queryByTestId("textbox")).not.toBeInTheDocument();
    });
    it("check for textarea/input-box", () => {
        const { queryByTestId } = render(<Input type="text"></Input>);

        expect(queryByTestId("textarea")).not.toBeInTheDocument();
        expect(queryByTestId("textbox")).toBeInTheDocument();
    });
    it("check for icon in input box", () => {
        const { queryByTestId, debug } = render(<Input icon="hashtag"></Input>);
        debug();
        expect(queryByTestId("input-text-icon")).toBeInTheDocument();
    });
    it("check for input-box:size", () => {
        const { queryByTestId } = render(<Input size="sm" type="text"></Input>);
        expect(queryByTestId("textbox")).toBeInTheDocument();
        expect(queryByTestId("textbox")).toHaveClass("sm");
    });
    it("check for input-box:size", () => {
        const { queryByTestId } = render(<Input size="md" type="text"></Input>);
        expect(queryByTestId("textbox")).toBeInTheDocument();
        expect(queryByTestId("textbox")).toHaveClass("md");
    });
    it("check for textarea:size", () => {
        const { queryByTestId } = render(
            <Input size="sm" type="textarea"></Input>
        );
        expect(queryByTestId("textarea")).toBeInTheDocument();
        expect(queryByTestId("textarea")).toHaveClass("sm");
    });
    it("check for textarea:size", () => {
        const { queryByTestId } = render(
            <Input size="md" type="textarea"></Input>
        );
        expect(queryByTestId("textarea")).toBeInTheDocument();
        expect(queryByTestId("textarea")).toHaveClass("md");
    });
});
