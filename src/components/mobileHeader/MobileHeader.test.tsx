import { MobileHeader } from ".";
import '@testing-library/jest-dom';
import { render } from "../../utils/testUtils";
import { screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { AuthContext, IAuthContextData } from "../../hooks/useAuth";


const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));


describe("Mobile Header", () => {

    it("Should renders correctly", () => {
        render(<MobileHeader />);
        const header = screen.getByTestId("header");
        expect(header).toBeInTheDocument();
    })

    it("Should render all itens", async () => {
        let customContextData = {
            userRole: 'administrador', // Defina os dados de contexto que deseja para o teste.
            // Outros dados de contexto, se necessário.
        } as IAuthContextData;
        render(
            <AuthContext.Provider value={customContextData}>
                <MobileHeader />
            </AuthContext.Provider>
        );
        const hamburgerButton = screen.getByTestId("hamburger");
        await userEvent.click(hamburgerButton);
        expect(hamburgerButton).toBeInTheDocument();
        const asideItemHome = await screen.findByTestId("Home");
        expect(asideItemHome).toBeInTheDocument();
    })

    it("Should render only company itens if user is a company", async () => {
        let customContextData = {
            userRole: 'empresa', // Defina os dados de contexto que deseja para o teste.
            // Outros dados de contexto, se necessário.
        } as IAuthContextData;
        render(
            <AuthContext.Provider value={customContextData}>
                <MobileHeader />
            </AuthContext.Provider>
        );
        const hamburgerButton = screen.getByTestId("hamburger");
        await userEvent.click(hamburgerButton);
        expect(hamburgerButton).toBeInTheDocument();
        const asideItemContrato = await screen.findByTestId("Clientes");
        expect(asideItemContrato).toBeInTheDocument();
        const asideItemEmpresas = await screen.queryByTestId("Empresas");
        expect(asideItemEmpresas).not.toBeInTheDocument();
    })

    it("Should render only customer itens if user is a customer", async () => {
        let customContextData = {
            userRole: 'cliente', // Defina os dados de contexto que deseja para o teste.
            // Outros dados de contexto, se necessário.
        } as IAuthContextData;
        render(
            <AuthContext.Provider value={customContextData}>
                <MobileHeader />
            </AuthContext.Provider>
        );
        const hamburgerButton = screen.getByTestId("hamburger");
        await userEvent.click(hamburgerButton);
        expect(hamburgerButton).toBeInTheDocument();
        const asideItemContrato = await screen.findByTestId("Assinaturas");
        expect(asideItemContrato).toBeInTheDocument();
        const asideItemEmpresas = await screen.queryByTestId("Clientes");
        expect(asideItemEmpresas).not.toBeInTheDocument();
    })
})