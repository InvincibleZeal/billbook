import React from "react";
import { NotificationProvider } from "notification";
import Wrapper from "i18n/wrapper";

export const mockContext = (children) => {
    return (
        <NotificationProvider>
            <Wrapper>
                <div id="notification-root"></div>
                {children}
            </Wrapper>
        </NotificationProvider>
    );
};

const reactDom = jest.createMockFromModule("react-dom");
function mockCreatePortal(element, target) {
    return element;
}
reactDom.createPortal = mockCreatePortal;
