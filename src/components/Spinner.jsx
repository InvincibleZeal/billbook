import React from "react";
import PropTypes from "prop-types";

const Spinner = ({ loading, size = 75 }) => {
    return (
        <div className="spinner">
            <img
                height={`${size}px`}
                width={`${size}px`}
                alt=""
                src={process.env.PUBLIC_URL + "/assets/img/spinner.svg"}
            />
        </div>
    );
};

Spinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.number,
};

export default Spinner;
