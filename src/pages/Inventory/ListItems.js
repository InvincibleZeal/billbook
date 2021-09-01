/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useCallback } from "react";
import { FormattedMessage } from "react-intl";
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
                {data === null ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={true} type="double"></Spinner>
                    </div>
                ) : data.length > 0 ? (
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
                            <Table formatter={formatter} tableData={data} />
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
