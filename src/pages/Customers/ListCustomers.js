import React, { Fragment, useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useNotification } from "notification";
import Button from "components/Button";
import Table from "components/Table";
import { razorpay } from "api";
import Spinner from "components/Spinner";
import { formatDate } from "utils/helper";
import { useDispatch } from "react-redux";

const ListCustomers = () => {
    const dispatch = useDispatch();
    // State Variables
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    // Fetching the Initial Data once the page loads
    useEffect(() => {
        fetchData();
    }, []);

    // Imports for notification
    const { triggerNotification } = useNotification();

    // API called here to fetch the customers details from db
    const fetchData = useCallback(async () => {
        const { error, response } = await razorpay.fetchCustomers();
        if (error) {
            triggerNotification(error.message || "Something went wrong", {
                type: "error",
            });
        } else {
            setTableData(response.items);
            dispatch({ type: "add_customers", payload: response.items });
        }
        setLoading(false);
    }, []);

    const formatter = [
        { label: "Name", id: "name" },
        { label: "Phone", id: "contact" },
        { label: "Email", id: "email" },
        { label: "Date", id: "created_at", formatter: formatDate },
    ];
    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        <FormattedMessage id="title.customer" />
                    </span>
                    <Link to="/customers/add">
                        <Button icon="plus">
                            <FormattedMessage id="customer.newButton" />
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

export default ListCustomers;
