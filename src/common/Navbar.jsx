import React, { Fragment, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { context } from "i18n/wrapper";

const Navbar = () => {
    const Context = useContext(context);
    const location = useLocation();
    const opened = location.pathname;
    return (
        <Fragment>
            {/* Sidebar */}
            <nav className="sidebar">
                <ul className="sidebar-items">
                    <Link to="/">
                        <li
                            className={`p-5 py-3  ${
                                opened.includes("customers") &&
                                "sidebar-item-opened"
                            } `}
                        >
                            <i className="fa fa-user"></i>{" "}
                            <FormattedMessage id="title.customer"></FormattedMessage>
                        </li>
                    </Link>
                    <Link to="/inventory">
                        <li
                            className={`p-5 py-3 ${
                                opened.includes("inventory") &&
                                "sidebar-item-opened"
                            }`}
                        >
                            <i className="fa fa-star"></i>{" "}
                            <FormattedMessage id="title.items"></FormattedMessage>
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li
                            className={`p-5 py-3 ${
                                opened.includes("invoice") &&
                                "sidebar-item-opened"
                            }`}
                        >
                            <i className="fa fa-clipboard"></i>{" "}
                            <FormattedMessage id="title.invoice"></FormattedMessage>
                        </li>
                    </Link>
                </ul>
                <select
                    defaultValue={{
                        label: "Select Language",
                        value: Context.locale,
                    }}
                    className="select-language m-2 p-2"
                    onChange={(e) => Context.selectLang(e)}
                >
                    <option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿 &nbsp; ENGLISH</option>
                    <option value="es"> 🇪🇸 &nbsp; SPANISH</option>
                </select>
            </nav>
            {/* Bottom Bar */}
            <nav className="bottom-bar">
                <ul>
                    <Link to="/">
                        <li
                            className={`p-5 py-3 ${
                                opened.includes("customers") && "selected"
                            }`}
                        >
                            <i className="fa fa-user"></i>
                        </li>
                    </Link>
                    <Link to="/inventory">
                        <li
                            className={`p-5 py-3 ${
                                opened.includes("inventory") && "selected"
                            }`}
                        >
                            <i className="fa fa-star"></i>
                        </li>
                    </Link>
                    <Link to="/invoice">
                        <li
                            className={`p-5 py-3 ${
                                opened.includes("invoice") && "selected"
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

export default Navbar;
