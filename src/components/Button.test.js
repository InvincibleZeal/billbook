import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Button from "./Button.js";

describe("<button/> testing", () => {
    // it("renders properly", () => {
    //     render(<Button />);
    // });

    it("className testing 1", () => {
        const a = jest.fn();
        render(<Button onClick={a}></Button>);
        const mybtn = getByTestID("button");
        fireEvent.click(mybtn);
        expect(a).toBeCalled();
    });
    // it("className testing 2", () => {
    //     const a = jest.fn();
    //     const btn = render(<Button type="button" onClick={a} />);
    // });
});
