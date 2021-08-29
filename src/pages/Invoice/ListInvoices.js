import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "styles/add-customer.css";
import { useNotification } from "notification";
import Button from "components/Button";
import Table from "components/Table";
import { razorpay } from "api";
import Spinner from "components/Spinner";
import { formatDate } from "utils/helper";
import { useDispatch } from "react-redux";

const ListInvoices = () => {
    const dispatch = useDispatch();

    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const { triggerNotification } = useNotification();
    // Function to fetch data from local storage
    const fetchData = useCallback(async () => {
        const { error, response } = await razorpay.fetchInvoices();

        if (error) {
            triggerNotification(error.message || "Something went wrong", {
                type: "error",
            });
        } else {
            setTableData(response.items);
        }
        setLoading(false);
        dispatch({ type: "add_items", payload: response.items });
    }, [tableData]);
    const formatter = [
        { label: "CreatedAt", id: "created_at", formatter: formatDate },
        {
            label: "Customers",
            id: "customer_details",
            formatter: (customerDetails) => customerDetails.name,
        }, // this is not showing yet

        { label: "InvoiceNumber", id: "invoice_number" },
        {
            label: "PaidStatus",
            formatter: (
                <span className="bg-info info px-3 py-1 rounded">PAID</span>
            ),
        },
        {
            label: "Amount",
            id: "amount",
        },
        {
            label: "AmountDue",
            id: "amount_due",
        },
    ];
    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.invoice" />
                    </span>
                    <Link to="/invoice/add">
                        <Button icon="plus">
                            <FormattedMessage id="invoice.newButton" />
                        </Button>
                    </Link>
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={loading} type="double"></Spinner>
                    </div>
                ) : tableData.length > 0 ? (
                    <div className="scrollable">
                        <table className="table px-5">
                            <thead>
                                <tr>
                                    <th>
                                        <FormattedMessage id="invoice.date" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="title.customer" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.number" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.paidStatus" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.amount" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.amountDue" />
                                    </th>
                                </tr>
                            </thead>
                            <Table
                                formatter={formatter}
                                tableData={tableData}
                            />
                        </table>
                    </div>
                ) : (
                    <p className="my-3 mx-5">
                        {" "}
                        <FormattedMessage id="no.records" />
                    </p>
                )}
            </div>
        </Fragment>
    );
};

export default ListInvoices;
