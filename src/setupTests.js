import React from "react";
import { NotificationProvider } from "notification";
import Wrapper from "i18n/wrapper";
import { BrowserRouter } from "react-router-dom";

export const mockContext = (children) => {
    return (
        <NotificationProvider>
            <Wrapper>
                <BrowserRouter>
                    <div id="notification-root"></div>
                    {children}
                </BrowserRouter>
            </Wrapper>
        </NotificationProvider>
    );
};

const reactDom = jest.createMockFromModule("react-dom");
function mockCreatePortal(element, target) {
    return element;
}
reactDom.createPortal = mockCreatePortal;
