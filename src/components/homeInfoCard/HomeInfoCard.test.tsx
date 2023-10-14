import '@testing-library/jest-dom';
import { render } from "../../utils/testUtils";
import { HomeInfoCardComponent } from ".";
import { screen } from "@testing-library/react";

describe("Home info card", () => {
    it("Should renders correctly", () => {
        render(<HomeInfoCardComponent icon={0} title="test" value="20" />);
        const card = screen.getByTestId("home-info-card");
        expect(card).toBeInTheDocument();
    })

    it("Should display its props correctly", async () => {
        render(<HomeInfoCardComponent icon={0} title="test" value="20" />);
        const card = screen.getByTestId("home-info-card");
        const labelTitle = await screen.findByText("test");
        const labelValue = await screen.findByText("20");
        expect(labelTitle).toBeInTheDocument();
        expect(labelValue).toBeInTheDocument();
        expect(labelTitle.textContent).toBe("test");
        expect(labelValue.textContent).toBe("20");
        expect(card).toBeInTheDocument();
    });

    it("Should render all icons", () => {
        render(<HomeInfoCardComponent icon={0} title="test" value="20" />);
        const icon1 = screen.getByTestId("icon1");
        expect(icon1).toBeInTheDocument();
        render(<HomeInfoCardComponent icon={1} title="test" value="20" />);
        const icon2 = screen.getByTestId("icon2");
        expect(icon2).toBeInTheDocument();
        render(<HomeInfoCardComponent icon={2} title="test" value="20" />);
        const icon3 = screen.getByTestId("icon3");
        expect(icon3).toBeInTheDocument();
        render(<HomeInfoCardComponent icon={3} title="test" value="20" />);
        const icon4 = screen.getByTestId("icon4");
        expect(icon4).toBeInTheDocument();
    })
})