import React from "react";
import ReactDOM from "react-dom";
import "styles/toast.css";

const Toast = (props) => {
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
                            <button
                                onClick={() => props.clearNotification(toast)}
                            >
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
