import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import ListInvoices from "pages/Invoice/ListInvoices";
import { mockContext } from "setupTests";

const fetchInvoicesResponse = {
    entity: "collection",
    count: 3,
    items: [
        {
            id: "inv_HstKzVch9tRmmo",
            entity: "invoice",
            receipt: "3efdf",
            invoice_number: "3efdf",
            customer_id: "cust_HsY1HsmEq0iwTE",
            customer_details: {
                id: "cust_HsY1HsmEq0iwTE",
                name: "Tim Zeng",
                email: "ritesh.ganjewala@example.com",
                contact: "338383838383",
                gstin: null,
                billing_address: null,
                shipping_address: null,
                customer_name: "Tim Zeng",
                customer_email: "ritesh.ganjewala@example.com",
                customer_contact: "338383838383",
            },
            order_id: "order_HstKzX0IL7yOpA",
            line_items: [
                {
                    id: "li_HstKzWB9nHoraB",
                    item_id: "item_HrmbtLK4BJf2UI",
                    ref_id: null,
                    ref_type: null,
                    name: "Earphones",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    amount: 1000,
                    unit_amount: 1000,
                    gross_amount: 1000,
                    tax_amount: 0,
                    taxable_amount: 1000,
                    net_amount: 1000,
                    currency: "INR",
                    type: "invoice",
                    tax_inclusive: false,
                    hsn_code: null,
                    sac_code: null,
                    tax_rate: null,
                    unit: null,
                    quantity: 1,
                    taxes: [],
                },
            ],
            payment_id: null,
            status: "issued",
            expire_by: null,
            issued_at: 1630650118,
            paid_at: null,
            cancelled_at: null,
            expired_at: null,
            sms_status: "pending",
            email_status: "sent",
            date: 1630650118,
            terms: null,
            partial_payment: false,
            gross_amount: 1000,
            tax_amount: 0,
            taxable_amount: 1000,
            amount: 1000,
            amount_paid: 0,
            amount_due: 1000,
            currency: "INR",
            currency_symbol: "₹",
            description: null,
            notes: {
                remarks: "something",
            },
            comment: null,
            short_url: "https://rzp.io/i/Dt1gQ6rO",
            view_less: true,
            billing_start: null,
            billing_end: null,
            type: "invoice",
            group_taxes_discounts: false,
            created_at: 1630650118,
            idempotency_key: null,
        },
        {
            id: "inv_HstK73iTPGQnPM",
            entity: "invoice",
            receipt: "33",
            invoice_number: "33",
            customer_id: "cust_Hssv8OCeinT31s",
            customer_details: {
                id: "cust_Hssv8OCeinT31s",
                name: "Samanth D",
                email: "dasarisamanth@gmail.com",
                contact: "9513489402",
                gstin: null,
                billing_address: null,
                shipping_address: null,
                customer_name: "Samanth D",
                customer_email: "dasarisamanth@gmail.com",
                customer_contact: "9513489402",
            },
            order_id: "order_HstK754MAjV1wZ",
            line_items: [
                {
                    id: "li_HstK74EUwVAtUG",
                    item_id: "item_HsY28RjdMThK2Y",
                    ref_id: null,
                    ref_type: null,
                    name: "Phone Cover",
                    description: "Printed",
                    amount: 500,
                    unit_amount: 500,
                    gross_amount: 1000,
                    tax_amount: 0,
                    taxable_amount: 1000,
                    net_amount: 1000,
                    currency: "INR",
                    type: "invoice",
                    tax_inclusive: false,
                    hsn_code: null,
                    sac_code: null,
                    tax_rate: null,
                    unit: null,
                    quantity: 2,
                    taxes: [],
                },
            ],
            payment_id: null,
            status: "issued",
            expire_by: null,
            issued_at: 1630650068,
            paid_at: null,
            cancelled_at: null,
            expired_at: null,
            sms_status: "sent",
            email_status: "sent",
            date: 1630650068,
            terms: null,
            partial_payment: false,
            gross_amount: 1000,
            tax_amount: 0,
            taxable_amount: 1000,
            amount: 1000,
            amount_paid: 0,
            amount_due: 1000,
            currency: "INR",
            currency_symbol: "₹",
            description: null,
            notes: {
                remarks: "something",
            },
            comment: null,
            short_url: "https://rzp.io/i/MrgtSRX5Um",
            view_less: true,
            billing_start: null,
            billing_end: null,
            type: "invoice",
            group_taxes_discounts: false,
            created_at: 1630650068,
            idempotency_key: null,
        },
        {
            id: "inv_HssKC50k25YXK7",
            entity: "invoice",
            receipt: null,
            invoice_number: null,
            customer_id: null,
            customer_details: {
                id: null,
                name: null,
                email: null,
                contact: null,
                gstin: null,
                billing_address: null,
                shipping_address: null,
                customer_name: null,
                customer_email: null,
                customer_contact: null,
            },
            order_id: "order_HssKC6PfWz9MCe",
            subscription_id: "sub_HssKBRRanGgpKn",
            line_items: [
                {
                    id: "li_HssKC5kNpD6AJB",
                    item_id: null,
                    ref_id: null,
                    ref_type: null,
                    name: "Test plan - Weekly",
                    description: "Description for the test plan",
                    amount: 69900,
                    unit_amount: 69900,
                    gross_amount: 69900,
                    tax_amount: 0,
                    taxable_amount: 69900,
                    net_amount: 69900,
                    currency: "INR",
                    type: "plan",
                    tax_inclusive: false,
                    hsn_code: null,
                    sac_code: null,
                    tax_rate: null,
                    unit: null,
                    quantity: 1,
                    taxes: [],
                },
            ],
            payment_id: null,
            status: "issued",
            expire_by: null,
            issued_at: 1630646551,
            paid_at: null,
            cancelled_at: null,
            expired_at: null,
            sms_status: null,
            email_status: null,
            date: 1630646551,
            terms: null,
            partial_payment: false,
            gross_amount: 69900,
            tax_amount: 0,
            taxable_amount: 69900,
            amount: 69900,
            amount_paid: 0,
            amount_due: 69900,
            currency: "INR",
            currency_symbol: "₹",
            description: null,
            notes: [],
            comment: null,
            short_url: "https://rzp.io/i/CDbHPv02",
            view_less: true,
            billing_start: null,
            billing_end: null,
            type: "invoice",
            group_taxes_discounts: false,
            created_at: 1630646551,
            idempotency_key: null,
        },
    ],
};

