import React, { Fragment, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import { razorpay } from "api";
import {
    customersDetails,
    CustomersDetailsSchema,
} from "pages/Customers/FormDetails";

const AddCustomers = () => {
    // State Variables
    const { fields, handleFieldChange, validate, errors } = useForm(
        customersDetails,
        CustomersDetailsSchema
    );
    const [loading, setLoading] = useState(false);

    // Imports for link and notification
    const history = useHistory();
    const { triggerNotification } = useNotification();

    // API called here to add customers to db
    const addCustomer = useCallback(
        async (event) => {
            event.preventDefault();
            // Form Validations
            if (validate()) {
                setLoading(true);
                const { error, response } = await razorpay.createCustomer(
                    fields
                );
                if (error || response.error) {
                    triggerNotification(
                        error ? error.message : "Something went wrong",
                        { type: "error" }
                    );
                } else {
                    triggerNotification("Customer saved successfully", {
                        type: "success",
                    });
                    history.push("/customers");
                }
                setLoading(false);
            }
        },
        [fields]
    );

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        <FormattedMessage id="title.customer" />
                    </span>
                </div>
                <div className="card p-5 mx-5">
                    <form onSubmit={addCustomer}>
                        <div className="row py-5" style={{ maxWidth: "800px" }}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.name" />
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={fields.name}
                                    onChange={handleFieldChange}
                                />
                                {errors?.name && (
                                    <span className="text-error mt-2">
                                        {errors.name || ""}
                                    </span>
                                )}
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="customer.phone" />
                                </label>
                                <input
                                    type="text"
                                    name="contact"
                                    required
                                    pattern="[+0-9]{10,13}"
                                    value={fields.contact}
                                    onChange={handleFieldChange}
                                />
                                {errors?.contact && (
                                    <span className="text-error mt-2">
                                        {errors.contact || ""}
                                    </span>
                                )}
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.email" />
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={fields.email}
                                    onChange={handleFieldChange}
                                />
                                {errors?.email && (
                                    <span className="text-error mt-2">
                                        {errors.email || ""}
                                    </span>
                                )}
                            </div>
                            <div className="form-group mx-5 my-3 justify-content-center">
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={loading}
                                >
                                    <i className="fa fa-save"></i> &nbsp;
                                    <FormattedMessage id="customer.saveButton" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddCustomers;
