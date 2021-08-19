import React, { Fragment } from "react";
import withWrapper from "../../common/withWrapper";
import Navbar from "../../common/Navbar";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const AddItem = () => {
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
                        <form action="">
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
                                    <FormattedMessage id="item.price"></FormattedMessage>
                                </label>
                                <input
                                    type="text"
                                    name="price"
                                    pattern="[0-9]"
                                    required
                                    oninvalid="this.setCustomValidity('Only numerical values allowed')"
                                    onInput="this.setCustomValidity('')"
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
                                ></textarea>
                            </div>
                            <div
                                className="form-group m-5"
                                style={{ justifyContent: "center" }}
                            >
                                <Link to="/inventory">
                                    <button className="btn" type="submit">
                                        <i className="fa fa-save"></i> &nbsp;{" "}
                                        <FormattedMessage id="item.save.button"></FormattedMessage>
                                    </button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(AddItem);
