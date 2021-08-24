import React from "react";
import Proptypes from "prop-types";
import "./card.css";
function Card(props) {
    const { children, className } = props;

    return <div className={` card-default ${className}`}>{children}</div>;
}

Card.propTypes = {
    children: Proptypes.any,
    className: Proptypes.string,
};
export default Card;
