import React, { Fragment, useEffect, useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { useNotification } from "notification";
import { razorpay } from "api";
import Spinner from "components/Spinner";

const ListItems = () => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
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
                type: "danger",
            });
        } else {
            setTableData(response.items);
        }
        setLoading(false);
    }, []);

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper p-5 mb-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items" />
                    </span>
                    <Link to="/inventory/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;{" "}
                            <FormattedMessage id="item.addButton" />
                        </button>
                    </Link>
                </div>
                {loading ? (
                    <Spinner loading={loading}></Spinner>
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
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>₹{data.amount}</td>
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

export default ListItems;
