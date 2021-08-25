import React from "react";
import Proptypes from "prop-types";
import "./card.css";
function Card(props) {
    const { children, className, ...rest } = props;

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
