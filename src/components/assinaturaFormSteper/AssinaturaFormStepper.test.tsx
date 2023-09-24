import '../../setup-test';
import { render, screen } from "@testing-library/react"
import { AssinaturaFormSteper } from "."

describe("Form Stepper Component", () => {
    it("Should render with prop '1'", async () => {
        render(<AssinaturaFormSteper active={1} />);
        const stepper = await screen.findByTestId("steper1");
        expect(stepper).toBeInTheDocument();
    });

    it("Should render with prop '2'", async () => {
        render(<AssinaturaFormSteper active={2} />);
        const stepper = await screen.findByTestId("steper2");
        expect(stepper).toBeInTheDocument();
    })


})