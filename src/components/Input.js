import React from "react";
import Proptypes from "prop-types";

function Input({ icon, type, ...rest }) {
    const Inputelement =
        type === "textarea" ? (
            <textarea {...rest} />
        ) : (
            <input type={type} {...rest} />
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
};
export default Input;
