import React from "react";

const Wrapper = (Child) => {
    const newComponent = () => {
        return (
            <div className="wrapper">
                <Child />
            </div>
        );
    };
    return newComponent;
};
export default Wrapper;
