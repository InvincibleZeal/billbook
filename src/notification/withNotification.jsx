import React, { useContext } from "react";
import { NotificationContext } from "notification";

const NotificationWrapper = (Child) => {
    const newComponent = (props) => {
        const { triggerNotification, clearNotification } =
            useContext(NotificationContext);
        return (
            <Child
                {...props}
                triggerNotification={triggerNotification}
                clearNotification={clearNotification}
            />
        );
    };
    return newComponent;
};
export default NotificationWrapper;
