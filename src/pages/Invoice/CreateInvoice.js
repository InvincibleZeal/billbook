/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import "styles/add-invoice.css";
import { Link } from "react-router-dom";
import ChangeCustomerModal from "./ChangeCustomerModal";
import AddItemModal from "./AddItemsModal";

const CreateInvoice = () => {
    const [itemModal, setItemModal] = useState(false);
    const [customerDetailsModal, setCustomersDetailsModal] = useState(false);
    const [customersInfo, setCustomersInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [invoiceRecipentDetails, setInvoiceRecipentDetails] = useState({
        name: "",
        phone: "",
        email: "",
        issueDate: "",
        dueDate: "",
        invoiceNumber: "",
        referenceNumber: "",
        items: [],
        notes: "",
    });
    useEffect(() => {
        fetchData();
    }, []);
    // Function to fetch data from local storage
    const fetchData = () => {
        if (localStorage.getItem("customer_data"))
            setCustomersInfo(JSON.parse(localStorage.getItem("customer_data")));
        if (localStorage.getItem("inventory_data"))
            setItemInfo(JSON.parse(localStorage.getItem("inventory_data")));
    };
    return (
        <Fragment>
            <Navbar opened="invoice" />
            <div className="page-content p-5 bg-primary">
                <form action="">
                    <div className="page-heading-wrapper mb-5 p-5">
                        <span className="title"> Invoices </span>
                        <Link to="/invoice">
                            <button className="btn" type="submit">
                                <i className="fa fa-save"></i> &nbsp; Save
                                Invoice
                            </button>
                        </Link>
                    </div>
                    <div className="d-flex py-5 flex-grow align-items-start">
                        <div className="card-bordered p-3 mx-5">
                            <h4 className="billto text-muted m-0 mb-3">
                                Bill to
                            </h4>
                            <div className="d-flex justify-content-between">
                                {customersInfo.length > 0 ? (
                                    <Fragment>
                                        <div className="billing_details pr-3">
                                            <div>
                                                {invoiceRecipentDetails.name ||
                                                    customersInfo[0].name}
                                            </div>
                                            <div>
                                                {invoiceRecipentDetails.phone ||
                                                    customersInfo[0].phone}
                                            </div>
                                            <div>
                                                {invoiceRecipentDetails.email ||
                                                    customersInfo[0].email}
                                            </div>
                                        </div>
                                        <div
                                            className="btn-link"
                                            onClick={() =>
                                                setCustomersDetailsModal(true)
                                            }
                                        >
                                            Change
                                        </div>
                                    </Fragment>
                                ) : (
                                    <Link to="/customers/add">
                                        {" "}
                                        <p>Add Customer</p>{" "}
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="invoice_details mx-5">
                            <div className="d-flex flex-grow mb-5">
                                <div className="input-group px-2">
                                    <label htmlFor="issueDate">Issued At</label>
                                    <i className="fa fa-calendar-o"></i>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="issueDate"
                                        required
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <i className="fa fa-calendar-o"></i>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="dueDate"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-grow">
                                <div className="input-group px-2">
                                    <label htmlFor="invoiceNumber">
                                        Invoice Number
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="number"
                                        name="invoiceNumber"
                                        required
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="referenceNumber">
                                        Reference Number
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="number"
                                        name="referenceNumber"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoice_items py-5 mx-5">
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>Items</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Amount</th>
                                    <th className="table-action"></th>
                                </tr>
                            </thead>
                            {invoiceRecipentDetails.items.length > 0 && (
                                <tbody>
                                    {invoiceRecipentDetails.items.map(
                                        (item, idx) => (
                                            <tr key={idx}>
                                                <td> {item.name} </td>
                                                <td>{item.amount}</td>
                                                <td>₹{item.price}</td>
                                                <td>
                                                    ₹
                                                    {item.amount *
                                                        Number(item.price)}
                                                </td>
                                                <td className="table-action">
                                                    <a
                                                        href="#"
                                                        className="btn-link"
                                                    >
                                                        <i
                                                            className="fa fa-trash"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            )}
                        </table>

                        <div className=" invoice_additem d-flex align-items-center justify-content-center ">
                            <span
                                className="btn-link p-4"
                                onClick={() => setItemModal(true)}
                            >
                                <i className="fa fa-shopping-basket mr-2"> </i>
                                Add an Item
                            </span>
                        </div>
                    </div>

                    <div className="d-flex flex-grow py-5">
                        <div className="invoice_note mx-5">
                            <div className="input-group">
                                <label htmlFor="notes">Notes</label>
                                <textarea
                                    className="input-sm invoice-notes"
                                    name="notes"
                                ></textarea>
                            </div>
                        </div>
                        <div className="summary mx-5">
                            <div className="card-bordered p-3">
                                <div className="summary_items pb-4">
                                    {invoiceRecipentDetails.items.map(
                                        (item, idx) => (
                                            <div
                                                className="summary_item"
                                                key={idx}
                                            >
                                                <div className="summary_name">
                                                    {item.name}
                                                </div>
                                                <div className="summary_quantity">
                                                    x{item.amount}
                                                </div>
                                                <div className="summary_ammount">
                                                    ₹{item.price}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="summary_total d-flex mt-2">
                                    <div>Total Amount:</div>
                                    <div className="primary">
                                        ₹
                                        {invoiceRecipentDetails.items.reduce(
                                            (accumulator, currValue) => {
                                                return (
                                                    accumulator +
                                                    currValue.amount *
                                                        currValue.price
                                                );
                                            },
                                            0
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <ChangeCustomerModal
                modalStatus={customerDetailsModal}
                setModalStatus={setCustomersDetailsModal}
                customersInfo={customersInfo}
                invoiceRecipentDetails={invoiceRecipentDetails}
                setInvoiceRecipentDetails={setInvoiceRecipentDetails}
            />
            <AddItemModal
                modalStatus={itemModal}
                setModalStatus={setItemModal}
                itemInfo={itemInfo}
                invoiceRecipentDetails={invoiceRecipentDetails}
                setInvoiceRecipentDetails={setInvoiceRecipentDetails}
            />
        </Fragment>
    );
};

export default withWrapper(CreateInvoice);
