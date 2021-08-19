import React, { Fragment } from "react";
import Navbar from "../../common/Navbar";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import withWrapper from "../../common/withWrapper";
const ListCustomers = () => {
    return (
        <Fragment>
            <Navbar opened="customers" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.customer"></FormattedMessage>
                    </span>
                    <Link to="/customers/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;
                            <FormattedMessage id="customer.new.button"></FormattedMessage>
                        </button>
                    </Link>
                </div>
                <div className="scrollable">
                    <table className="table px-5">
                        <thead>
                            <tr>
                                <th>
                                    {" "}
                                    <FormattedMessage id="customer.new.button"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="customer.phone"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="customer.email"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="customer.created.on"></FormattedMessage>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Anissa Beier</td>
                                <td>+9120841156265</td>
                                <td>void@razorpay.com</td>
                                <td>06 Aug 2020</td>
                            </tr>
                            <tr>
                                <td>Mellie Buckride</td>
                                <td>8889922222</td>
                                <td>hello@razorpay.com</td>
                                <td>06 Aug 2020</td>
                            </tr>
                            <tr>
                                <td>Ashlee Glover</td>
                                <td>9898761525</td>
                                <td>contact@razorpay.com</td>
                                <td>06 Aug 2020</td>
                            </tr>
                            <tr>
                                <td>John Doe</td>
                                <td>4819699668</td>
                                <td>support@razorpay.com</td>
                                <td>06 Aug 2020</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(ListCustomers);
