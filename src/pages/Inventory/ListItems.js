import React, { Fragment, useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useNotification } from "notification";
import Button from "components/Button";
import Table from "components/Table";
import { razorpay } from "api";
import Spinner from "components/Spinner";
import { formatDate } from "utils/helper";

const ListItems = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);
    const { triggerNotification } = useNotification();

    // Function to fetch data from local storage
    const fetchData = useCallback(async () => {
        const { error, response } = await razorpay.fetchItems();

        if (error) {
            triggerNotification(error.message || "Something went wrong", {
                type: "error",
            });
        } else {
            setTableData(response.items);
        }
        setLoading(false);
    }, []);

    const formatter = [
        { label: "Name", id: "name" },
        { label: "Description", id: "description" },
        { label: "Price", id: "amount" },
        { label: "Date", id: "created_at", formatter: formatDate },
    ];
    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper p-5 mb-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items" />
                    </span>
                    <Link to="/inventory/add">
                        <Button icon="plus">
                            <FormattedMessage id="item.addButton" />
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
                            <colgroup>
                                <col span="1" style={{ width: "20%" }} />
                                <col span="1" style={{ width: "50%" }} />
                                <col span="1" style={{ width: "15%" }} />
                                <col span="1" style={{ width: "15%" }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="customer.name" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="item.description" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="item.price" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="added.on" />
                                    </th>
                                </tr>
                            </thead>
                            <Table
                                formatter={formatter}
                                tableData={tableData}
                            />
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

export default ListItems;
