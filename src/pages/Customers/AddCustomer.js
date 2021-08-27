import React, { Fragment, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import { customersDetails, CustomersDetailsSchema } from "./FormDetails";

const AddCustomers = () => {
    const { fields, handleFieldChange, validate, errors } = useForm(
        customersDetails,
        CustomersDetailsSchema
    );
    const history = useHistory();
    const { triggerNotification } = useNotification();
    const addCustomer = useCallback(
        (event) => {
            event.preventDefault();
            if (validate()) {
                // Adding to local storage
                if (localStorage.getItem("customer_data") == null) {
                    localStorage.setItem("customer_data", "[]");
                }
                let customerData = [];
                try {
                    customerData = JSON.parse(
                        localStorage.getItem("customer_data")
                    );
                    customerData.push(fields);
                    localStorage.setItem(
                        "customer_data",
                        JSON.stringify(customerData)
                    );
                    triggerNotification("Customer added successfully", {
                        type: "success",
                    });
                    history.push("/");
                } catch (e) {
                    console.error(e);
                }
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
                                    name="phone"
                                    required
                                    pattern="[+0-9]{10,13}"
                                    value={fields.phone}
                                    onChange={handleFieldChange}
                                />
                                {errors?.phone && (
                                    <span className="text-error mt-2">
                                        {errors.phone || ""}
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
                                <button className="btn" type="submit">
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
