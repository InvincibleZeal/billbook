import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Navbar = ({ opened }) => {
    return (
        <Fragment>
            {/* Sidebar */}
            <nav className="sidebar">
                <ul className="sidebar-items">
                    <Link to="/">
                        <li
                            className={`p-5 py-3  ${
                                opened === "customers" && "sidebar-item-opened"
                            } `}
                        >
                            <i className="fa fa-user"></i>{" "}
                            <FormattedMessage id="title.customer"></FormattedMessage>
                        </li>
                    </Link>
                    <Link to="/inventory">
                        <li
                            className={`p-5 py-3 ${
                                opened === "inventory" && "sidebar-item-opened"
                            }`}
                        >
                            <i className="fa fa-star"></i>{" "}
                            <FormattedMessage id="title.items"></FormattedMessage>
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li
                            className={`p-5 py-3 ${
                                opened === "invoice" && "sidebar-item-opened"
                            }`}
                        >
                            <i className="fa fa-clipboard"></i>{" "}
                            <FormattedMessage id="title.invoice"></FormattedMessage>
                        </li>
                    </Link>
                </ul>
            </nav>
            {/* Bottom Bar */}
            <nav className="bottom-bar">
                <ul>
                    <Link to="/">
                        <li
                            className={`p-5 py-3 ${
                                opened === "customers" && "selected"
                            }`}
                        >
                            <i className="fa fa-user"></i>
                        </li>
                    </Link>
                    <Link to="/inventory">
                        <li
                            className={`p-5 py-3 ${
                                opened === "inventory" && "selected"
                            }`}
                        >
                            <i className="fa fa-star"></i>
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li
                            className={`p-5 py-3 ${
                                opened === "invoice" && "selected"
                            }`}
                        >
                            <i className="fa fa-clipboard"></i>
                        </li>
                    </Link>
                </ul>
            </nav>
        </Fragment>
    );
};

Navbar.propTypes = {
    opened: PropTypes.string.isRequired,
};

export default Navbar;
