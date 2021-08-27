import React, { Fragment, useCallback } from "react";
import { useHistory } from "react-router-dom";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import Button from "components/Button";
import Input from "components/Input";
import { razorpay } from "api";

const AddCustomers = () => {
    const [fields, handleFieldChange] = useForm({
        name: "",
        contact: "",
        email: "",
    });
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addCustomer = useCallback(
        async (e) => {
            e.preventDefault();
            const { error, response } = await razorpay.createCustomer(fields);

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
                                    onInvalid="this.setCustomValidity('Enter at least 10 characters. Use only numbers')"
                                    onInput="this.setCustomValidity('')"
                                    value={fields.contact}
                                    onChange={handleFieldChange}
                                />
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
                            </div>
                            <div className="form-group mx-5 my-3 justify-content-center">
                                <Button type="submit">
                                    <FormattedMessage id="customer.saveButton" />
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
