import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

/**
 * Custom Hook for notifications
 * @returns {object} `triggerNotification` and `clearNotification` methods
 * @typedef {Function}
 * @method triggerNotification Triggers a notification with custom types - `simple` | `success` | `error` | `warning` default `simple`
 * @method clearNotification
 * @example
 * import { useNotification } from "notification";
 * const { triggerNotification, clearNotification } = useNotification();
 *
 * const toast = triggerNotification("Some error occurred", {
 *      type: "error", // default "simple"
 *      time: 5000 // default 3000
 * })
 * clearNotification(toast); // clears notification regardless of the timeout duration
 */
export default function useNotification() {
    const { triggerNotification, clearNotification } =
        useContext(NotificationContext);
    return { triggerNotification, clearNotification };
}
