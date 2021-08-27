import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
Modal.setAppElement("*");

const ChangeCustomerModal = ({
    status,
    setModalState,
    customers,
    items,
    type,
    setState,
    fields,
}) => {
    const updateCustomersDetails = useCallback(
        (name, phone, email) => {
            setState("customer", { name, phone, email });
            setModalState((state) => ({ ...state, status: false }));
        },
        [fields]
    );

    const addItem = useCallback((id, name, price) => {
        const product = { id, name, price };
        product.quantity = 1;
        setState("items", (items) => {
            const updateItems = [...items];
            if (
                updateItems.length === 0 ||
                !updateItems.find((p) => p.id === product.id)
            ) {
                updateItems.push(product);
            } else if (updateItems.find((p) => p.id === product.id)) {
                product.quantity =
                    updateItems.find((p) => p.id === product.id).quantity + 1;
                updateItems.splice(
                    updateItems.findIndex((p) => p.id === product.id),
                    1,
                    product
                );
            }
            return updateItems;
        });
        setModalState((state) => ({ ...state, status: false }));
    }, []);
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
                        <FormattedMessage id="change.details" />
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
                    {customers.length > 0 ? (
                        <Fragment>
                            {customers.map((info, idx) => (
                                <div
                                    className="react-modal-title-container customer-card"
                                    key={idx}
                                    onClick={() =>
                                        updateCustomersDetails(
                                            info.name,
                                            info.phone,
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
                                                <p>{info.name}</p>
                                                <p>{info.phone}</p>
                                                <p>{info.email}</p>
                                            </div>
                                            <button className="btn">
                                                <FormattedMessage id="select" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : (
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
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    {items.length > 0 ? (
                        <Fragment>
                            {items.map((info, idx) => (
                                <div
                                    className="react-modal-title-container customer-card"
                                    key={idx}
                                    onClick={() =>
                                        addItem(info.id, info.name, info.price)
                                    }
                                >
                                    <div className="card p-3">
                                        <div
                                            className="page-heading-wrapper"
                                            style={{ marginBottom: "0" }}
                                        >
                                            <div>
                                                <p>Item: {info.name}</p>
                                                <p>Price: ₹{info.price}</p>
                                            </div>
                                            <button className="btn">
                                                <FormattedMessage id="select"></FormattedMessage>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Fragment>
                    ) : (
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
                    )}
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
};

export default ChangeCustomerModal;
