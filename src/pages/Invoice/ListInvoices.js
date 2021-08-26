import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "styles/add-customer.css";
import { useNotification } from "notification";
import { razorpay } from "api";
import Spinner from "components/Spinner";

const ListInvoices = () => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchData();
    }, []);

    const { triggerNotification } = useNotification();
    // Function to fetch data from local storage
    const fetchData = useCallback(async () => {
        const { error, response } = await razorpay.fetchInvoices();

        if (error) {
            triggerNotification("Internal Server Error", {
                type: "danger",
            });
        } else {
            setTableData(response.items);
            console.log(response);
        }
        setLoading(false);
    }, [tableData]);

    // Function to calc total
    const calcAmount = (array) => {
        if (array) {
            return array.reduce((accumulator, currValue) => {
                return accumulator + currValue.net_amount;
            }, 0);
        }
        return 0;
    };

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.invoice" />
                    </span>
                    <Link to="/invoice/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;{" "}
                            <FormattedMessage id="invoice.newButton" />
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
                                        <FormattedMessage id="invoice.date" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="title.customer" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.number" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.paidStatus" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.amount" />
                                    </th>
                                    <th>
                                        <FormattedMessage id="invoice.amountDue" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            {data.created_at
                                                ? new Date(
                                                      data.created_at * 1000
                                                  ).toLocaleString(
                                                      "en",
                                                      dateOptions
                                                  )
                                                : "NA"}
                                        </td>
                                        <td>
                                            {data.customer_details &&
                                            data.customer_details.customer_name
                                                ? data.customer_details
                                                      .customer_name
                                                : "NA"}
                                        </td>
                                        <td>{data.invoice_number || "NA"}</td>
                                        <td>
                                            <span className="bg-info info px-3 py-1 rounded">
                                                PAID
                                            </span>
                                        </td>
                                        <td>₹{calcAmount(data.line_items)}</td>
                                        <td>₹{calcAmount(data.line_items)}</td>
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

export default ListInvoices;
