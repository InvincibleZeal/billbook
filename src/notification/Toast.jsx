import React from "react";
import ReactDOM from "react-dom";
import { useNotification } from "./useNotification";

import "styles/toast.css";

const Toast = (props) => {
    const { clearNotification } = useNotification();

    return ReactDOM.createPortal(
        <>
            <div className={`notification-container ${props.position}`}>
                {props.notifications.map((toast, i) => (
                    <div
                        key={i}
                        className={`notification toast ${props.position} toast-${toast.type}`}
                    >
                        <div className="toast-wrapper">
                            <span className="notification-title">
                                {toast.title}
                            </span>
                            <button onClick={() => clearNotification(toast)}>
                                <img
                                    height="25px"
                                    width="25px"
                                    src={
                                        process.env.PUBLIC_URL +
                                        "/assets/img/circle-close.svg"
                                    }
                                />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>,
        document.getElementById("notification-root")
    );
};

export default Toast;
