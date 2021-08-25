import React from "react";
import Proptypes from "prop-types";
import "./card.css";
function Card({ children, className, ...rest }) {
    return (
        <div className={` card-default ${className}`} {...rest}>
            {children}
        </div>
    );
}

Card.propTypes = {
    children: Proptypes.any,
    className: Proptypes.string,
};
export default Card;
