import React from "react";
import ReactDOM from "react-dom";
import "styles/toast.css";

const Toast = (props) => {
    const ROOT_ID = "notification-root";
    const root = document.createElement("div");
    root.setAttribute("id", ROOT_ID);

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
        document.getElementById(ROOT_ID) || root
    );
};

export default Toast;
