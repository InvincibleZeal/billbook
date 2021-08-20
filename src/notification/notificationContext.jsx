import React, { useState } from "react";
import PropTypes from "prop-types";
import Toast from "./Toast";
export const NotificationContext = React.createContext();

export const NotificationProvider = (props) => {
    const [notifications, setNotification] = useState([]);
    const [position, setPosition] = useState("bottom-right");

    return (
        <NotificationContext.Provider
            value={{ notifications, setNotification, position, setPosition }}
        >
            <Toast notifications={notifications} position={position}></Toast>
            {props.children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
