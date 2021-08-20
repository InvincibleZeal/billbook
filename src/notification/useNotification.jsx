import { useContext } from "react";
import { NotificationContext } from "./notificationContext";

const createToast = (props) => {
    const id = Math.floor(Math.random() * 101 + 1);
    let toast = {};
    switch (props.type) {
        case "success":
            toast = {
                backgroundColor: "#a8f1c6",
                borderColor: "#1b8145",
            };
            break;
        case "danger":
            toast = {
                backgroundColor: "#f6a6a3",
                borderColor: "#8f110e",
            };
            break;
        case "warning":
            toast = {
                backgroundColor: "#ffd38a",
                borderColor: "#885603",
            };
            break;
        case "simple":
        default:
            toast = {
                backgroundColor: "#ebebeb",
                borderColor: "#6c6c6c",
            };
    }

    toast.id = id;
    toast.title = props.title;
    return toast;
};

export function useNotification() {
    const { notifications, setNotification } = useContext(NotificationContext);

    const triggerNotification = function (props) {
        const toast = createToast(props);
        console.log(toast);
        const updatedNotifications = [...notifications, toast];
        console.log(updatedNotifications);
        setNotification(updatedNotifications);
        setTimeout(function () {
            setNotification(notifications.filter((x) => x.id !== toast.id));
        }, props.time);
    };
    const clearNotification = function (toast) {
        setNotification(notifications.filter((x) => x.id !== toast.id));
    };
    return { triggerNotification, clearNotification };
}
