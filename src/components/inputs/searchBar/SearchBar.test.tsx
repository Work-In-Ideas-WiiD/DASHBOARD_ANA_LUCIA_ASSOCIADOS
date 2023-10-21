import "@testing-library/jest-dom";
import { render, renderHook, screen } from "../../../utils/testUtils";
import { SearchBar } from ".";
import { useForm } from "react-hook-form";

const mockUseForm = renderHook(() => useForm());

describe("Search bar", () => {
    it("Should renders correctly", () => {
        render(<SearchBar
            control={mockUseForm.result.current.control}
            fetching={false}
            fieldName="test"
            placeholder="buscar"
        />)

        const inputEl = screen.getByPlaceholderText("buscar");
        expect(inputEl).toBeInTheDocument();
    })

    it("Should displays a loading spinner", () => {
        render(<SearchBar
            control={mockUseForm.result.current.control}
            fetching={true}
            fieldName="test"
            placeholder="buscar"
        />)

        const inputEl = screen.getByTestId("rotating-lines-svg");
        expect(inputEl).toBeInTheDocument();
    })
})