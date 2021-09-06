import React from "react";
import Proptypes from "prop-types";

function Input({ size = "md", className, icon, type, ...rest }) {
    let inputClass;
    switch (size) {
        case "sm":
            inputClass = `input-sm`;
            break;
        case "md":
        default:
            inputClass = `input-md`;
            break;
    }
    className = inputClass + className;
    const inputElement =
        type === "textarea" ? (
            <textarea className={inputClass} {...rest} />
        ) : (
            <input className={inputClass} type={type} {...rest} />
        );

    return (
        <>
            {icon && <i className={`fa fa-${icon}`}></i>}
            {inputElement}
        </>
    );
}
Input.propTypes = {
    children: Proptypes.any,
    type: Proptypes.string,
    icon: Proptypes.string,
    size: Proptypes.string,
    className: Proptypes.string,
};
export default Input;
