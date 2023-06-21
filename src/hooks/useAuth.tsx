import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IUserProps } from "../services/http/auth/auth.dto";
import { postLogin, postMe } from "../services/http/auth";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { setAuthToken } from '../services/http/api';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";


interface IAuthContextDataProps {
    children: ReactNode
}

interface IAuthContextData {
    setUserData: (data: IUserProps) => void,
    handleFetching: (option: boolean) => void,
    signIn: (email: string, password: string) => Promise<void>,
    signOut: () => void,
    me: IUserProps,
    fetching: boolean,
    isAdmin: boolean
}

export function signOut() {
    destroyCookie(undefined, 'ana_lucia.token');
    setAuthToken(" ");
    location.reload();
}

export function AuthContextData({ children }: IAuthContextDataProps) {
    const navigate = useNavigate();
    const location = useLocation();
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
    const [isAdmin, setIsAdmin] = useState(false);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const { 'ana_lucia.token': token } = parseCookies();
        if (token) {
            setAuthToken(token);
            postMe().then((response) => {
                const { data: user_data } = response;
                setUserData(user_data);
                setIsAdmin(user_data.type == 'administrador');
                if (!location.pathname.includes("assinar")) {
                    navigate("/dashboard/home");
                }
            }).catch(() => {
                destroyCookie(undefined, 'ana_lucia.token');
                if (!location.pathname.includes("assinatura")) {
                    navigate("/");
                }
            });
        } else {
            if (location.pathname.includes("dashboard")) {
                navigate("/");
            }
        }
    }, [])

    function setUserData(data: IUserProps) {
        setMe(data);
    }

    function handleFetching(option: boolean) {
        setFetching(option);
    }

    async function signIn(email: string, password: string) {
        try {
            handleFetching(true);
            const { data: login_data } = await postLogin(email, password);
            setAuthToken(login_data.access_token);
            const { data: user } = await postMe();
            setIsAdmin(user.type == 'administrador');
            setUserData(user);
            setCookie(undefined, "ana_lucia.token", login_data.access_token, {
                maxAge: 60 * 60,
                path: '/'
            });
            handleFetching(false);
            navigate("/dashboard/home");
        } catch (err) {
            console.log(err);
            handleFetching(false);
            toast.error("E-mail ou senha inválidos.");
        }
    }

    function signOut() {
        destroyCookie(undefined, 'ana_lucia.token');
        setMe({
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
        });
        setAuthToken(" ");
        navigate("/");
    }

    return <AuthContext.Provider value={{
        setUserData,
        handleFetching,
        signIn,
        signOut,
        me,
        fetching,
        isAdmin
    }}>
        {children}
    </AuthContext.Provider>
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}