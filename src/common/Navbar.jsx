import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
                            <i className="fa fa-user"></i>Customers
                        </li>
                    </Link>
                    <Link to="/inventory">
                        <li className="p-5 py-3">
                            <i className="fa fa-star"></i>Items
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li className="p-5 py-3">
                            <i className="fa fa-clipboard"></i>Invoices
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
                        <li className="p-5 py-3">
                            <i className="fa fa-star"></i>
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li className="p-5 py-3">
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
