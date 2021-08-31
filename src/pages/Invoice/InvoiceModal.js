import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import Spinner from "components/Spinner";
Modal.setAppElement("*");

const ChangeCustomerModal = ({
    status,
    setModalState,
    customers,
    items,
    type,
    setState,
    fields,
    loading,
}) => {
    const updateCustomersDetails = useCallback(
        (id, name, contact, email) => {
            setState("customer", { name, contact, email });
            setState("customer_id", id);
            setModalState((state) => ({ ...state, status: false }));
        },
        [fields]
    );

    const addItem = useCallback(
        (id, name, price) => {
            const product = { id: id, name, price };
            product.quantity = 1;
            setState("line_items", (items) => {
                const updateItems = [...items];
                if (
                    updateItems.length === 0 ||
                    !updateItems.find((p) => p.id === product.id)
                ) {
                    updateItems.push(product);
                } else if (updateItems.find((p) => p.id === product.id)) {
                    product.quantity =
                        updateItems.find((p) => p.id === product.id).quantity +
                        1;
                    updateItems.splice(
                        updateItems.findIndex((p) => p.id === product.id),
                        1,
                        product
                    );
                }
                return updateItems;
            });
            setModalState((state) => ({ ...state, status: false }));
        },
        [fields]
    );
    return (
        <Modal
            isOpen={status}
            onRequestClose={() =>
                setModalState((state) => ({ ...state, status: false }))
            }
            className="react-modal"
        >
            <div
                className="page-heading-wrapper react-modal-title-container"
                style={{ marginBottom: "0" }}
            >
                <span className="react-modal-title">
                    {type === "customer" ? (
                        <FormattedMessage id="invoice.selectCustomer" />
                    ) : (
                        <FormattedMessage id="select.item" />
                    )}
                </span>
                <div className="react-modal-close">
                    <i
                        className="fa fa-times"
                        onClick={() =>
                            setModalState((state) => ({
                                ...state,
                                status: false,
                            }))
                        }
                    ></i>
                </div>
            </div>
            {type === "customer" ? (
                <Fragment>
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={loading} size={50}></Spinner>
                    </div>
                    {!loading && customers.length > 0 ? (
                        <Fragment>
                            {customers.map((info, idx) => (
                                <div
                                    className="react-modal-title-container customer-card"
                                    key={idx}
                                    onClick={() =>
                                        updateCustomersDetails(
                                            info.id,
                                            info.name,
                                            info.contact,
                                            info.email
                                        )
                                    }
                                >
                                    <div className="card p-3">
                                        <div
                                            className="page-heading-wrapper"
                                            style={{ marginBottom: "0" }}
                                        >
                                            <div>
                                                <h3
                                                    style={{ fontSize: "1rem" }}
                                                >
                                                    {info.name}
                                                </h3>
                                                <div className="text-muted">
                                                    <p className="pt-2">
                                                        {info.contact}
                                                    </p>
                                                    <p className="pt-2">
                                                        {info.email}
                                                    </p>
                                                </div>
                                            </div>
                                            <Button>
                                                <FormattedMessage id="select" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : null}

                    {!loading && customers.length === 0 ? (
                        <p className="px-4 py-2">
                            {" "}
                            No Customers details available. Please click{" "}
                            <Link
                                to="/customers/add"
                                style={{ color: "black" }}
                            >
                                {" "}
                                here
                            </Link>{" "}
                            to add the same.
                        </p>
                    ) : null}
                </Fragment>
            ) : (
                <Fragment>
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner loading={loading} size={50}></Spinner>
                    </div>
                    {!loading && items.length > 0 ? (
                        <Fragment>
                            {items.map((info, idx) => (
                                <div
                                    className="react-modal-title-container customer-card"
                                    key={idx}
                                    onClick={() =>
                                        addItem(info.id, info.name, info.amount)
                                    }
                                >
                                    <div className="card p-3">
                                        <div
                                            className="page-heading-wrapper"
                                            style={{ marginBottom: "0" }}
                                        >
                                            <div className="d-flex justify-content-between">
                                                <p className="fw-bold">
                                                    Item: {info.name}
                                                </p>
                                                <p className="text-muted px-3">
                                                    Price: ₹{info.amount}
                                                </p>
                                            </div>
                                            <Button>
                                                <FormattedMessage id="select" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : null}
                    {!loading && items.length === 0 ? (
                        <p className="px-4 py-2">
                            {" "}
                            No Items available. Please click{" "}
                            <Link
                                to="/inventory/add"
                                style={{ color: "black" }}
                            >
                                {" "}
                                here
                            </Link>{" "}
                            to add the same.
                        </p>
                    ) : null}
                </Fragment>
            )}
        </Modal>
    );
};

ChangeCustomerModal.propTypes = {
    status: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    setModalState: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired,
    setState: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default ChangeCustomerModal;
