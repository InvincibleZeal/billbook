import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import Spinner from "components/Spinner";

describe("Button", () => {
    it("should render without errors", () => {
        render(<Spinner loading={true}></Spinner>);
    });

    it("should not be an empty DOM element", () => {
        const { container } = render(<Spinner loading={true}></Spinner>);
        expect(container).not.toBeNull();
    });

    it("should contain a img element", () => {
        const { debug } = render(<Spinner loading={false}></Spinner>);
        debug();
        expect(screen.queryByRole("img")).toBeNull();
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
    });

    it("should render double type spinner ", () => {
        const type = "/assets/img/spinner-double.svg";
        render(<Spinner loading={true} type="double"></Spinner>);
        expect(screen.getByRole("img")).toHaveAttribute("src", type);
    });
    it("should render rolling spinner", () => {
        const type = "/assets/img/spinner-rolling.svg";
        render(<Spinner loading={true} type="rolling"></Spinner>);
        expect(screen.getByRole("img")).toHaveAttribute("src", type);
    });

    it("should render img of given size", () => {
        const size = "75";
        render(<Spinner loading={true} size={75}></Spinner>);
        expect(screen.getByRole("img")).toHaveAttribute("height", `${size}px`);
        expect(screen.getByRole("img")).toHaveAttribute("width", `${size}px`);
    });
    // we can write more for size
});
