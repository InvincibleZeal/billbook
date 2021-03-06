import React from "react";
import Proptypes from "prop-types";

function Button({ type = "button", className, children, icon, ...rest }) {
    return (
        <button type={type} className={`btn ${className || ""}`} {...rest}>
            {icon && (
                <i data-testid="button-icon" className={`fa fa-${icon}`}></i>
            )}
            &nbsp;
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
