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

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
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
                path: "error",
                element: <DashboardErrorPage />,
            }
        ]
    }
]);

export default router;