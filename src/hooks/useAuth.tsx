import { ReactNode, createContext, useContext, useState } from "react";
import { IUserProps } from "../services/http/auth/auth.dto";

interface IAuthContextDataProps {
    children: ReactNode
}

interface IAuthContextData {
    setUserData: (data: IUserProps) => void,
    setUseToken: (token: string) => void,
    token: string,
    me: IUserProps
}

export function AuthContextData({ children }: IAuthContextDataProps) {
    const [token, setToken] = useState('');
    const [me, setMe] = useState<IUserProps>({
        id: "",
        nome: "",
        email: "",
        email_verified_at: "",
        type: "",
        cpf: "",
        contato: "",
        cnpj: "",
        nome_empresa: "",
        clicksign_key: "",
        endereco_id: "",
        deleted_at: "",
        created_at: "",
        updated_at: "",
        endereco: "",
    })

    function setUseToken(token: string) {
        setToken(token);
    }

    function setUserData(data: IUserProps) {
        setMe(data);
    }


    return <AuthContext.Provider value={{
        setUserData,
        setUseToken,
        token,
        me
    }}>
        {children}
    </AuthContext.Provider>
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}