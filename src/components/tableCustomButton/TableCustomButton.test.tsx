import '@testing-library/jest-dom';
import { TableCustomButton } from "."
import { render, screen } from "../../utils/testUtils"

describe("TableCustomButton", () => {
    it("Renders correctly", () => {
        render(<TableCustomButton title="test" />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    })
})