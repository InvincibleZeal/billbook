// import "@testing-library/jest-dom";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Button from "components/Button";

// describe("Button", () => {
//     it("should render without errors", () => {
//         render(<Button></Button>);
//     });

//     it("should not be an empty DOM element", () => {
//         const { container } = render(<Button></Button>);
//         expect(container).not.toBeNull();
//     });

//     it("should contain a button element", () => {
//         render(<Button></Button>);
//         expect(screen.queryByRole("button")).not.toBeNull();
//         expect(screen.getByRole("button")).toBeInTheDocument();
//     });

//     it("should render child text", () => {
//         const text = "Click me";
//         render(<Button>{text}</Button>);
//         expect(screen.getByRole("button")).toHaveTextContent(text);
//     });

//     it.skip("should contain 'btn' class", () => {
//         render(<Button></Button>);
//         expect(screen.getByRole("button")).not.toHaveClass("undefined");
//         expect(screen.getByRole("button")).toHaveClass("btn");
//     });

//     it("should have correct type attribute", () => {
//         const type = "button";
//         render(<Button type="button"></Button>);
//         expect(screen.getByRole("button")).toHaveAttribute("type", type);
//     });

//     it("should have correct type attribute", () => {
//         const type = "submit";
//         render(<Button type="submit"></Button>);
//         expect(screen.getByRole("button")).toHaveAttribute("type", type);
//     });
// });