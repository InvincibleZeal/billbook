import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "../Card";

describe("Card", () => {
    it("should not be an empty DOM element", () => {
        const { container } = render(<Card></Card>);
        expect(container).not.toBeNull();
        expect(screen.queryByTestId("card")).toBeInTheDocument();
    });

    it("should render child text", () => {
        const text = "I am a card";
        render(<Card>{text}</Card>);
        expect(screen.getByTestId("card")).toHaveTextContent(text);
    });

    it("should contain 'card-default' class", () => {
        render(<Card></Card>);
        expect(screen.getByTestId("card")).toHaveClass("card-default");
    });

    it("should have correct custom and default class", () => {
        const className = "card-custom";
        render(<Card className={className}></Card>);
        expect(screen.getByTestId("card")).toHaveClass("card-default");
        expect(screen.getByTestId("card")).toHaveClass(className);
    });
});
