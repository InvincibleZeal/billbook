import React, { Fragment, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import { razorpay } from "api";
import Spinner from "components/Spinner";

const AddItem = () => {
    const [fields, handleFieldChange] = useForm({
        name: "",
        amount: "",
        description: "",
        currency: "INR",
    });
    const [saving, setSaving] = useState(false);
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addItem = useCallback(
        async (e) => {
            // Adding to local storage
            e.preventDefault();
            setSaving(true);
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
            setSaving(false);
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
                                <input
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
                                <input
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
                                <textarea
                                    rows="4"
                                    name="description"
                                    required={true}
                                    value={fields.description}
                                    onChange={handleFieldChange}
                                ></textarea>
                            </div>
                            <div className="form-group m-5 justify-content-center">
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={saving}
                                >
                                    <i className="fa fa-save"></i> &nbsp;{" "}
                                    <FormattedMessage id="item.saveButton" />
                                    <Spinner
                                        loading={saving}
                                        size={12}
                                        className="px-1"
                                        width="30px"
                                    ></Spinner>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default AddItem;
