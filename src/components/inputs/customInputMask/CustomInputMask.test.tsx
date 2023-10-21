import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { CustomInputMask } from ".";
import { FieldErrors, useForm } from "react-hook-form";

const mockErrors: FieldErrors = { root: { message: "test error", type: "testField" } } as FieldErrors;
const mockUseForm = renderHook(() => useForm());

describe("Custom input mask", () => {

    it("Should renders correctly", () => {
        render(
            <CustomInputMask
                title="Test Input"
                placeholder="Placeholder"
                containerClass="custom-class"
                mask="999-999"
                fieldName="testField"
                control={mockUseForm.result.current.control}
                errors={mockErrors}
            />
        )

        const inputEl = screen.getByLabelText('Test Input');
        expect(inputEl).toBeInTheDocument();
        expect(inputEl).toHaveAttribute('placeholder', 'Placeholder');
        expect(inputEl).toHaveValue('');

    })
})