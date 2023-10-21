import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { IconInput } from ".";
import { FieldErrors, useForm } from "react-hook-form";

const mockUseForm = renderHook(() => useForm());
describe("Icon input", () => {
    it("Should renders correctly", () => {
        render(<IconInput
            control={mockUseForm.result.current.control}
            fieldName="test"
            type="text"
            placeholder="test"
        />)

        const inputEl = screen.getByPlaceholderText("test")
        expect(inputEl).toBeInTheDocument();
    })
    it("Should renders all icons", () => {
        render(<IconInput
            icon="building"
            control={mockUseForm.result.current.control}
            fieldName="test"
            type="text"
            placeholder="test"
        />)
        const icon1 = screen.getByTestId("building");
        expect(icon1).toBeInTheDocument();

        render(<IconInput
            icon="login"
            control={mockUseForm.result.current.control}
            fieldName="test"
            type="text"
            placeholder="test"
        />)
        const icon2 = screen.getByTestId("login");
        expect(icon2).toBeInTheDocument();

        render(<IconInput
            icon="password"
            control={mockUseForm.result.current.control}
            fieldName="test"
            type="text"
            placeholder="test"
        />)
        const icon3 = screen.getByTestId("password");
        expect(icon3).toBeInTheDocument();
    })
})