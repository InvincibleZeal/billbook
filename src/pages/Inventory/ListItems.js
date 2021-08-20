import React, { Fragment, useEffect, useState } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";

const ListItems = () => {
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    // Function to fetch data from local storage
    const fetchData = () => {
        if (localStorage.getItem("inventory_data"))
            setTableData(JSON.parse(localStorage.getItem("inventory_data")));
    };
    return (
        <Fragment>
            <Navbar opened="inventory" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper p-5 mb-5">
                    <span className="title"> Items </span>
                    <Link to="/inventory/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp; Add Item
                        </button>
                    </Link>
                </div>
                {tableData.length > 0 ? (
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
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Added On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((data, idx) => (
                                    <tr key={idx}>
                                        <td>{data.name}</td>
                                        <td>{data.description}</td>
                                        <td>₹{data.price}</td>
                                        <td>{data.date.slice(0, 10)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="my-3 mx-5"> There are no items available</p>
                )}
            </div>
        </Fragment>
    );
};

export default withWrapper(ListItems);
