import React, { Fragment, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import Button from "components/Button";
import Input from "components/Input";
import { razorpay } from "api";
import Spinner from "components/Spinner";

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
                        response.error
                            ? response.error.description
                            : "Something went wrong",
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
                                <Input
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
                                <Input
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
                                <Input
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
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    icon="save"
                                >
                                    <FormattedMessage id="customer.saveButton" />
                                    <Spinner
                                        loading={loading}
                                        size={12}
                                        className="px-1"
                                        width="30px"
                                    ></Spinner>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default AddCustomers;
