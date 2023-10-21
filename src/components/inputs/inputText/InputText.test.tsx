import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { InputText } from ".";
import { FieldErrors, useForm } from "react-hook-form";

const mockErrors: FieldErrors = { root: { message: "test error", type: "testField" } } as FieldErrors;
const mockUseForm = renderHook(() => useForm());

describe("Input text", () => {
    it("Should renders correctly", () => {
        render(<InputText
            control={mockUseForm.result.current.control}
            errors={mockErrors}
            fieldName="test"
            title="test"
        />);
        const inputEl = screen.getByLabelText("test");
        expect(inputEl).toBeInTheDocument();
    })
})