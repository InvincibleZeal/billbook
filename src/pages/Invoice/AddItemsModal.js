/* eslint-disable no-unused-vars */
import React, { Fragment, useCallback } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
Modal.setAppElement("*");

const AddItemsModal = ({
    modalStatus,
    setModalStatus,
    itemInfo,
    invoiceRecipientDetails,
    setInvoiceRecipientDetails,
}) => {
    const addItem = useCallback(
        (id, name, price) => {
            const product = { id, name, price };
            product.quantity = 1;
            if (
                invoiceRecipientDetails.items.length === 0 ||
                !invoiceRecipientDetails.items.find((p) => p.id === product.id)
            ) {
                invoiceRecipientDetails.items.push(product);
            } else if (
                invoiceRecipientDetails.items.find((p) => p.id === product.id)
            ) {
                product.quantity =
                    invoiceRecipientDetails.items.find(
                        (p) => p.id === product.id
                    ).quantity + 1;
                invoiceRecipientDetails.items.splice(
                    invoiceRecipientDetails.items.findIndex(
                        (p) => p.id === product.id
                    ),
                    1,
                    product
                );
            }
            setInvoiceRecipientDetails(invoiceRecipientDetails);
            setModalStatus(false);
        },
        [invoiceRecipientDetails]
    );
    return (
        <Modal
            isOpen={modalStatus}
            onRequestClose={() => setModalStatus(false)}
            className="react-modal"
        >
            <div
                className="page-heading-wrapper react-modal-title-container"
                style={{ marginBottom: "0" }}
            >
                <span className="react-modal-title">
                    <FormattedMessage id="select.item"></FormattedMessage>
                </span>
                <div className="react-modal-close">
                    <i
                        className="fa fa-times"
                        onClick={() => setModalStatus(false)}
                    ></i>
                </div>
            </div>
            {itemInfo.length > 0 ? (
                <Fragment>
                    {itemInfo.map((info, idx) => (
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
                    <Link to="/inventory/add" style={{ color: "black" }}>
                        {" "}
                        here
                    </Link>{" "}
                    to add the same.
                </p>
            )}
        </Modal>
    );
};

AddItemsModal.propTypes = {
    modalStatus: PropTypes.bool.isRequired,
    setModalStatus: PropTypes.func.isRequired,
    itemInfo: PropTypes.array.isRequired,
    invoiceRecipientDetails: PropTypes.object.isRequired,
    setInvoiceRecipientDetails: PropTypes.func.isRequired,
};

export default AddItemsModal;
