import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "components/Card";

describe("test cases on Card", () => {
    test("Not to be Null", () => {
        const { debug } = render(<Card />);
        console.log(debug());
        // expect(debug).toMatchSnapshot();
    });
});
