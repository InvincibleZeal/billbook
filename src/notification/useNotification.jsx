import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

export default function useNotification() {
    const { triggerNotification, clearNotification } =
        useContext(NotificationContext);
    return { triggerNotification, clearNotification };
}
