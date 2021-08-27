import React, { Fragment, useState, useEffect, useCallback } from "react";
import "styles/add-invoice.css";
import { Link, useHistory } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import { useIntl, FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import { razorpay } from "api";
import Spinner from "components/Spinner";

const CreateInvoice = () => {
    const [modalState, setModalState] = useState({
        status: false,
        items: [],
        customers: [],
        type: "customer",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [fields, handleFieldChange, setFormState] = useForm({
        issueDate: "",
        dueDate: "",
        invoice_number: "",
        reference_number: "",
        notes: "",
        customer: {},
        customer_id: "",
        line_items: [],
        type: "invoice",
    });
    const intl = useIntl();
    const history = useHistory();
    const { triggerNotification } = useNotification();

    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from local storage
    const fetchData = useCallback(async () => {
        const promises = [razorpay.fetchCustomers(), razorpay.fetchItems()];
        const [customers, items] = await Promise.allSettled(promises);
        setModalState((state) => ({
            ...state,
            customers: customers.value.response.items,
            items: items.value.response.items.filter(
                (x) => x.type === "invoice"
            ),
        }));
        setLoading(false);
    }, [modalState.customers, modalState.items]);

    // Function to delete items
    const removeElement = useCallback(
        (id) => {
            if (
                window.confirm(
                    intl.formatMessage({ id: "invoice.confirm.delete.item" })
                )
            ) {
                setFormState(
                    "line_items",
                    fields.line_items.filter((item) => item.id !== id)
                );
            }
        },
        [fields]
    );
    const saveInvoice = useCallback(
        async (e) => {
            e.preventDefault();
            setSaving(true);
            // Adding to local storage
            const data = {
                ...fields,
                notes: { remarks: fields.notes },
                line_items: fields.line_items.map((x) => ({
                    item_id: x.id,
                    quantity: x.quantity,
                })),
            };
            delete data.customer;
            delete data.dueDate;
            delete data.issueDate;
            delete data.reference_number;

            const { error, response } = await razorpay.createInvoice(data);

            if (error || response.error) {
                triggerNotification(
                    error ? error.message : "Something went wrong",
                    { type: "error" }
                );
            } else {
                triggerNotification("Invoice created successfully", {
                    type: "success",
                });
                history.push("/invoice");
            }
            setSaving(false);
        },
        [fields]
    );

    const updateQuantity = useCallback(
        (id, value) => {
            const index = fields.line_items.findIndex((x) => x.id === id);
            fields.line_items[index].quantity = Number(value);
            setFormState("line_items", fields.line_items);
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
                        <button className="btn" type="submit" disabled={saving}>
                            <i className="fa fa-save"></i> &nbsp;{" "}
                            <FormattedMessage id="invoice.saveButton" />
                            <Spinner
                                loading={saving}
                                size={12}
                                className="px-1"
                                width="30px"
                            ></Spinner>
                        </button>
                    </div>
                    <div className="d-flex py-5 flex-grow align-items-start">
                        <div className="card-bordered p-3 mx-5">
                            <h4 className="bill-to text-muted m-0 mb-3">
                                <FormattedMessage id="invoice.billTo" />
                            </h4>
                            <div className="d-flex justify-content-between">
                                {!loading && !modalState.customers.length ? (
                                    <Link to="/customers/add">
                                        {" "}
                                        <p>
                                            {" "}
                                            <FormattedMessage id="invoice.selectCustomer" />
                                        </p>{" "}
                                    </Link>
                                ) : null}
                                {!loading && fields.customer.name ? (
                                    <Fragment>
                                        <div className="billing_details pr-3">
                                            <div>{fields.customer.name}</div>
                                            <div>{fields.customer.contact}</div>
                                            <div>{fields.customer.email}</div>
                                        </div>
                                        <div
                                            className="btn-link"
                                            onClick={() =>
                                                setModalState((state) => ({
                                                    ...state,
                                                    status: true,
                                                    type: "customer",
                                                }))
                                            }
                                        >
                                            <FormattedMessage id="invoice.change" />
                                        </div>
                                    </Fragment>
                                ) : null}
                                {!fields.customer.name ? (
                                    <Fragment>
                                        <div
                                            className="btn-link"
                                            onClick={() => {
                                                setModalState((state) => ({
                                                    ...state,
                                                    status: true,
                                                    type: "customer",
                                                }));
                                            }}
                                        >
                                            <FormattedMessage id="invoice.selectCustomer" />
                                        </div>
                                    </Fragment>
                                ) : null}
                            </div>
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
                                </div>
                            </div>
                            <div className="d-flex flex-grow">
                                <div className="input-group px-2">
                                    <label htmlFor="invoice_number">
                                        <FormattedMessage id="invoice.number" />
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="invoice_number"
                                        required
                                        value={fields.invoice_number}
                                        onChange={handleFieldChange}
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="reference_number">
                                        <FormattedMessage id="invoice.referenceNumber" />
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="text"
                                        name="reference_number"
                                        required
                                        value={fields.reference_number}
                                        onChange={handleFieldChange}
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
                            {fields.line_items.length > 0 && (
                                <tbody>
                                    {fields.line_items.map((item, idx) => (
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

                        <div className=" invoice_add-item d-flex align-items-center justify-content-center ">
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
                            </div>
                        </div>
                        <div className="summary mx-5">
                            <div className="card-bordered p-3">
                                {fields.line_items.length ? (
                                    <div className="summary_items pb-4">
                                        {fields.line_items.map((item, idx) => (
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
                                        {fields.line_items.reduce(
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
                setFormState={setFormState}
                fields={fields}
                loading={loading}
            />
        </Fragment>
    );
};

export default CreateInvoice;
