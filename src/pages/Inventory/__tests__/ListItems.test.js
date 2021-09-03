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
            id: "item_HsY28RjdMThK2Y",
            active: true,
            name: "Phone Cover",
            description: "Printed",
            amount: 500,
            unit_amount: 500,
            currency: "INR",
            type: "invoice",
            unit: null,
            tax_inclusive: false,
            hsn_code: null,
            sac_code: null,
            tax_rate: null,
            tax_id: null,
            tax_group_id: null,
            created_at: 1630575093,
        },
        {
            id: "item_HrmbtLK4BJf2UI",
            active: true,
            name: "Earphones",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            amount: 1000,
            unit_amount: 1000,
            currency: "INR",
            type: "invoice",
            unit: null,
            tax_inclusive: false,
            hsn_code: null,
            sac_code: null,
            tax_rate: null,
            tax_id: null,
            tax_group_id: null,
            created_at: 1630408086,
        },
        {
            id: "item_HrmbIkGTmYu4et",
            active: true,
            name: "Bed Table",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            amount: 1000,
            unit_amount: 1000,
            currency: "INR",
            type: "invoice",
            unit: null,
            tax_inclusive: false,
            hsn_code: null,
            sac_code: null,
            tax_rate: null,
            tax_id: null,
            tax_group_id: null,
            created_at: 1630408053,
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
