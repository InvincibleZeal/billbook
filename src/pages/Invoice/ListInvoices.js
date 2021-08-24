import React, { Fragment, useEffect, useState, useCallback } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "styles/add-customer.css";
import { useNotification } from "notification";
import Button from "components/Button";

const ListInvoices = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const { triggerNotification } = useNotification();
    // Function to fetch data from local storage
    const fetchData = useCallback(() => {
        if (localStorage.getItem("invoice_data")) {
            try {
                const invoiceData = JSON.parse(
                    localStorage.getItem("invoice_data")
                );
                setTableData(invoiceData);
            } catch (e) {
                triggerNotification("Failed parsing inventory data", {
                    type: "error",
                });
                localStorage.removeItem("invoice_data");
            }
        }
    }, [tableData]);

    // Function to calc total
    const calcAmount = (array) => {
        if (array) {
            return array.reduce((accumulator, currValue) => {
                return accumulator + currValue.quantity * currValue.price;
            }, 0);
        }
        return 0;
    };

    return (
        <Fragment>
            <Navbar opened="invoice" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.invoice" />
                    </span>
                    <Link to="/invoice/add">
                        <Button className="btn" icon="plus">
                            <FormattedMessage id="invoice.newButton" />
                        </Button>
                    </Link>
                </div>
                {tableData.length > 0 ? (
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
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.issueDate || "NA"}</td>
                                        <td>
                                            {data.customers[0].name || "NA"}
                                        </td>
                                        <td>{data.invoiceNumber || "NA"}</td>
                                        <td>
                                            <span className="bg-info info px-3 py-1 rounded">
                                                PAID
                                            </span>
                                        </td>
                                        <td>₹{calcAmount(data.items)}</td>
                                        <td>₹{calcAmount(data.items)}</td>
                                    </tr>
                                ))}
                            </tbody>
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

export default withWrapper(ListInvoices);
