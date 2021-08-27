import React from "react";
import PropTypes from "prop-types";

const TYPE = {
    DOUBLE: "double",
    ROLlING: "rolling",
};

const Spinner = (props) => {
    const { loading, size = 75, type = TYPE.ROLLING } = props;
    const newProps = { ...props };
    delete newProps.loading;
    delete newProps.size;
    delete newProps.type;
    let spinner;
    switch (type) {
        case TYPE.DOUBLE:
            spinner = (
                <img
                    height={`${size}px`}
                    width={`${size}px`}
                    alt=""
                    src={
                        process.env.PUBLIC_URL +
                        "/assets/img/spinner-double.svg"
                    }
                />
            );
            break;
        case TYPE.ROLLING:
        default:
            spinner = (
                <img
                    height={`${size}px`}
                    width={`${size}px`}
                    alt=""
                    src={
                        process.env.PUBLIC_URL +
                        "/assets/img/spinner-rolling.svg"
                    }
                    {...newProps}
                />
            );
            break;
    }

    return loading ? spinner : null;
};

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.number,
    type: PropTypes.string,
};

export default Spinner;
