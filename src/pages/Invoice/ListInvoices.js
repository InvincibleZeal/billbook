import React, { Fragment } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";
import "styles/add-customer.css";

const ListInvoices = () => {
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
                            <tr>
                                <td>17 Dec 2019</td>
                                <td>Anissa Beier</td>
                                <td>INV-0019120841156265</td>
                                <td>
                                    <span className="bg-warning warning px-3 py-1 rounded">
                                        ISSUED
                                    </span>
                                </td>
                                <td>₹3300</td>
                                <td>₹3300</td>
                            </tr>
                            <tr>
                                <td>17 Dec 2019</td>
                                <td>Mellie Buckride</td>
                                <td>INV-002</td>
                                <td>
                                    <span className="bg-info info px-3 py-1 rounded">
                                        PAID
                                    </span>
                                </td>
                                <td>₹3300</td>
                                <td>₹3300</td>
                            </tr>
                            <tr>
                                <td>17 Dec 2019</td>
                                <td>Ashlee Glover</td>
                                <td>INV-003</td>
                                <td>
                                    <span className="bg-warning warning px-3 py-1 rounded">
                                        ISSUED
                                    </span>
                                </td>
                                <td>₹3300</td>
                                <td>₹3300</td>
                            </tr>
                            <tr>
                                <td>17 Dec 2019</td>
                                <td>John Doe</td>
                                <td>INV-004</td>
                                <td>
                                    <span className="bg-danger danger px-3 py-1 rounded">
                                        FAILED
                                    </span>
                                </td>
                                <td>₹3300</td>
                                <td>₹3300</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(ListInvoices);
