import "@testing-library/jest-dom";
import { Modal } from ".";
import { render, screen } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";

const mockHandleModal = jest.fn();
describe("Modal", () => {
    test("Should renders correctly", () => {
        render(
            <Modal handleModal={mockHandleModal} title="Modal">
                <h2>test</h2>
            </Modal>
        )
        const modalEl = screen.getByTestId("modal");
        expect(modalEl).toBeInTheDocument();
    })
    test("Should render its properties", async () => {
        render(
            <Modal handleModal={mockHandleModal} title="Modal">
                <h2>test</h2>
            </Modal>
        )
        const modalEl = screen.getByTestId("modal");
        expect(modalEl).toBeInTheDocument();
        const titleModal = await screen.queryByText("Modal");
        expect(titleModal).toBeInTheDocument();
        const childrenEl = await screen.queryByText("test");
        expect(childrenEl).toBeInTheDocument();
    })
    test("Should execute callback function", async () => {
        userEvent.setup();
        render(
            <Modal handleModal={mockHandleModal} title="Modal">
                <h2>test</h2>
            </Modal>
        )
        const modalEl = screen.getByTestId("modal");
        expect(modalEl).toBeInTheDocument();
        const closeBtnEl = screen.getByRole("button");
        await userEvent.click(closeBtnEl);
        expect(mockHandleModal).toBeCalledTimes(1);
    })
})