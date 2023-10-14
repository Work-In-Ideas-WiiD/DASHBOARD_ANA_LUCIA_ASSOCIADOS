import "@testing-library/jest-dom";
import { render, screen } from "../../utils/testUtils";
import { PageTitle } from ".";
import userEvent from "@testing-library/user-event";

describe("Page Title", () => {
    it("Should renders correctly", () => {
        render(<PageTitle title="test" backFunction={() => { }} />);
        const pageTitleEl = screen.getByRole("heading");
        expect(pageTitleEl).toBeInTheDocument();
    })
    it("Should not render back button if property is false", async () => {
        render(<PageTitle title="test" backFunction={() => { }} showBackButton={false} />);
        const backButton = await screen.queryByRole("button");
        expect(backButton).not.toBeInTheDocument();
    });
    it("Should call back button funcion when it is clicked", async () => {
        userEvent.setup();
        const jestFn = jest.fn();
        render(<PageTitle title="test" backFunction={jestFn} showBackButton={true} />);
        const backButton = await screen.queryByRole("button");
        expect(backButton).toBeInTheDocument();
        await userEvent.click(backButton!);
        expect(jestFn).toBeCalledTimes(1);
    })
})