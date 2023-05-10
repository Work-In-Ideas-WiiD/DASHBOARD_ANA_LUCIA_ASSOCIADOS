import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "../pages/Login";
import { DashboardPage } from "../pages/Dashboard";
import { DashboardErrorPage } from "../pages/Dashboard/DashboardErrorPage";
import { HomePage } from "../pages/Dashboard/Home";
import { EmpresasPage } from "../pages/Dashboard/EmpresasPage";
import { AdministradoresPage } from "../pages/Dashboard/AdministradoresPage";
import { ContratosPage } from "../pages/Dashboard/ContratosPage";
import { AssinaturasPage } from "../pages/Dashboard/AssinaturasPage";
import { ContratosTable } from "../pages/Dashboard/ContratosPage/ContratosTable";
import { NovoContrato } from "../pages/Dashboard/ContratosPage/NovoContrato";
import { AdministradoresTable } from "../pages/Dashboard/AdministradoresPage/AdministradoresTable";
import { NovoAdministrador } from "../pages/Dashboard/AdministradoresPage/NovoAdministrador";
import { EmpresasTable } from "../pages/Dashboard/EmpresasPage/EmpresasTable";
import { NovaEmpresa } from "../pages/Dashboard/EmpresasPage/NovaEmpresa";
import { Assinatura } from "../pages/Assinatura";
import { AssinaturaForm } from "../pages/Assinatura/Form";
import { ClientesPage } from "../pages/Dashboard/ClientesPage";
import { ClienteTable } from "../pages/Dashboard/ClientesPage/ClientesTable";
import { NovoCliente } from "../pages/Dashboard/ClientesPage/NovoCliente";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/assinatura",
        element: <Assinatura />,
        children: [
            {
                path: "cadastro",
                element: <AssinaturaForm />
            }
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <DashboardErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "home",
                element: <HomePage />,
            },
            {
                path: "empresas",
                element: <EmpresasPage />,
                children: [
                    {
                        path: "",
                        element: <EmpresasTable />
                    },
                    {
                        path: "novo",
                        element: <NovaEmpresa />
                    }
                ]
            },
            {
                path: "admins",
                element: <AdministradoresPage />,
                children: [
                    {
                        path: "",
                        element: <AdministradoresTable />
                    },
                    {
                        path: "novo",
                        element: <NovoAdministrador />
                    }
                ]
            },
            {
                path: "contratos",
                element: <ContratosPage />,
                children: [
                    {
                        path: "",
                        element: <ContratosTable />
                    },
                    {
                        path: "novo",
                        element: <NovoContrato />
                    },
                ]
            },
            {
                path: "assinaturas",
                element: <AssinaturasPage />
            },
            {
                path: "clientes",
                element: <ClientesPage />,
                children: [
                    {
                        path: "",
                        element: <ClienteTable />
                    },
                    {
                        path: "novo",
                        element: <NovoCliente />
                    },
                ]
            },
            {
                path: "error",
                element: <DashboardErrorPage />,
            }
        ]
    }
]);

export default router;