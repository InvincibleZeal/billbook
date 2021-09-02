import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Table from "components/Table";

describe("Table", () => {
    it("should not be an empty DOM element", () => {
        const { container } = render(<Table></Table>);
        expect(container).not.toBeNull();
        expect(screen.queryByTestId("table")).toBeInTheDocument();
    });

    it("should contain tbody", () => {
        render(<Table></Table>);
        expect(screen.queryByTestId("table-tbody")).toBeInTheDocument();
    });

    it("should have correct custom class", () => {
        const className = "anything";
        render(<Table className={className}></Table>);
        expect(screen.getByTestId("table")).toHaveClass(className);
    });

    it("should have correct custom attribute", () => {
        const some = "value";
        render(<Table some={some}></Table>);
        expect(screen.getByTestId("table")).toHaveAttribute("some", some);
    });

    it("should have correct number of rows", () => {
        const data = [
            { id: "1", name: "John", emp_id: "exp2010" },
            { id: "2", name: "Evans", emp_id: "exp2012" },
            { id: "3", name: "Tim", emp_id: "exp2014" },
        ];
        const formatter = [{ id: "id" }, { id: "name" }, { id: "emp_id" }];
        render(<Table tableData={data} formatter={formatter}></Table>);
        expect(screen.getAllByTestId("table-row").length).toEqual(data.length);
    });

    it("should have correct number of columns", () => {
        const data = [
            { id: "1", name: "John", emp_id: "exp2012" },
            { id: "2", name: "Evans", emp_id: "exp2010" },
            { id: "3", name: "Tim", emp_id: "exp2014" },
        ];
        const formatter = [{ id: "id" }, { id: "name" }, { id: "emp_id" }];
        render(<Table tableData={data} formatter={formatter}></Table>);
        for (const [index, row] of data.entries()) {
            expect(
                screen
                    .queryAllByTestId("table-row")
                    [index].querySelectorAll("td").length
            ).toEqual(Object.keys(row).length);
        }
    });
});