const server = setupServer(
    rest.get(
        "https://rzpproxy.herokuapp.com/razorpay/invoices",
        (req, res, ctx) => {
            return res(ctx.json(fetchInvoicesResponse));
        }
    )
);

describe("ListInvoices", () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it("should have no data initially", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));

        render(mockContext(<ListInvoices></ListInvoices>));

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
    });

    it("should render a table after api call", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListInvoices></ListInvoices>));

        await waitFor(() => screen.getByRole("table"));
        expect(screen.queryByRole("table")).toBeInTheDocument();
    });

    it("should contain correct number of invoices", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListInvoices></ListInvoices>));

        await waitFor(() => screen.getByRole("table"));
        expect(
            screen.getByRole("table").querySelectorAll("tbody tr").length
        ).toEqual(fetchInvoicesResponse.count);
    });

    it("should render correct data", async () => {
        const realUseState = React.useState;
        jest.spyOn(React, "useState")
            .mockImplementationOnce(() => realUseState([]))
            .mockImplementationOnce(() => realUseState(true));
        render(mockContext(<ListInvoices></ListInvoices>));

        await waitFor(() => screen.getByRole("table"));
        const rows = screen.getByRole("table").querySelectorAll("tbody tr");
        for (const [index, row] of rows.entries()) {
            const values = Object.values(fetchInvoicesResponse.items[index]);
            const cells = Array.prototype.slice
                .call(row.querySelectorAll("td"))
                .filter((cell) => cell && cell.length);

            for (const cell of cells) {
                expect(values.includes(cell.innerHTML)).toBeTruthy();
            }
        }
    });
});
