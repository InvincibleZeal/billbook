/* eslint-disable no-unused-vars */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

Modal.setAppElement("*");

const AddItemsModal = ({
    modalStatus,
    setModalStatus,
    itemInfo,
    invoiceRecipentDetails,
    setInvoiceRecipentDetails,
}) => {
    const addItem = (id, name, price) => {
        const product = { id, name, price };
        product.amount = 1;
        if (
            invoiceRecipentDetails.items.length === 0 ||
            !invoiceRecipentDetails.items.find((p) => p.id === product.id)
        ) {
            invoiceRecipentDetails.items.push(product);
        } else if (
            invoiceRecipentDetails.items.find((p) => p.id === product.id)
        ) {
            product.amount =
                invoiceRecipentDetails.items.find((p) => p.id === product.id)
                    .amount + 1;
            invoiceRecipentDetails.items.splice(
                invoiceRecipentDetails.items.findIndex(
                    (p) => p.id === product.id
                ),
                1,
                product
            );
        }
        setInvoiceRecipentDetails(invoiceRecipentDetails);
        setModalStatus(false);
    };
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
                    {" "}
                    <FormattedMessage id="select.item"></FormattedMessage>{" "}
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
                                    style={{ marginBottom: "0px" }}
                                >
                                    <div>
                                        <p>
                                            {" "}
                                            <FormattedMessage id="title.items"></FormattedMessage>{" "}
                                            : {info.name}
                                        </p>
                                        <p>
                                            {" "}
                                            <FormattedMessage id="title.price"></FormattedMessage>{" "}
                                            : ₹{info.price}
                                        </p>
                                    </div>
                                    <button className="btn">
                                        {" "}
                                        <FormattedMessage id="select"></FormattedMessage>{" "}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ) : (
                <p className="px-4 py-2">
                    {" "}
                    <FormattedMessage id="no.customers.details"></FormattedMessage>{" "}
                    <Link to="/customers/add" style={{ color: "black" }}>
                        {" "}
                        <FormattedMessage id="here"></FormattedMessage>{" "}
                    </Link>{" "}
                    <FormattedMessage id="to.add.same"></FormattedMessage>{" "}
                </p>
            )}
        </Modal>
    );
};

AddItemsModal.propTypes = {
    modalStatus: PropTypes.bool.isRequired,
    setModalStatus: PropTypes.func.isRequired,
    itemInfo: PropTypes.array.isRequired,
    invoiceRecipentDetails: PropTypes.object.isRequired,
    setInvoiceRecipentDetails: PropTypes.func.isRequired,
};

export default AddItemsModal;
