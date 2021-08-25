import React, { Component } from "react";
import PropTypes from "prop-types";
import { refreshPage } from "utils/helper";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, info) {
        console.log(error);
        console.log(info);
    }

    render() {
        // Fallback UI Code
        if (this.state.hasError) {
            return (
                <div className="my-5 center center-content">
                    <h1>Something Went Wrong</h1>
                    <br />
                    <button className="btn btn-primary" onClick={refreshPage}>
                        {" "}
                        Reload Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
};

export default ErrorBoundary;
