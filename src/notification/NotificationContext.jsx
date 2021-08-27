import React, { useState } from "react";
import PropTypes from "prop-types";
import Toast from "./Toast";
export const NotificationContext = React.createContext();

const ToastType = {
    SIMPLE: "simple",
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
};

const createToast = (msg, options) => {
    const id = Math.floor(Math.random() * 101 + 1);
    const toast = {};
    toast.id = id;
    toast.title = msg;
    toast.type = Object.values(ToastType).includes(options.type)
        ? options.type
        : ToastType.SIMPLE;
    toast.time = options.time || 3000;
    return toast;
};

export const NotificationProvider = (props) => {
    const [notifications, setNotification] = useState([]);
    const [position, setPosition] = useState("bottom-right");

    const triggerNotification = (msg, options = {}) => {
        const toast = createToast(msg, options);
        // eslint-disable-next-line no-unused-vars
        const updated = [...notifications, toast];
        setNotification((currentNotification) => [
            ...currentNotification,
            toast,
        ]);
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
                triggerNotification,
                clearNotification,
                position,
                setPosition,
            }}
        >
            <Toast
                notifications={notifications}
                position={position}
                clearNotification={clearNotification}
            ></Toast>
            {props.children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
