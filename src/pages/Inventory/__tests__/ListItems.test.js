import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ListItems from "pages/Inventory/ListItems";
import { mockContext } from "setupTests";

const fetchItemsResponse = {
    entity: "collection",
    count: 3,
    items: [
        {
            id: "cust_Hssv8OCeinT31s",
            entity: "customer",
            name: "Samanth D",
            email: "dasarisamanth@gmail.com",
            contact: "9513489402",
            gstin: null,
            notes: [],
            created_at: 1630648649,
        },
        {
            id: "cust_HsfRKvPz2Meqgt",
            entity: "customer",
            name: "Test User",
            email: "test@test.com",
            contact: "1234567890",
            gstin: null,
            notes: [],
            created_at: 1630601175,
        },
        {
            id: "cust_HsY1HsmEq0iwTE",
            entity: "customer",
            name: "Tim Zeng",
            email: "ritesh.ganjewala@example.com",
            contact: "338383838383",
            gstin: null,
            notes: [],
            created_at: 1630575045,
        },
    ],
};

const server = setupServer(
    rest.get(
        "https://rzpproxy.herokuapp.com/razorpay/items",
        (req, res, ctx) => {
            return res(ctx.json(fetchItemsResponse));
        }
    )
);

describe("ListItems", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should have no data initially", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));

        render(mockContext(<ListItems></ListItems>));

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("should render a table after api call", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListItems></ListItems>));

        await waitFor(() => screen.getByRole("table"));
        expect(screen.queryByRole("table")).toBeInTheDocument();
    });

    it("should contain correct number of items", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListItems></ListItems>));

        await waitFor(() => screen.getByRole("table"));
        expect(
            screen.getByRole("table").querySelectorAll("tbody tr").length
        ).toEqual(fetchItemsResponse.count);
    });

    it("should render correct data", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListItems></ListItems>));

        await waitFor(() => screen.getByRole("table"));
        const rows = screen.getByRole("table").querySelectorAll("tbody tr");
        for (const [index, row] of rows.entries()) {
            const values = Object.values(fetchItemsResponse.items[index]);
            const cells = Array.prototype.slice
                .call(row.querySelectorAll("td"))
                .filter((cell) => cell && cell.length);

            for (const cell of cells) {
                expect(values.includes(cell.innerHTML)).toBeTruthy();
            }
        }
    });
});
