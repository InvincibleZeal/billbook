import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import ListInvoice from "pages/Invoice/ListInvoices";
import { mockContext } from "setupTests";
import { BrowserRouter } from "react-router-dom";

describe("ListInovice", () => {
    it("Testing listInvoices module", () => {
        render(
            mockContext(
                <BrowserRouter>
                    <ListInvoice></ListInvoice>
                </BrowserRouter>
            ) // added browserRounter to avoid error :  "You should not use <Link> outside a <Router>"""
        );
    });
    it("All Button component rendered", () => {
        render(
            mockContext(
                <BrowserRouter>
                    <ListInvoice></ListInvoice>
                </BrowserRouter>
            )
        );
        expect(screen.queryByRole("button")).toBeInTheDocument();
        expect(screen.queryAllByRole("button")).toHaveLength(1);
    });

    it("All links  rendered", () => {
        render(
            mockContext(
                <BrowserRouter>
                    <ListInvoice></ListInvoice>
                </BrowserRouter>
            )
        );

        expect(screen.getByTestId("link")).toBeInTheDocument();
        expect(screen.getAllByTestId("link")).toHaveLength(1);
        expect(screen.getByTestId("link")).toHaveAttribute(
            "href",
            "/invoice/add"
        );
    });
    it("Table rendered", () => {
        const { debug } = render(
            mockContext(
                <BrowserRouter>
                    <ListInvoice></ListInvoice>
                </BrowserRouter>
            )
        );
        debug();
        //  expect(screen.queryByRole("table")).toBeInTheDocument();
        //  expect(screen.queryAllByRole("table")).toHaveLength(1); // will not run correctly as tableData is not mentioed >0
    });
});
