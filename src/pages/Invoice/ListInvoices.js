import React, { Fragment, useEffect, useState } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "styles/add-customer.css";

const ListInvoices = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    // Function to fetch data from local storage
    const fetchData = () => {
        if (localStorage.getItem("invoice_data"))
            setTableData(JSON.parse(localStorage.getItem("invoice_data")));
    };
    return (
        <Fragment>
            <Navbar opened="invoice" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.invoice"></FormattedMessage>{" "}
                    </span>
                    <Link to="/invoice/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;{" "}
                            <FormattedMessage id="invoice.new.button"></FormattedMessage>
                        </button>
                    </Link>
                </div>
                {tableData.length > 0 ? (
                    <div className="scrollable">
                        <table className="table px-5">
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.date"></FormattedMessage>
                                    </th>
                                    <th>
                                        <FormattedMessage id="title.customer"></FormattedMessage>
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.number"></FormattedMessage>
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.paid.status"></FormattedMessage>
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.amount"></FormattedMessage>
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="amount.due"></FormattedMessage>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.issueDate}</td>
                                        <td>{data.name}</td>
                                        <td>{data.invoiceNumber}</td>
                                        <td>
                                            <span className="bg-info info px-3 py-1 rounded">
                                                PAID
                                            </span>
                                        </td>
                                        <td>
                                            ₹
                                            {data.items.reduce(
                                                (accumulator, currValue) => {
                                                    return (
                                                        accumulator +
                                                        currValue.amount *
                                                            currValue.price
                                                    );
                                                },
                                                0
                                            )}
                                        </td>
                                        <td>
                                            ₹
                                            {data.items.reduce(
                                                (accumulator, currValue) => {
                                                    return (
                                                        accumulator +
                                                        currValue.amount *
                                                            currValue.price
                                                    );
                                                },
                                                0
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="my-3 mx-5">
                        {" "}
                        <FormattedMessage id="no.records"></FormattedMessage>
                    </p>
                )}
            </div>
        </Fragment>
    );
};

export default withWrapper(ListInvoices);
