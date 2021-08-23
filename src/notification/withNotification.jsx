import React, { useContext } from "react";
import { NotificationContext } from "notification";

/**
 * HOC for notifications
 * exposes `triggerNotification` and `clearNotification`
 * @param {*} Child
 * @returns `Child` with `triggerNotification` and `clearNotification` props
 * @example
 *
 * import { withNotification } from "notification";
 * const MyComponent = (props) => {
 *      const { triggerNotification } = props;
 *
 *      return <div>Component with notifications</div>;
 * }
 * export default withNotification(MyComponent);
 */
const withNotification = (Child) => {
    const CustomComponent = (props) => {
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
    return CustomComponent;
};
export default withNotification;
