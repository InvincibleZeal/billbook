/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import Button from "components/Button";
import Table from "components/Table";
import Spinner from "components/Spinner";
import { formatDate } from "utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { fetchItemsList } from "redux/actions/index";

const ListItems = () => {
    // Redux Variables
    const data = useSelector((state) => state.allItems);
    const dispatch = useDispatch();

    // Fetching the Initial Data once the page loads
    useEffect(() => {
        fetchData();
    }, []);

    // API called here to fetch the items details from db
    const fetchData = useCallback(() => {
        dispatch(fetchItemsList());
    }, []);

    // Table Fields
    const intl = useIntl();
    const formatter = [
        { label: intl.formatMessage({ id: "customer.name" }), id: "name" },
        {
            label: intl.formatMessage({ id: "item.description" }),
            id: "description",
        },
        { label: intl.formatMessage({ id: "item.price" }), id: "amount" },
        {
            label: intl.formatMessage({ id: "invoice.date" }),
            id: "created_at",
            formatter: formatDate,
        },
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
                {data === null ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={true} type="double"></Spinner>
                    </div>
                ) : data.length > 0 ? (
                    <div className="scrollable">
                        <Table formatter={formatter} tableData={data}>
                            <colgroup>
                                <col span="1" style={{ width: "20%" }} />
                                <col span="1" style={{ width: "50%" }} />
                                <col span="1" style={{ width: "15%" }} />
                                <col span="1" style={{ width: "15%" }} />
                            </colgroup>
                        </Table>
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
