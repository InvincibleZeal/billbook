import React, { Fragment, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";
import { razorpay } from "api";
import { itemDetails, ItemDetailsSchema } from "pages/Inventory/FormDetails";

const AddItem = () => {
    // State Variables
    const { fields, handleFieldChange, validate, errors } = useForm(
        itemDetails,
        ItemDetailsSchema
    );
    const [loading, setLoading] = useState(false);

    // Imports for link and notification
    const history = useHistory();
    const { triggerNotification } = useNotification();

    // API called here to add items to db
    const addItem = useCallback(
        async (event) => {
            event.preventDefault();
            if (validate()) {
                setLoading(true);
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
                        <FormattedMessage id="title.items" />
                    </span>
                </div>
                <div className="card px-5 mx-5" style={{ maxWidth: "400px" }}>
                    <div className="py-5">
                        <form onSubmit={addItem}>
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
                                    <FormattedMessage id="item.price" />
                                </label>
                                <input
                                    type="text"
                                    name="amount"
                                    required
                                    value={fields.amount}
                                    onChange={handleFieldChange}
                                />
                                {errors?.amount && (
                                    <span className="text-error mt-2">
                                        {errors.amount || ""}
                                    </span>
                                )}
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
                                {errors?.description && (
                                    <span className="text-error mt-2">
                                        {errors.name || ""}
                                    </span>
                                )}
                            </div>
                            <div className="form-group m-5 justify-content-center">
                                <button
                                    className="btn"
                                    type="submit"
                                    disabled={loading}
                                >
                                    <i className="fa fa-save"></i> &nbsp;
                                    <FormattedMessage id="item.saveButton" />
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
