import React from "react";
import Proptypes from "prop-types";

function Button({ type = "button", className, children, icon, ...rest }) {
    return (
        <button
            data-testID="button"
            type={type}
            className={`btn ${className}`}
            {...rest}
        >
            {icon && <i className={`fa fa-${icon}`}></i>}&nbsp;
            {children}
        </button>
    );
}

Button.propTypes = {
    children: Proptypes.any,
    type: Proptypes.string,
    icon: Proptypes.string,
    className: Proptypes.string,
};

export default Button;
