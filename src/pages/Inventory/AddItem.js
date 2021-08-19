import React, { Fragment } from "react";
import Wrapper from "../../common/Wrapper";
import Navbar from "../../common/Navbar";
import { Link } from "react-router-dom";

const AddItem = () => {
    return (
        <Fragment>
            <Navbar opened="inventory" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper mb-5 p-5">
                    <span className="title"> New Item </span>
                </div>
                <div className="card px-5 mx-5" style={{ maxWidth: "400px" }}>
                    <div className="py-5">
                        <form action="">
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">Name</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group mx-5 my-3">
                                <label className="mb-3">Price</label>
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
                                <label className="mb-3">Description</label>
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
                                        <i className="fa fa-save"></i> &nbsp;
                                        Save Item
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

export default Wrapper(AddItem);
