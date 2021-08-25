import React, { Component } from "react";
import PropTypes from "prop-types";

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
            return <h1>Something Went Wrong</h1>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.any,
};

export default ErrorBoundary;
