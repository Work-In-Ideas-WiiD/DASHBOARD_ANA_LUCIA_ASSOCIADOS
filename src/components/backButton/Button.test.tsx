import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react"
import { BackButton } from "."
import { userEvent } from "@testing-library/user-event";
describe("Back Button", () => {
    it("Should render correctly", () => {
        render(<BackButton />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it("Should execute a function when have clicked", async () => {
        const fn = jest.fn();
        render(<BackButton click={fn} />);
        const button = screen.getByRole('button');
        await userEvent.click(button);
        expect(fn).toBeCalledTimes(1);
    })
})