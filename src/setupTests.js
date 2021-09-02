import React from "react";
import { NotificationProvider } from "notification";
import Wrapper from "i18n/wrapper";
import { Provider } from "react-redux";
import store from "redux/store";
export const mockContext = (children) => {
    return (
        <NotificationProvider>
            <Provider store={store}>
                <Wrapper>
                    <div id="notification-root"></div>
                    {children}
                </Wrapper>
            </Provider>
        </NotificationProvider>
    );
};

const reactDom = jest.createMockFromModule("react-dom");
function mockCreatePortal(element, target) {
    return element;
}
reactDom.createPortal = mockCreatePortal;
