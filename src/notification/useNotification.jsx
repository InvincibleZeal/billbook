import { useContext } from "react";
import { NotificationContext } from "./NotifcationContext";

export function useNotification() {
    const { addNotification, clearNotification } =
        useContext(NotificationContext);
    return { triggerNotification: addNotification, clearNotification };
}
