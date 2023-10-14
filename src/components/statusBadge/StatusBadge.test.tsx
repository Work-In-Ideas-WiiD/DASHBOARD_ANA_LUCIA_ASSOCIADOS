import '@testing-library/jest-dom';
import { render, screen } from "../../utils/testUtils"
import { StatusBadge } from "./statusBadge"

describe("StatusBadge", () => {
    it("Should renders correctly with prop 'Assinado'", async () => {
        render(<StatusBadge status="Assinado" />);
        const badge = await screen.findByText("Assinado");
        expect(badge).toBeInTheDocument();
    })
    it("Should renders correctly with prop 'Pendente'", async () => {
        render(<StatusBadge status="Pendente" />);
        const badge = await screen.findByText("Pendente");
        expect(badge).toBeInTheDocument();
    })
})