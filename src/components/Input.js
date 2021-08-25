import React from "react";
import Proptypes from "prop-types";

function Input({ size = "md", className, icon, type, ...rest }) {
    const Inputelement =
        type === "textarea" ? (
            <textarea
                className={`${size} === "ßmd" ? "input-md" : "input-sm" ${className}`}
                {...rest}
            />
        ) : (
            <input
                className={`${
                    size === "md" ? "input-md" : "input-sm"
                } ${className}`}
                type={type}
                {...rest}
            />
        );

    return (
        <>
            {icon && <i className={`fa fa-${icon}`}></i>}
            {Inputelement}
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
