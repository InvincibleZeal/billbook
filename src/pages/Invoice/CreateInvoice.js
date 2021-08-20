import React, { Fragment } from "react";
import withWrapper from "../../common/withWrapper";
import Navbar from "../../common/Navbar";
import "../../styles/add-invoice.css";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const CreateInvoice = () => {
    return (
        <Fragment>
            <Navbar opened="invoice" />
            <div className="page-content p-5 bg-primary">
                <form action="">
                    <div className="page-heading-wrapper mb-5 p-5">
                        <span className="title">
                            {" "}
                            <FormattedMessage id="title.invoice"></FormattedMessage>{" "}
                        </span>
                        <Link to="/invoice">
                            <button className="btn" type="submit">
                                <i className="fa fa-save"></i> &nbsp;{" "}
                                <FormattedMessage id="invoice.save.button"></FormattedMessage>{" "}
                            </button>
                        </Link>
                    </div>
                    <div className="d-flex py-5 flex-grow align-items-start">
                        <div className="card-bordered p-3 mx-5">
                            <h4 className="billto text-muted m-0 mb-3">
                                <FormattedMessage id="invoice.bill.to"></FormattedMessage>{" "}
                            </h4>
                            <div className="d-flex justify-content-between">
                                <div className="billing_details pr-3">
                                    <div>Buck Miller</div>
                                    <div>81998492023</div>
                                    <div>buck@miller.com</div>
                                </div>
                                <div className="btn-link">
                                    {" "}
                                    <FormattedMessage id="invoice.change"></FormattedMessage>{" "}
                                </div>
                            </div>
                        </div>
                        <div className="invoice_details mx-5">
                            <div className="d-flex flex-grow mb-5">
                                <div className="input-group px-2">
                                    <label htmlFor="issueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.issued.at"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-calendar-o"></i>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="issueDate"
                                        required
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="dueDate">
                                        {" "}
                                        <FormattedMessage id="invoice.due.date"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-calendar-o"></i>
                                    <input
                                        className="input-sm"
                                        type="date"
                                        name="dueDate"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="d-flex flex-grow">
                                <div className="input-group px-2">
                                    <label htmlFor="invoiceNumber">
                                        <FormattedMessage id="invoice.number"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="number"
                                        name="invoiceNumber"
                                        required
                                    />
                                </div>
                                <div className="input-group px-2">
                                    <label htmlFor="referenceNumber">
                                        <FormattedMessage id="invoice.reference.number"></FormattedMessage>{" "}
                                    </label>
                                    <i className="fa fa-hashtag"></i>
                                    <input
                                        className="input-sm"
                                        type="number"
                                        name="referenceNumber"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="invoice_items py-5 mx-5">
                        <table className="table-bordered">
                            <thead>
                                <tr>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="title.items"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.quantity"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="item.price"></FormattedMessage>{" "}
                                    </th>
                                    <th>
                                        {" "}
                                        <FormattedMessage id="invoice.amount"></FormattedMessage>{" "}
                                    </th>
                                    <th className="table-action"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {" "}
                                        <FormattedMessage id="invoice.model"></FormattedMessage>{" "}
                                        5
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="itemQuantity"
                                            required
                                            oninvalid="this.setCustomValidity('Only numerical values allowed')"
                                            onInput="this.setCustomValidity('')"
                                        />
                                    </td>
                                    <td>₹350</td>
                                    <td>₹700</td>
                                    <td className="table-action">
                                        <a href="#" className="btn-link">
                                            <i
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {" "}
                                        <FormattedMessage id="invoice.model"></FormattedMessage>{" "}
                                        5
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="itemQuantity"
                                            required
                                            oninvalid="this.setCustomValidity('Only numerical values allowed')"
                                            onInput="this.setCustomValidity('')"
                                        />
                                    </td>
                                    <td>₹350</td>
                                    <td>₹700</td>
                                    <td className="table-action">
                                        <a href="#" className="btn-link">
                                            <i
                                                className="fa fa-trash"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className=" invoice_additem d-flex align-items-center justify-content-center ">
                            <Link className="btn-link p-4" to="/inventory/add">
                                <i className="fa fa-shopping-basket mr-2"> </i>
                                <FormattedMessage id="invoice.add.on.item"></FormattedMessage>{" "}
                            </Link>
                        </div>
                    </div>

                    <div className="d-flex flex-grow py-5">
                        <div className="invoice_note mx-5">
                            <div className="input-group">
                                <label htmlFor="notes">
                                    {" "}
                                    <FormattedMessage id="invoice.notes"></FormattedMessage>{" "}
                                </label>
                                <textarea
                                    className="input-sm invoice-notes"
                                    name="notes"
                                ></textarea>
                            </div>
                        </div>
                        <div className="summary mx-5">
                            <div className="card-bordered p-3">
                                <div className="summary_items pb-4">
                                    <div className="summary_item">
                                        <div className="summary_name">
                                            <FormattedMessage id="invoice.model"></FormattedMessage>{" "}
                                            5
                                        </div>
                                        <div className="summary_quantity">
                                            x2
                                        </div>
                                        <div className="summary_ammount">
                                            ₹700
                                        </div>
                                    </div>
                                    <div className="summary_item">
                                        <div className="summary_name">
                                            <FormattedMessage id="invoice.model"></FormattedMessage>{" "}
                                            3
                                        </div>
                                        <div className="summary_quantity">
                                            x1
                                        </div>
                                        <div className="summary_ammount">
                                            ₹800
                                        </div>
                                    </div>
                                </div>
                                <div className="summary_total d-flex mt-2">
                                    <div>
                                        {" "}
                                        <FormattedMessage id="invoice.total.amount"></FormattedMessage>{" "}
                                        :
                                    </div>
                                    <div className="primary">₹1500</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default withWrapper(CreateInvoice);
