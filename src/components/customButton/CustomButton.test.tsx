import { CustomButton } from "."
import '@testing-library/jest-dom';
import { screen } from "@testing-library/react";
import { AuthContext } from "../../hooks/useAuth";
import { render } from "../../utils/testUtils";

describe("Custom Button", () => {
    it("Should renders correctly", () => {
        render(<CustomButton title="test" variation="2" />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })

    it("Should be render with title 'test'", () => {
        render(<CustomButton title="test" variation="3" />);
        const button = screen.getByRole("button");
        expect(button.textContent).toBe("test");
    })

    it("Should be render icon 1", () => {
        render(<CustomButton title="test" icon={0} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        const icon = screen.getByTestId("icon1");
        expect(icon).toBeInTheDocument();
    })

    it("Should be render icon 2", () => {
        render(<CustomButton title="test" icon={1} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        const icon = screen.getByTestId("icon2");
        expect(icon).toBeInTheDocument();
    })
})