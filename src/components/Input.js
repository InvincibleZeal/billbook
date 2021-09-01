import React from "react";
import Proptypes from "prop-types";

function Input({ size = "md", className, icon, type, ...rest }) {
    const inputClass = `${size} === "md" ? "input-md" : "input-sm" ${className}`;

    const Inputelement =
        type === "textarea" ? (
            <textarea data-testid="textarea" className={inputClass} {...rest} />
        ) : (
            <input
                data-testid="textbox"
                className={inputClass}
                type={type}
                {...rest}
            />
        );

    return (
        <>
            {icon && (
                <i
                    data-testid="input-text-icon"
                    className={`fa fa-${icon}`}
                ></i>
            )}
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
