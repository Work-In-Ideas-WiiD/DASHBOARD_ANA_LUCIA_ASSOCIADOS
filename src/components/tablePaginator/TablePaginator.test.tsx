import "@testing-library/jest-dom";
import { TablePaginator } from "."
import { render, screen } from "../../utils/testUtils"
import userEvent from "@testing-library/user-event";

describe("Table Paginator", () => {
    it("Should renders correctly", () => {
        render(<TablePaginator pageCount={3} onPageChange={() => { }} />);
        const paginatorEl = screen.getByRole("navigation");
        expect(paginatorEl).toBeInTheDocument();
    })
    it("Should call on change function when pagination button is clicked", async () => {
        userEvent.setup();
        const jestFn = jest.fn();
        render(<TablePaginator pageCount={3} onPageChange={jestFn} />);
        const paginatorEl = screen.getByRole("navigation");
        expect(paginatorEl).toBeInTheDocument();
        const paginatorButton = screen.getByText("3");
        expect(paginatorButton).toBeInTheDocument();
        await userEvent.click(paginatorButton);
        expect(jestFn).toBeCalledTimes(1);
        expect(jestFn).toBeCalledWith(3);
    })
})