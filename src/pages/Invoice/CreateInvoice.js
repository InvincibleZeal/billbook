import React, { Fragment, useState, useEffect, useCallback } from "react";
import "styles/add-invoice.css";
import { Link, useHistory } from "react-router-dom";
import InvoiceModal from "pages/Invoice/InvoiceModal";
import { useIntl, FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import {
    invoiceDetails,
    InvoiceDetailsSchema,
} from "pages/Invoice/FormDetails";

const CreateInvoice = () => {
    const [modalState, setModalState] = useState({
        status: false,
        items: [],
        customers: [],
        type: "customer",
    });
    const { fields, handleFieldChange, validate, errors, setState } = useForm(
        invoiceDetails,
        InvoiceDetailsSchema
    );
    const intl = useIntl();
    const history = useHistory();
    const { triggerNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from local storage
    const fetchData = useCallback(() => {
        if (localStorage.getItem("customer_data")) {
            try {
                const customerData = JSON.parse(
                    localStorage.getItem("customer_data")
                );
                setModalState((state) => ({
                    ...state,
                    customers: customerData,
                }));
            } catch (e) {
                triggerNotification("Failed parsing customer data", {
                    type: "error",
                });
                localStorage.removeItem("customer_data");
            }
        }
        if (localStorage.getItem("inventory_data")) {
            try {
                const inventoryData = JSON.parse(
                    localStorage.getItem("inventory_data")
                );
                setModalState((state) => ({ ...state, items: inventoryData }));
            } catch (e) {
                triggerNotification("Failed parsing inventory data", {
                    type: "error",
                });
                localStorage.removeItem("inventory_data");
            }
        }
    }, [modalState.customers, modalState.items]);

    // Function to delete items
    const removeElement = useCallback(
        (id) => {
            if (
                window.confirm(
                    intl.formatMessage({ id: "invoice.confirm.delete.item" })
                )
            ) {
                setState(
                    "items",
                    fields.items.filter((item) => item.id !== id)
                );
            }
        },
        [fields]
    );
    const saveInvoice = useCallback(
        (event) => {
            event.preventDefault();
            if (validate()) {
                // Adding to local storage
                try {
                    if (localStorage.getItem("invoice_data") == null) {
                        localStorage.setItem("invoice_data", "[]");
                    }
                    const invoiceData = JSON.parse(
                        localStorage.getItem("invoice_data")
                    );
                    invoiceData.push(fields);
                    localStorage.setItem(
                        "invoice_data",
                        JSON.stringify(invoiceData)
                    );
                    triggerNotification("Invoice created successfully", {
                        type: "success",
                    });
                    history.push("/invoice");
                } catch (e) {
                    console.error(e);
                }
            }
        },
        [fields]
    );

    const updateQuantity = useCallback(
        (id, value) => {
            const index = fields.items.findIndex((x) => x.id === id);
            fields.items[index].quantity = Number(value);
            setState("items", fields.items);
        },
        [fields]
    );

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <form onSubmit={saveInvoice}>
                    <div className="page-heading-wrapper mb-5 p-5">
                        <span className="title">
                            {" "}
                            <FormattedMessage id="title.invoice" />
                        </span>
                        <button className="btn" type="submit">
                            <i className="fa fa-save"></i> &nbsp;{" "}
                            <FormattedMessage id="invoice.saveButton" />
                        </button>
                    </div>
                    <div className="d-flex py-5 flex-grow align-items-start">
                        <div>
                            <div className="card-bordered p-3 mx-5 mb-2">
                                <h4 className="bill-to text-muted m-0 mb-3">
                                    <FormattedMessage id="invoice.billTo" />
                                </h4>
                                <div className="d-flex justify-content-between">
                                    {modalState.customers.length > 0 ? (
                                        <Fragment>
                                            {fields.customer.name ? (
                                                <Fragment>
                                                    <div className="billing_details pr-3">
                                                        <div>
                                                            {
                                                                fields.customer
                                                                    .name
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                fields.customer
                                                                    .phone
                                                            }
                                                        </div>
                                                        <div>
                                                            {
                                                                fields.customer
                                                                    .email
                                                            }
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="btn-link"
                                                        onClick={() =>
                                                            setModalState(
                                                                (state) => ({
                                                                    ...state,
                                                                    status: true,
                                                                    type: "customer",
                                                                })
                                                            )
                                                        }
                                                    >
                                                        <FormattedMessage id="invoice.change" />
                                                    </div>
                                                </Fragment>
                                            ) : (
                                                <div
                                                    className="btn-link"
                                                    onClick={() => {
                                                        setModalState(
                                                            (state) => ({
                                                                ...state,
                                                                status: true,
                                                                type: "customer",
                                                            })
                                                        );
                                                    }}
                                                >
                                                    <FormattedMessage id="invoice.selectCustomer" />
                                                </div>
                                            )}
                                        </Fragment>
                                    ) : (
                                        <Link to="/customers/add">
                                            {" "}
                                            <p>
                                                {" "}
                                                <FormattedMessage id="invoice.selectCustomer" />
                                            </p>{" "}
                                        </Link>
                                    )}
                                </div>
                            </div>
                            {errors?.customer && (
                                <span className="text-error mx-1 px-5">
                                    {errors.customer.name || ""}
                                </span>
                            )}
                        </div>

                        <div className="invoice_details mx-5">
                            <div className="d-flex flex-grow mb-5">
                                <div className="input-group px-2">
                                    <label htmlFor="issueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.issuedAt" />
                                    </label>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="issueDate"
                                        value={fields.issueDate}
                                        onChange={handleFieldChange}
                                        required
                                    />
                                    {errors?.issueDate && (
                                        <span className="text-error mt-2">
                                            {errors.issueDate || ""}
                                        </span>
                                    )}
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="dueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.dueDate" />
                                    </label>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="dueDate"
                                        required
                                        value={fields.dueDate}
                                        onChange={handleFieldChange}
                                    />
                                    {errors?.dueDate && (
                                        <span className="text-error mt-2">
                                            {errors.dueDate || ""}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="d-flex flex-grow">
                                <div className="input-group px-2">
                                    <label htmlFor="invoiceNumber">
                                        <FormattedMessage id="invoice.number" />
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="invoiceNumber"
                                        required
                                        value={fields.invoiceNumber}
                                        onChange={handleFieldChange}
                                    />
                                    {errors?.invoiceNumber && (
                                        <span className="text-error mt-2">
                                            {errors.invoiceNumber || ""}
                                        </span>
                                    )}
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="referenceNumber">
                                        <FormattedMessage id="invoice.referenceNumber" />
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="referenceNumber"
                                        required
                                        value={fields.referenceNumber}
                                        onChange={handleFieldChange}
                                    />
                                    {errors?.referenceNumber && (
                                        <span className="text-error mt-2">
                                            {errors.referenceNumber || ""}
                                        </span>
                                    )}
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
                                        <FormattedMessage id="title.items" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.quantity" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="item.price" />
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.amount" />
                                    </th>
                                    <th className="table-action"></th>
                                </tr>
                            </thead>
                            {fields.items.length > 0 && (
                                <tbody>
                                    {fields.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td> {item.name} </td>
                                            <td>
                                                <input
                                                    min="1"
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        updateQuantity(
                                                            item.id,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </td>
                                            <td>₹{item.price}</td>
                                            <td>
                                                ₹
                                                {item.quantity *
                                                    Number(item.price)}
                                            </td>
                                            <td className="table-action">
                                                <span
                                                    onClick={() =>
                                                        removeElement(item.id)
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
                                    ))}
                                </tbody>
                            )}
                        </table>

                        <div className=" invoice_add-item d-flex align-items-center justify-content-center mb-1">
                            <span
                                className="btn-link p-4"
                                onClick={() => {
                                    setModalState((state) => ({
                                        ...state,
                                        status: true,
                                        type: "items",
                                    }));
                                }}
                            >
                                <i className="fa fa-shopping-basket mr-2"> </i>
                                <FormattedMessage id="invoice.addAnItem" />
                            </span>
                        </div>
                        {errors?.items && (
                            <span className="text-error mt-2">
                                {errors.items || ""}
                            </span>
                        )}
                    </div>

                    <div className="d-flex flex-grow py-5">
                        <div className="invoice_note mx-5">
                            <div className="input-group">
                                <label htmlFor="notes">
                                    {" "}
                                    <FormattedMessage id="invoice.notes" />
                                </label>
                                <textarea
                                    className="input-sm invoice-notes"
                                    name="notes"
                                    value={fields.notes}
                                    onChange={handleFieldChange}
                                ></textarea>
                                {errors?.notes && (
                                    <span className="text-error mt-2">
                                        {errors.notes || ""}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="summary mx-5">
                            <div className="card-bordered p-3">
                                {fields.items.length ? (
                                    <div className="summary_items pb-4">
                                        {fields.items.map((item, idx) => (
                                            <div
                                                className="summary_item"
                                                key={idx}
                                            >
                                                <div className="summary_name">
                                                    {item.name}
                                                </div>
                                                <div className="summary_quantity">
                                                    x{item.quantity}
                                                </div>
                                                <div className="summary_amount">
                                                    ₹{item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                                <div className="summary_total d-flex mt-2">
                                    <div>
                                        {" "}
                                        <FormattedMessage id="invoice.totalAmount" />
                                        :
                                    </div>
                                    <div className="primary">
                                        ₹
                                        {fields.items.reduce(
                                            (accumulator, currValue) => {
                                                return (
                                                    accumulator +
                                                    currValue.quantity *
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
            <InvoiceModal
                status={modalState.status}
                setModalState={setModalState}
                customers={modalState.customers}
                items={modalState.items}
                type={modalState.type}
                setState={setState}
                fields={fields}
            />
        </Fragment>
    );
};

export default CreateInvoice;
