import React, { Fragment } from "react";
import withWrapper from "../../common/withWrapper";
import Navbar from "../../common/Navbar";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const ListItems = () => {
    return (
        <Fragment>
            <Navbar opened="inventory" />
            <div className="page-content p-5 bg-primary">
                <div className="page-heading-wrapper p-5 mb-5">
                    <span className="title">
                        {" "}
                        <FormattedMessage id="title.items"></FormattedMessage>{" "}
                    </span>
                    <Link to="/inventory/add">
                        <button className="btn">
                            <i className="fa fa-plus"></i> &nbsp;{" "}
                            <FormattedMessage id="item.add.butotn"></FormattedMessage>{" "}
                        </button>
                    </Link>
                </div>
                <div className="scrollable">
                    <table className="table px-5">
                        <colgroup>
                            <col span="1" style={{ width: "20%" }} />
                            <col span="1" style={{ width: "50%" }} />
                            <col span="1" style={{ width: "15%" }} />
                            <col span="1" style={{ width: "15%" }} />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    {" "}
                                    <FormattedMessage id="customer.name"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="item.description"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="item.price"></FormattedMessage>
                                </th>
                                <th>
                                    {" "}
                                    <FormattedMessage id="added.on"></FormattedMessage>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Anissa Beier</td>
                                <td>
                                    Lorem ipsum dolor sit, amet consectetur
                                    adipisicing elit. Tempore, sapiente
                                    praesentium deleniti placeat voluptas
                                    architecto!
                                </td>
                                <td>₹350</td>
                                <td>06 Aug 2020</td>
                            </tr>
                            <tr>
                                <td>Mellie Buckride</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Accusamus, aut!
                                </td>
                                <td>₹800</td>
                                <td>06 Aug 2020</td>
                            </tr>
                            <tr>
                                <td>Ashlee Glover</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur,
                                    adipisicing elit. Iste vel nemo voluptatibus
                                    ut eius rerum doloribus itaque. Sapiente
                                    consequatur iusto autem? Placeat, enim
                                    molestias magni aspernatur aperiam itaque
                                    repellat blanditiis ut qui ipsam temporibus
                                    cumque numquam distinctio illo doloribus
                                    quisquam?
                                </td>
                                <td>₹80</td>
                                <td>06 Aug 2020</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default withWrapper(ListItems);
