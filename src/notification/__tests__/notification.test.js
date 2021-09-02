import { useNotification, NotificationProvider } from "notification";
import { render, screen, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { mockContext } from "setupTests";

const App = () => {
    const { triggerNotification } = useNotification();

    return <button data-testid="notify-button" onClick={triggerNotification} />;
};
describe("notification", () => {
    it("notification module test", () => {
        // const mock = jest.fn((triggerNotification) => triggerNotification);
        const { getByTestId, debug } = render(mockContext(<App></App>));
        debug();
        // fireEvent.click(screen.getByTestId("notify-button"));
        // expect(mock).toHaveBeenCalledTimes(0);
        // expect(getByTestId("notify-toast")).toBeInTheDocument();
    });
});
