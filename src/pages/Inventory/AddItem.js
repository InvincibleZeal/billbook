import React, { Fragment, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";
import { useForm } from "customHooks/useForm";

const AddItem = () => {
    const [fields, handleFieldChange] = useForm({
        name: "",
        price: "",
        description: "",
        date: new Date(),
        id: Math.floor(Math.random() * 101 + 1),
    });
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addItem = useCallback(() => {
        // Adding to local storage
        if (localStorage.getItem("inventory_data") == null) {
            localStorage.setItem("inventory_data", "[]");
        }

        let inventoryData = [];
        try {
            inventoryData = JSON.parse(localStorage.getItem("inventory_data"));
            inventoryData.push(fields);
            localStorage.setItem(
                "inventory_data",
                JSON.stringify(inventoryData)
            );
            triggerNotification("Item added successfully", { type: "success" });
            history.push("/inventory");
        } catch (e) {
            console.error(e);
        }
    }, [fields]);

    return (
        <Fragment>
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items"></FormattedMessage>{" "}
                    </span>
                </div>
                <div className="card px-5 mx-5" style={{ maxWidth: "400px" }}>
                    <div className="py-5">
                        <form onSubmit={addItem}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="customer.name"></FormattedMessage>
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
                                    <FormattedMessage id="item.price"></FormattedMessage>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    required
                                    onInvalid="this.setCustomValidity('Only numerical values allowed')"
                                    onInput="this.setCustomValidity('')"
                                    value={fields.price}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="item.description"></FormattedMessage>
                                </label>
                                <textarea
                                    rows="4"
                                    name="description"
                                    required="true"
                                    value={fields.description}
                                    onChange={handleFieldChange}
                                ></textarea>
                            </div>
                            <div className="form-group m-5 justify-content-center">
                                <button className="btn" type="submit">
                                    <i className="fa fa-save"></i> &nbsp;{" "}
                                    <FormattedMessage id="item.save.button"></FormattedMessage>
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
