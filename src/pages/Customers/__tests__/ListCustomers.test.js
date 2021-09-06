import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ListCustomers from "pages/Customers/ListCustomers";
import { mockContext } from "setupTests";

const fetchCustomersResponse = {
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
        "https://rzpproxy.herokuapp.com/razorpay/customers",
        (req, res, ctx) => {
            return res(ctx.json(fetchCustomersResponse));
        }
    )
);

describe("ListCustomers", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should have no data initially", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));

        render(mockContext(<ListCustomers></ListCustomers>));

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("should render a table after api call", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListCustomers></ListCustomers>));

        await waitFor(() => screen.getByRole("table"));
        expect(screen.queryByRole("table")).toBeInTheDocument();
    });

    it("should contain correct number of customers", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListCustomers></ListCustomers>));

        await waitFor(() => screen.getByRole("table"));
        expect(
            screen.getByRole("table").querySelectorAll("tbody tr").length
        ).toEqual(fetchCustomersResponse.count);
    });

    it("should render correct data", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListCustomers></ListCustomers>));

        await waitFor(() => screen.getByRole("table"));
        const rows = screen.getByRole("table").querySelectorAll("tbody tr");
        for (const [index, row] of rows.entries()) {
            const values = Object.values(fetchCustomersResponse.items[index]);
            const cells = Array.prototype.slice
                .call(row.querySelectorAll("td"))
                .filter((cell) => cell && cell.length);

            for (const cell of cells) {
                expect(values.includes(cell.innerHTML)).toBeTruthy();
            }
        }
    });
});
