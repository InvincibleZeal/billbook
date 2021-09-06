import React from "react";
import { NotificationProvider } from "notification";
import Wrapper from "i18n/wrapper";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "redux/store";

export const mockContext = (children) => {
    return (
        <Provider store={store}>
            <NotificationProvider>
                <Wrapper>
                    <BrowserRouter>
                        <div id="notification-root"></div>
                        {children}
                    </BrowserRouter>
                </Wrapper>
            </NotificationProvider>
        </Provider>
    );
};

const reactDom = jest.createMockFromModule("react-dom");
function mockCreatePortal(element, target) {
    return element;
}
reactDom.createPortal = mockCreatePortal;
