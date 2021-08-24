import React, { Fragment, useCallback } from "react";
import Navbar from "common/Navbar";
import { useHistory } from "react-router-dom";
import withWrapper from "common/withWrapper";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import Button from "components/Button";
import Input from "components/Input";
import { useForm } from "customHooks/useForm";

const AddCustomers = () => {
    const [fields, handleFieldChange] = useForm({
        name: "",
        phone: "",
        email: "",
        date: new Date(),
    });
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addCustomer = useCallback(() => {
        // Adding to local storage
        if (localStorage.getItem("customer_data") == null) {
            localStorage.setItem("customer_data", "[]");
        }
        let customerData = [];
        try {
            customerData = JSON.parse(localStorage.getItem("customer_data"));
            customerData.push(fields);
            localStorage.setItem("customer_data", JSON.stringify(customerData));
            triggerNotification("Customer added successfully", {
                type: "success",
            });
            history.push("/");
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <Fragment>
            <Navbar opened="customers" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        <FormattedMessage id="title.customer"></FormattedMessage>
                    </span>
                </div>
                <div className="card p-5 mx-5">
                    <form onSubmit={addCustomer}>
                        <div className="row py-5" style={{ maxWidth: "800px" }}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.name"></FormattedMessage>
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
                                    <FormattedMessage id="customer.phone"></FormattedMessage>
                                </label>
                                <Input
                                    type="text"
                                    name="phone"
                                    required
                                    pattern="[+0-9]{10,13}"
                                    onInvalid="this.setCustomValidity('Enter at least 10 characters. Use only numbers')"
                                    onInput="this.setCustomValidity('')"
                                    value={fields.phone}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.email"></FormattedMessage>
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
                                <Button type="submit" icon="save">
                                    <FormattedMessage id="customer.save.button"></FormattedMessage>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(AddCustomers);
