import React, { useState } from "react";
import PropTypes from "prop-types";
import Toast from "./Toast";
export const NotificationContext = React.createContext();

const createToast = (msg, options) => {
    const id = Math.floor(Math.random() * 101 + 1);
    const toast = {};
    toast.id = id;
    toast.title = msg;
    toast.type = options.type || "simple";
    toast.time = options.time || 3000;
    return toast;
};

export const NotificationProvider = (props) => {
    const [notifications, setNotification] = useState([]);
    const [position, setPosition] = useState("bottom-right");

    const addNotification = (msg, options = {}) => {
        console.log(notifications.length);
        const toast = createToast(msg, options);
        const updated = [...notifications, toast];
        setNotification((currentNotification) => [
            ...currentNotification,
            toast,
        ]);
        console.log(updated);
        setTimeout(function () {
            setNotification((currentNotification) =>
                currentNotification.filter((x) => x.id !== toast.id)
            );
        }, toast.time);
    };

    const clearNotification = (toast) => {
        setNotification(notifications.filter((x) => x.id !== toast.id));
    };
    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotification,
                addNotification,
                clearNotification,
                position,
                setPosition,
            }}
        >
            <Toast notifications={notifications} position={position}></Toast>
            {props.children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
