import React from "react";
import Proptypes from "prop-types";

function Input(props) {
    const { onChange, type, ...rest } = props;

    return type === "textarea" ? (
        <textarea onChange={onChange} {...rest} />
    ) : (
        <input onChange={onChange} {...rest} />
    );
}
Input.propTypes = {
    children: Proptypes.any,
    onChange: Proptypes.func,
    type: Proptypes.string,
};
export default Input;
