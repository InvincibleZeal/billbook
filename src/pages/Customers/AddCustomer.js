import React, { Fragment } from "react";
import Navbar from "common/Navbar";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import withWrapper from "common/withWrapper";
import "styles/add-customer.css";

const AddCustomers = () => {
    return (
        <Fragment>
            <Navbar opened="customers" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title">
                        <FormattedMessage id="title.customer"></FormattedMessage>
                    </span>
                </div>
                <div className="card p-5 m  x-5">
                    <form action="">
                        <div className="row py-5" style={{ maxWidth: "800px" }}>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="customer.name"></FormattedMessage>
                                </label>
                                <input type="text" name="name" required />
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
                                    oninvalid="this.setCustomValidity('Enter atleast 10 characters. Use only numbers')"
                                    onInput="this.setCustomValidity('')"
                                />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">
                                    {" "}
                                    <FormattedMessage id="customer.email"></FormattedMessage>
                                </label>
                                <input type="email" name="email" required />
                            </div>
                            <div
                                className="form-group mx-5 my-3"
                                style={{ justifyContent: "center" }}
                            >
                                <Link to="/">
                                    <button className="btn" type="submit">
                                        <i className="fa fa-save"></i> &nbsp;
                                        <FormattedMessage id="customer.save.button"></FormattedMessage>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(AddCustomers);
