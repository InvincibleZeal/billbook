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
    onclick: Proptypes.func,
    children: Proptypes.any,
    className: Proptypes.string,
    type: Proptypes.string,
    icon: Proptypes.string,
    label: Proptypes.string,
};

export default Button;
