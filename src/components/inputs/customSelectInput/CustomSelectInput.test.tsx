import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { CustomSelectInput, IOptions } from ".";
import { FieldErrors, useForm } from "react-hook-form";

const mockErrors: FieldErrors = { root: { message: "test error", type: "testField" } } as FieldErrors;
const mockUseForm = renderHook(() => useForm());
const options: IOptions[] = [
    {
        label: "test",
        value: "test"
    }
]

describe("Custom select input", () => {
    it("Should renders correctly", () => {
        render(<CustomSelectInput
            errors={mockErrors}
            control={mockUseForm.result.current.control}
            fieldName="test"
            options={options}
            placeholder="placeholder test"
            title="label test"
        />)

        const inputEl = screen.getByLabelText("label test");
        expect(inputEl).toBeInTheDocument();
    })
})