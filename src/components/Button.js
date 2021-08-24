import React from "react";
import Proptypes from "prop-types";

function Button(props) {
    const { children, icon, ...rest } = props;

    return (
        <button {...rest}>
            {icon && <i className={icon}></i>}&nbsp;
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
