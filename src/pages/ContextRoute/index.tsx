import { Outlet } from "react-router-dom";
import { AuthContextData } from "../../hooks/useAuth";

export function ContextRoute() {
    return (
        <AuthContextData>
            <Outlet />
        </AuthContextData>
    )
}