import React from "react";
import Proptypes from "prop-types";

function Input(props) {
    const { icon, type, ...rest } = props;
    const ele =
        type === "textarea" ? <textarea {...rest} /> : <input {...rest} />;

    return (
        <>
            {icon && <i className={`fa fa-${icon}`}></i>}
            {ele}
        </>
    );
}
Input.propTypes = {
    children: Proptypes.any,
    type: Proptypes.string,
    icon: Proptypes.string,
};
export default Input;
