import React from "react";
import Proptypes from "prop-types";

function Button(props) {
    const { type = "default", children, icon, ...rest } = props;

    return (
        <button type={type} className="btn" {...rest}>
            {icon && <i className={`fa fa-${icon}`}></i>}&nbsp;
            {children}
        </button>
    );
}

Button.propTypes = {
    children: Proptypes.any,
    type: Proptypes.string,
    icon: Proptypes.string,
};

export default Button;
