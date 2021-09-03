import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ListItems from "pages/Inventory/ListItems";
import { mockContext } from "setupTests";

const server = setupServer(
    rest.get(
        "https://rzpproxy.herokuapp.com/razorpay/items",
        (req, res, ctx) => {
            return res(
                ctx.json({
                    entity: "collection",
                    count: 10,
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
                })
            );
        }
    )
);

describe("ListItems", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());
    it("should have empty list on load", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));

        render(mockContext(<ListItems></ListItems>));
        await waitFor(() => screen.getByRole("table"));
        expect(screen.getByRole("table")).toBeInTheDocument();
    });
});
