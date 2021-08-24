import React, { Fragment, useState } from "react";
import withWrapper from "common/withWrapper";
import Navbar from "common/Navbar";
import { useHistory } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useNotification } from "notification";

const AddItem = () => {
    const [data, setData] = useState({
        name: "",
        price: "",
        description: "",
        date: new Date(),
        id: Math.floor(Math.random() * 101 + 1),
    });
    const history = useHistory();
    const { triggerNotification } = useNotification();

    const addItem = (e) => {
        e.preventDefault();
        // Adding to local storage
        if (localStorage.getItem("inventory_data") == null) {
            localStorage.setItem("inventory_data", "[]");
        }

        let inventoryData = [];
        try {
            inventoryData = JSON.parse(localStorage.getItem("inventory_data"));
        } catch (e) {}
        inventoryData.push(data);
        localStorage.setItem("inventory_data", JSON.stringify(inventoryData));
        triggerNotification("Item added successfully", { type: "success" });
        history.push("/inventory");
    };

    return (
        <Fragment>
            <Navbar opened="inventory" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items"></FormattedMessage>{" "}
                    </span>
                </div>
                <div className="card px-5 mx-5" style={{ maxWidth: "400px" }}>
                    <div className="py-5">
                        <form onSubmit={(e) => addItem(e)}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="customer.name"></FormattedMessage>
                                </label>
                                <input type="text" name="name" required />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={data.name}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            name: e.target.value,
                                        })
                                    }
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
                                    value={data.price}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            price: e.target.value,
                                        })
                                    }
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
                                    value={data.description}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            description: e.target.value,
                                        })
                                    }
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

export default withWrapper(AddItem);
