import { ReactNode } from "react";
import { AuthContextData } from "../../hooks/useAuth";
import { BrowserRouter } from "react-router-dom";

interface IProps {
    children: ReactNode
}

export function TestContextProvider({ children }: IProps) {
    return (
        <>
            <BrowserRouter>
                <AuthContextData>
                    {children}
                </AuthContextData>
            </BrowserRouter>
        </>

    )
}