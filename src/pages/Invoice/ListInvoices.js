import React, { Fragment, useEffect, useState } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";
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
                    <span className="title"> Invoices </span>
                    <Link to="/invoice/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp; New Invoice
                        </button>
                    </Link>
                </div>
                {tableData.length > 0 ? (
                    <div className="scrollable">
                        <table className="table px-5">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Number</th>
                                    <th>Paid Status</th>
                                    <th>Amount</th>
                                    <th>Amount Due</th>
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
                    <p className="my-3 mx-5"> There are no records available</p>
                )}
            </div>
        </Fragment>
    );
};

export default withWrapper(ListInvoices);
