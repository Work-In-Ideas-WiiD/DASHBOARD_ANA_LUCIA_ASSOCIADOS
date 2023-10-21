import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { TableSelectInput, IOptions } from ".";
import { useForm } from "react-hook-form";

const mockUseForm = renderHook(() => useForm());
const options: IOptions[] = [
    {
        label: "test",
        value: "test"
    }
]

describe("Table Select Input", () => {
    it("Should renders correctly", () => {
        render(<TableSelectInput
            control={mockUseForm.result.current.control}
            fieldName="test"
            options={options}
        />)

        const inputEl = screen.getByText("Tipo");
        expect(inputEl).toBeInTheDocument();
    })
})