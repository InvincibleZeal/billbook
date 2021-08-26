import React, { Fragment, useEffect, useState, useCallback } from "react";
import Navbar from "common/Navbar";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import withWrapper from "common/withWrapper";
import { useNotification } from "notification";
import Button from "components/Button";
import Table from "components/Table";

const ListCustomers = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const { triggerNotification } = useNotification();

    // Function to fetch data from local storage
    const fetchData = useCallback(() => {
        let customerData = [];
        if (localStorage.getItem("customer_data")) {
            try {
                customerData = JSON.parse(
                    localStorage.getItem("customer_data")
                );
            } catch (e) {
                triggerNotification("Failed parsing customer data", {
                    type: "error",
                });
                localStorage.removeItem("customer_data");
            }
        }
        setTableData(customerData);
    }, [tableData]);

    const formatter = [
        { label: "Name", id: "name" },
        { label: "Phone", id: "phone" },
        { label: "Email", id: "email" },
        { label: "Date", id: "date" },
    ];
    return (
        <Fragment>
            <Navbar opened="customers" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.customer" />
                    </span>
                    <Link to="/customers/add">
                        <Button icon="plus">
                            <FormattedMessage id="customer.newButton" />
                        </Button>
                    </Link>
                </div>
                {tableData.length > 0 ? (
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
                                TableData={tableData}
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

export default withWrapper(ListCustomers);
