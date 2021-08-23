import React, { Fragment, useState } from "react";
import Navbar from "common/Navbar";
import { useHistory } from "react-router-dom";
import withWrapper from "common/withWrapper";
import "styles/add-customer.css";
import { FormattedMessage } from "react-intl";
const AddCustomers = () => {
    const [data, setData] = useState({
        name: "",
        phone: "",
        email: "",
        date: new Date(),
    });
    const history = useHistory();
    const AddCustomer = (e) => {
        e.preventDefault();
        // Adding to local storage
        if (localStorage.getItem("customer_data") == null) {
            localStorage.setItem("customer_data", "[]");
        }
        const customerData = JSON.parse(localStorage.getItem("customer_data"));
        customerData.push(data);
        localStorage.setItem("customer_data", JSON.stringify(customerData));
        history.push("/");
    };
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
                    <form onSubmit={(e) => AddCustomer(e)}>
                        <div className="row py-5" style={{ maxWidth: "800px" }}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.name"></FormattedMessage>
                                </label>
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
                                    <FormattedMessage id="customer.phone"></FormattedMessage>
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    pattern="[+0-9]{10,13}"
                                    onInvalid="this.setCustomValidity('Enter atleast 10 characters. Use only numbers')"
                                    onInput="this.setCustomValidity('')"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    <FormattedMessage id="customer.email"></FormattedMessage>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div
                                className="form-group mx-5 my-3"
                                style={{ justifyContent: "center" }}
                            >
                                <button className="btn" type="submit">
                                    <i className="fa fa-save"></i> &nbsp;
                                    <FormattedMessage id="customer.saveButton"></FormattedMessage>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(AddCustomers);
