import React, { Fragment, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import Button from "components/Button";
import Input from "components/Input";
import { razorpay } from "api";

const AddItem = () => {
    const [fields, handleFieldChange] = useForm({
        name: "",
        amount: "",
        description: "",
        currency: "INR",
    });
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addItem = useCallback(
        async (e) => {
            // Adding to local storage
            e.preventDefault();
            const { error, response } = await razorpay.createItem(fields);

            if (error || response.error) {
                triggerNotification(
                    error ? error.message : "Something went wrong",
                    { type: "error" }
                );
            } else {
                console.log(response);
                triggerNotification("Item added successfully", {
                    type: "success",
                });
                history.push("/inventory");
            }
        },
        [fields]
    );

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items" />
                    </span>
                </div>
                <div className="card px-5 mx-5" style={{ maxWidth: "400px" }}>
                    <div className="py-5">
                        <form onSubmit={addItem}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
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
                                    <FormattedMessage id="item.price" />
                                </label>
                                <Input
                                    type="text"
                                    name="amount"
                                    required
                                    onInvalid="this.setCustomValidity('Only numerical values allowed')"
                                    onInput="this.setCustomValidity('')"
                                    value={fields.amount}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="item.description" />
                                </label>
                                <Input
                                    rows="4"
                                    type="textarea"
                                    name="description"
                                    required={true}
                                    value={fields.description}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-group m-5 justify-content-center">
                                <Button icon="save" type="submit">
                                    <FormattedMessage id="item.saveButton" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddItem;
