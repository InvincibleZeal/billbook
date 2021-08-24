import React, { Fragment, useEffect, useState, useCallback } from "react";
import Navbar from "common/Navbar";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import withWrapper from "common/withWrapper";
const ListCustomers = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    // Function to fetch data from local storage
    const fetchData = useCallback(() => {
        if (localStorage.getItem("customer_data"))
            setTableData(JSON.parse(localStorage.getItem("customer_data")));
        return tableData;
    }, [tableData]);
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
                {tableData.length > 0 ? (
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
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.name}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.email}</td>
                                        <td>{data.date.slice(0, 10)}</td>
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

export default withWrapper(ListCustomers);
