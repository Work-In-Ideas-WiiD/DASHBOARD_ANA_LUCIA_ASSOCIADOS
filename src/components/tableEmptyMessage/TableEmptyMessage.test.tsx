import '@testing-library/jest-dom';
import { render, screen } from '../../utils/testUtils';
import { TableEmptyMessage } from '.';

describe("TableEmptyButtom", () => {
    it("Should render correctly", () => {
        render(<TableEmptyMessage show={true} />);
        const tableEl = screen.getByRole("heading");
        expect(tableEl).toBeInTheDocument();
    })
    it("Should not render if property 'show' is false", async () => {
        render(<TableEmptyMessage show={false} />);
        const tableEl = await screen.queryByRole("heading");
        expect(tableEl).not.toBeInTheDocument();
    })
})