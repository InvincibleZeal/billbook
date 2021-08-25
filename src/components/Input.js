import React from "react";
import Proptypes from "prop-types";

function Input({ size = "md", icon, type, ...rest }) {
    const Inputelement =
        type === "textarea" ? (
            <textarea
                className={size === "md" ? "input-md" : "input-sm"}
                {...rest}
            />
        ) : (
            <input
                className={size === "md" ? "input-md" : "input-sm"}
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
};
export default Input;
