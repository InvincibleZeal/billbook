import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { Link } from "react-router-dom";
Modal.setAppElement("*");

const ChangeCustomerModal = ({
    modalStatus,
    setModalStatus,
    customersInfo,
    invoiceRecipentDetails,
    setInvoiceRecipentDetails,
}) => {
    const updateCustomersDetails = (name, phone, email) => {
        setInvoiceRecipentDetails({
            ...invoiceRecipentDetails,
            name,
            phone,
            email,
        });
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
                <span className="react-modal-title">Change Details</span>
                <div className="react-modal-close">
                    <i
                        className="fa fa-times"
                        onClick={() => setModalStatus(false)}
                    ></i>
                </div>
            </div>
            {customersInfo.length > 0 ? (
                <Fragment>
                    {customersInfo.map((info, idx) => (
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
                                    style={{ marginBottom: "0px" }}
                                >
                                    <div>
                                        <p>{info.name}</p>
                                        <p>{info.phone}</p>
                                        <p>{info.email}</p>
                                    </div>
                                    <button className="btn">Select</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Fragment>
            ) : (
                <p className="px-4 py-2">
                    {" "}
                    No Customers details available. Please click{" "}
                    <Link to="/customers/add" style={{ color: "black" }}>
                        {" "}
                        here
                    </Link>{" "}
                    to add the same.
                </p>
            )}
        </Modal>
    );
};

ChangeCustomerModal.propTypes = {
    modalStatus: PropTypes.bool.isRequired,
    setModalStatus: PropTypes.func.isRequired,
    customersInfo: PropTypes.array.isRequired,
    invoiceRecipentDetails: PropTypes.object.isRequired,
    setInvoiceRecipentDetails: PropTypes.func.isRequired,
};

export default ChangeCustomerModal;
