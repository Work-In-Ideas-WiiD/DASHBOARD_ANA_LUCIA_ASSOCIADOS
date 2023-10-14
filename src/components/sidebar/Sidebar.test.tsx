import { Sidebar } from ".";
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

describe("Sidebar", () => {

    it("Should renders correctly", () => {
        render(<Sidebar />);
        const asideEl = screen.getByRole("complementary");
        expect(asideEl).toBeInTheDocument();
    })

    it("Should render all itens", async () => {
        let customContextData = {
            userRole: 'administrador', // Defina os dados de contexto que deseja para o teste.
            // Outros dados de contexto, se necessário.
        } as IAuthContextData;
        render(
            <AuthContext.Provider value={customContextData}>
                <Sidebar />
            </AuthContext.Provider>
        );
        const asideEl = screen.getByRole("complementary");
        expect(asideEl).toBeInTheDocument();
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
                <Sidebar />
            </AuthContext.Provider>
        );
        const asideEl = screen.getByRole("complementary");
        expect(asideEl).toBeInTheDocument();
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
                <Sidebar />
            </AuthContext.Provider>
        );
        //com erro possivelmente
        const asideEl = screen.getByRole("complementary");
        expect(asideEl).toBeInTheDocument();
        const asideItemContrato = await screen.findByTestId("Assinaturas");
        expect(asideItemContrato).toBeInTheDocument();
        const asideItemEmpresas = await screen.queryByTestId("Perfil");
        expect(asideItemEmpresas).not.toBeInTheDocument();
    });

    it("Should call route '/Profile' when button Perfil is clicked", async () => {
        userEvent.setup();
        let customContextData = {
            userRole: 'administrador', // Defina os dados de contexto que deseja para o teste.
            // Outros dados de contexto, se necessário.
        } as IAuthContextData;
        render(
            <AuthContext.Provider value={customContextData}>
                <Sidebar />
            </AuthContext.Provider>
        );
        const asideEl = screen.getByRole("complementary");
        expect(asideEl).toBeInTheDocument();
        const asideItem = await screen.queryByTestId("Perfil");
        expect(asideItem).toBeInTheDocument();
        await userEvent.click(asideItem!);
        expect(mockedUsedNavigate).toBeCalledTimes(1);
        expect(mockedUsedNavigate).toBeCalledWith("/dashboard/perfil");
    })
})