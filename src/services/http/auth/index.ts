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

export async function postLogout(token: string): Promise<AxiosResponse<any, any>> {
    setToken(token);
    const res = await api.post("/auth/logout");

    return res;
}

export async function postResetPassword(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/reset/password", {
        token,
        email,
        password,
        password_confirmation
    });

    return res;
}

export async function postRequestResetPassword(
    email: string,
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/reset-password", {
        email,
    });

    return res;
}
export async function postFirstAcess(
    token: string,
    email: string,
    password: string,
    password_confirmation: string
): Promise<AxiosResponse<any, any>> {
    const res = await api.post("/auth/first/access", {
        token,
        email,
        password,
        password_confirmation
    });

    return res;
}