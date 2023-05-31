import { AxiosResponse } from "axios";
import { api, setToken } from "../api";
import { IPostLoginRes, IUserProps } from "./auth.dto";

export async function postMe(token: string): Promise<AxiosResponse<IUserProps, any>> {
    setToken(token);
    const res = await api.post("/auth/me");

    return res;
}

export async function postLogin(email: string, password: string): Promise<AxiosResponse<IPostLoginRes, any>> {
    const res = await api.post("/auth/login", {
        email,
        password
    });

    return res;
}