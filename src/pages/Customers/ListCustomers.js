import React, { Fragment, useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useNotification } from "notification";
import { razorpay } from "api";
import Spinner from "components/Spinner";

const ListCustomers = () => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    const { triggerNotification } = useNotification();

    // Function to fetch data from local storage
    const fetchData = useCallback(async () => {
        const { error, response } = await razorpay.fetchCustomers();
        if (error) {
            triggerNotification(error.message || "Something went wrong", {
                type: "danger",
            });
        } else {
            setTableData(response.items);
        }
        setLoading(false);
    }, [tableData]);

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.customer" />
                    </span>
                    <Link to="/customers/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;
                            <FormattedMessage id="customer.newButton" />
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <Spinner loading={loading}></Spinner>
                ) : tableData.length > 0 ? (
                    <div className="scrollable">
                        <table className="table px-5">
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="customer.newButton" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="customer.phone" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="customer.email" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="customer.createdOn" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.name}</td>
                                        <td>{data.contact}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            {new Date(
                                                data.created_at * 1000
                                            ).toLocaleString("en", dateOptions)}
                                        </td>
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

export default ListCustomers;
