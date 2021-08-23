/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useEffect } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import "styles/add-invoice.css";
import { Link, useHistory } from "react-router-dom";
import ChangeCustomerModal from "./ChangeCustomerModal";
import AddItemModal from "./AddItemsModal";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";

const CreateInvoice = () => {
    const [itemModal, setItemModal] = useState(false);
    const [customerDetailsModal, setCustomersDetailsModal] = useState(false);
    const [customersInfo, setCustomersInfo] = useState([]);
    const [itemInfo, setItemInfo] = useState([]);
    const [invoiceRecipientDetails, setInvoiceRecipientDetails] = useState({
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
    const history = useHistory();
    const { triggerNotification } = useNotification();

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

    // Function to delete items
    const removeElement = (id) => {
        if (window.confirm("Are you sure, you want to delete this item?")) {
            const items = invoiceRecipientDetails.items.filter(
                (item) => item.id !== id
            );
            setInvoiceRecipientDetails({ ...invoiceRecipientDetails, items });
        }
    };

    const saveInvoice = (e) => {
        e.preventDefault();
        // Adding to local storage
        if (localStorage.getItem("invoice_data") == null) {
            localStorage.setItem("invoice_data", "[]");
        }
        const invoiceData = JSON.parse(localStorage.getItem("invoice_data"));
        invoiceData.push(invoiceRecipientDetails);
        localStorage.setItem("invoice_data", JSON.stringify(invoiceData));
        triggerNotification("Invoice created successfully", {
            type: "success",
        });
        history.push("/invoice");
    };
    return (
        <Fragment>
            <Navbar opened="invoice" />
            <div className="page-content p-5 bg-primary">
                <form onSubmit={(e) => saveInvoice(e)}>
                    <div className="page-heading-wrapper mb-5 p-5">
                        <span className="title">
                            {" "}
                            <FormattedMessage id="title.invoice"></FormattedMessage>{" "}
                        </span>
                        <button className="btn" type="submit">
                            <i className="fa fa-save"></i> &nbsp;{" "}
                            <FormattedMessage id="invoice.save.button"></FormattedMessage>
                        </button>
                    </div>
                    <div className="d-flex py-5 flex-grow align-items-start">
                        <div className="card-bordered p-3 mx-5">
                            <h4 className="bill-to text-muted m-0 mb-3">
                                <FormattedMessage id="invoice.bill.to"></FormattedMessage>{" "}
                            </h4>
                            <div className="d-flex justify-content-between">
                                {customersInfo.length > 0 ? (
                                    <Fragment>
                                        {invoiceRecipientDetails.name !== "" ? (
                                            <Fragment>
                                                <div className="billing_details pr-3">
                                                    <div>
                                                        {invoiceRecipientDetails.name ||
                                                            customersInfo[0]
                                                                .name}
                                                    </div>
                                                    <div>
                                                        {invoiceRecipientDetails.phone ||
                                                            customersInfo[0]
                                                                .phone}
                                                    </div>
                                                    <div>
                                                        {invoiceRecipientDetails.email ||
                                                            customersInfo[0]
                                                                .email}
                                                    </div>
                                                </div>
                                                <div
                                                    className="btn-link"
                                                    onClick={() =>
                                                        setCustomersDetailsModal(
                                                            true
                                                        )
                                                    }
                                                >
                                                    <FormattedMessage id="invoice.change"></FormattedMessage>
                                                </div>
                                            </Fragment>
                                        ) : (
                                            <div
                                                className="btn-link"
                                                onClick={() =>
                                                    setCustomersDetailsModal(
                                                        true
                                                    )
                                                }
                                            >
                                                <FormattedMessage id="invoice.add.customer.details"></FormattedMessage>
                                            </div>
                                        )}
                                    </Fragment>
                                ) : (
                                    <Link to="/customers/add">
                                        {" "}
                                        <p>
                                            {" "}
                                            <FormattedMessage id="invoice.add.customer.details"></FormattedMessage>
                                        </p>{" "}
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="invoice_details mx-5">
                            <div className="d-flex flex-grow mb-5">
                                <div className="input-group px-2">
                                    <label htmlFor="issueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.issued.at"></FormattedMessage>{" "}
                                    </label>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="issueDate"
                                        required
                                        onChange={(e) =>
                                            setInvoiceRecipientDetails({
                                                ...invoiceRecipientDetails,
                                                issueDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="dueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.due.date"></FormattedMessage>{" "}
                                    </label>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="dueDate"
                                        required
                                        onChange={(e) =>
                                            setInvoiceRecipientDetails({
                                                ...invoiceRecipientDetails,
                                                dueDate: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-grow">
                                <div className="input-group px-2">
                                    <label htmlFor="invoiceNumber">
                                        <FormattedMessage id="invoice.number"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="invoiceNumber"
                                        required
                                        onChange={(e) =>
                                            setInvoiceRecipientDetails({
                                                ...invoiceRecipientDetails,
                                                invoiceNumber: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="referenceNumber">
                                        <FormattedMessage id="invoice.reference.number"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="referenceNumber"
                                        required
                                        onChange={(e) =>
                                            setInvoiceRecipientDetails({
                                                ...invoiceRecipientDetails,
                                                referenceNumber: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoice_items py-5 mx-5">
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="title.items"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.quantity"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="item.price"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.amount"></FormattedMessage>{" "}
                                    </th>
                                    <th className="table-action"></th>
                                </tr>
                            </thead>
                            {invoiceRecipientDetails.items.length > 0 && (
                                <tbody>
                                    {invoiceRecipientDetails.items.map(
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
                                                    <span
                                                        onClick={() =>
                                                            removeElement(
                                                                item.id
                                                            )
                                                        }
                                                        className="btn-link"
                                                    >
                                                        <i
                                                            className="fa fa-trash"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            )}
                        </table>

                        <div className=" invoice_add-item d-flex align-items-center justify-content-center ">
                            <span
                                className="btn-link p-4"
                                onClick={() => setItemModal(true)}
                            >
                                <i className="fa fa-shopping-basket mr-2"> </i>
                                <FormattedMessage id="invoice.add.on.item"></FormattedMessage>
                            </span>
                        </div>
                    </div>

                    <div className="d-flex flex-grow py-5">
                        <div className="invoice_note mx-5">
                            <div className="input-group">
                                <label htmlFor="notes">
                                    {" "}
                                    <FormattedMessage id="invoice.notes"></FormattedMessage>{" "}
                                </label>
                                <textarea
                                    className="input-sm invoice-notes"
                                    name="notes"
                                    onChange={(e) =>
                                        setInvoiceRecipientDetails({
                                            ...invoiceRecipientDetails,
                                            notes: e.target.value,
                                        })
                                    }
                                ></textarea>
                            </div>
                        </div>
                        <div className="summary mx-5">
                            <div className="card-bordered p-3">
                                <div className="summary_items pb-4">
                                    {invoiceRecipientDetails.items.map(
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
                                                <div className="summary_amount">
                                                    ₹{item.price}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="summary_total d-flex mt-2">
                                    <div>
                                        {" "}
                                        <FormattedMessage id="invoice.total.amount"></FormattedMessage>
                                        :
                                    </div>
                                    <div className="primary">
                                        ₹
                                        {invoiceRecipientDetails.items.reduce(
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
                invoiceRecipientDetails={invoiceRecipientDetails}
                setInvoiceRecipientDetails={setInvoiceRecipientDetails}
            />
            <AddItemModal
                modalStatus={itemModal}
                setModalStatus={setItemModal}
                itemInfo={itemInfo}
                invoiceRecipientDetails={invoiceRecipientDetails}
                setInvoiceRecipientDetails={setInvoiceRecipientDetails}
            />
        </Fragment>
    );
};

export default withWrapper(CreateInvoice);
