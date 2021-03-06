import React, { Fragment, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import "styles/add-customer.css";
import Button from "components/Button";
import Table from "components/Table";
import Spinner from "components/Spinner";
import { formatDate } from "utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoiceList } from "redux/actions/index";

const ListInvoices = () => {
    // Redux Variables
    const data = useSelector((state) => state.allInvoices);
    const dispatch = useDispatch();

    // useEffect Hook
    useEffect(() => {
        fetchData();
    }, []);

    // Function to Fetch Data
    const fetchData = useCallback(() => {
        dispatch(fetchInvoiceList());
    });
    // useIntl format message

    const intl = useIntl();
    // Table Fields
    const formatter = [
        {
            label: intl.formatMessage({ id: "invoice.issuedAt" }),
            id: "created_at",
            formatter: formatDate,
        },
        {
            label: intl.formatMessage({ id: "title.customer" }),
            id: "customer_details",
            formatter: (customerDetails) => customerDetails.name,
        },

        {
            label: intl.formatMessage({ id: "invoice.number" }),
            id: "invoice_number",
        },
        {
            label: intl.formatMessage({ id: "invoice.paidStatus" }),
            formatter: (
                <span className="bg-info info px-3 py-1 rounded">PAID</span>
            ),
        },
        {
            label: intl.formatMessage({ id: "invoice.amount" }),
            id: "amount",
        },
        {
            label: intl.formatMessage({ id: "invoice.amountDue" }),
            id: "amount_due",
        },
    ];

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.invoice" />
                    </span>
                    <Link to="/invoice/add">
                        <Button icon="plus">
                            <FormattedMessage id="invoice.newButton" />
                        </Button>
                    </Link>
                </div>
                {data === null ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={true} type="double"></Spinner>
                    </div>
                ) : data.length > 0 ? (
                    <div className="scrollable">
                        <Table
                            formatter={formatter}
                            tableData={data}
                            className="table px-5"
                        />
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
